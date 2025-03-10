import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
import AboutUs from "./AboutUs";
import "./App.css";
import ReplacementTable from "./ReplacementTable";

const Home = () => {
  const [referenceString, setReferenceString] = useState("");
  const [frameCount, setFrameCount] = useState("");
  const [results, setResults] = useState([]);
  const location = useLocation(); // Track route changes

  // ✅ Detect if the page is truly reloaded
  useEffect(() => {
    const navigationEntries = window.performance.getEntriesByType("navigation");
    const isPageReloaded =
      navigationEntries.length > 0 && navigationEntries[0].type === "reload";

    if (isPageReloaded) {
      // Only clear session data on reload, not on route navigation
      sessionStorage.removeItem("referenceString");
      sessionStorage.removeItem("frameCount");
      sessionStorage.removeItem("results");
      setReferenceString("");
      setFrameCount("");
      setResults([]);
    }
  }, []);

  // ✅ Load sessionStorage when navigating
  useEffect(() => {
    const storedReferenceString = sessionStorage.getItem("referenceString");
    const storedFrameCount = sessionStorage.getItem("frameCount");
    const storedResults = sessionStorage.getItem("results");

    if (storedReferenceString) setReferenceString(storedReferenceString);
    if (storedFrameCount) setFrameCount(storedFrameCount);
    if (storedResults) setResults(JSON.parse(storedResults));
  }, [location.pathname]); // This effect only needs to run on route change

  // ✅ Save to sessionStorage on state change
  useEffect(() => {
    sessionStorage.setItem("referenceString", referenceString);
    sessionStorage.setItem("frameCount", frameCount);
    sessionStorage.setItem("results", JSON.stringify(results));
  }, [referenceString, frameCount, results]);

  const parseReferenceString = () =>
    referenceString.trim().split(/\s+/).map(Number);

  const runAlgorithms = () => {
    if (!referenceString || !frameCount) {
      alert("Please enter a valid reference string and frame count.");
      return;
    }

    let pages = parseReferenceString();
    let algorithms = ["FIFO", "LRU", "LFU", "MFU"];
    let allResults = algorithms.map((algo) => runAlgorithm(pages, algo));

    let maxHitRate = Math.max(...allResults.map((res) => res.hitRate));

    setResults(
      allResults.map((result) => ({
        ...result,
        isBest: result.hitRate === maxHitRate,
      }))
    );
  };

  const runAlgorithm = (pages, algorithm) => {
    let frames = Array(Number(frameCount)).fill("-");
    let stepData = [];
    let hitCount = 0;
    let faultCount = 0;
    let pageQueue = [];
    let pageFrequency = {};

    pages.forEach((page, step) => {
      let isHit = frames.includes(page);
      let replaceIndex = -1;

      if (isHit) {
        hitCount++;
        if (algorithm === "LRU") {
          pageQueue = pageQueue.filter((p) => p !== page);
          pageQueue.push(page);
        } else if (algorithm === "LFU" || algorithm === "MFU") {
          pageFrequency[page]++;
        }
      } else {
        faultCount++;
        if (frames.includes("-")) {
          replaceIndex = frames.indexOf("-");
        } else {
          if (algorithm === "FIFO" || algorithm === "LRU") {
            replaceIndex = frames.indexOf(pageQueue[0]);
            pageQueue.shift();
          } else if (algorithm === "LFU") {
            let leastFreq = Math.min(...Object.values(pageFrequency));
            let lfuPage = Object.keys(pageFrequency).find(
              (p) => pageFrequency[p] === leastFreq
            );
            replaceIndex = frames.indexOf(Number(lfuPage));
            delete pageFrequency[lfuPage];
          } else if (algorithm === "MFU") {
            let mostFreq = Math.max(...Object.values(pageFrequency));
            let mfuPage = Object.keys(pageFrequency).find(
              (p) => pageFrequency[p] === mostFreq
            );
            replaceIndex = frames.indexOf(Number(mfuPage));
            delete pageFrequency[mfuPage];
          }
        }
        frames[replaceIndex] = page;
        pageQueue.push(page);
        pageFrequency[page] = 1;
      }

      stepData.push({ frames: [...frames], replaceIndex });
    });

    let hitRate = (hitCount / pages.length) * 100;
    return {
      algorithm,
      steps: stepData,
      hits: hitCount,
      faults: faultCount,
      hitRate,
      referenceString: pages,
    };
  };

  return (
    <div className="container">
      <div className="simulator-box">
        <h1>Page Replacement Simulator</h1>

        <div className="controls">
          <div className="input-group">
            <label>Reference String</label>
            <input
              type="text"
              value={referenceString}
              onChange={(e) => setReferenceString(e.target.value)}
              placeholder="Enter reference string (space-separated)"
              className="wide-input"
            />
          </div>

          <div className="input-group">
            <label>Frame Count</label>
            <input
              type="number"
              value={frameCount}
              onChange={(e) => setFrameCount(e.target.value)}
              placeholder="Frame Count"
              className="wide-input"
            />
          </div>

          <button onClick={runAlgorithms} className="run-button">
            Run Algorithms
          </button>
        </div>
      </div>

      {results.map((result, index) => (
        <div
          key={index}
          className={`algorithm-box ${result.isBest ? "best-algorithm" : ""}`}
        >
          <ReplacementTable {...result} />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route
              path="https://kkanistan06.github.io/Page-Replacement-Simulator/"
              element={<Home />}
            />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
