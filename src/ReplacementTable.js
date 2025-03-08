import React from "react";
import "./ReplacementTable.css";

const ReplacementTable = ({
  algorithm,
  steps,
  hits,
  faults,
  hitRate,
  isBest,
  referenceString,
}) => {
  return (
    <div>
      <h3>
        {algorithm} {isBest ? "(Best Algorithm ⭐)" : ""}
      </h3>

      <table className="results-table">
        <thead>
          <tr>
            <th>Reference</th>
            {referenceString.map((num, index) => (
              <th key={index}>{num}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...steps[0]?.frames].reverse().map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td>Frame {steps[0]?.frames.length - rowIndex}</td>
              {steps.map((step, colIndex) => (
                <td key={colIndex}>
                  {step.frames[steps[0]?.frames.length - 1 - rowIndex] ?? "-"}
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td>Result</td>
            {steps.map((step, index) => (
              <td
                key={index}
                className={step.replaceIndex === -1 ? "hit" : "miss"}
              >
                {step.replaceIndex === -1 ? "Hit" : "Miss"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <div className="summary">
        <p>Page Hits: {hits}</p>
        <p>Page Faults: {faults}</p>
        <p>Hit Rate: {hitRate.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default ReplacementTable;
