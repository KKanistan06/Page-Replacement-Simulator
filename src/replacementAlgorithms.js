export const fifo = (referenceString, frameSize) => {
  let frames = Array(frameSize).fill(null);
  let queue = [];
  let hits = 0,
    faults = 0,
    frameSnapshots = [];

  referenceString.forEach((page) => {
    if (frames.includes(page)) {
      hits++;
    } else {
      faults++;
      if (queue.length === frameSize) {
        let removed = queue.shift();
        frames[frames.indexOf(removed)] = page;
      } else {
        frames[queue.length] = page;
      }
      queue.push(page);
    }
    frameSnapshots.push([...frames]);
  });

  return { frames: frameSnapshots, hits, faults };
};

export const lru = (referenceString, frameSize) => {
  let frames = Array(frameSize).fill(null);
  let recent = new Map();
  let hits = 0,
    faults = 0,
    frameSnapshots = [];

  referenceString.forEach((page, index) => {
    if (frames.includes(page)) {
      hits++;
    } else {
      faults++;
      if (frames.includes(null)) {
        frames[frames.indexOf(null)] = page;
      } else {
        let lruPage = [...recent.entries()].sort((a, b) => a[1] - b[1])[0][0];
        frames[frames.indexOf(lruPage)] = page;
      }
    }
    recent.set(page, index);
    frameSnapshots.push([...frames]);
  });

  return { frames: frameSnapshots, hits, faults };
};

export const lfu = (referenceString, frameSize) => {
  let frames = Array(frameSize).fill(null);
  let frequency = {};
  let hits = 0,
    faults = 0,
    frameSnapshots = [];

  referenceString.forEach((page) => {
    frequency[page] = (frequency[page] || 0) + 1;

    if (frames.includes(page)) {
      hits++;
    } else {
      faults++;
      if (frames.includes(null)) {
        frames[frames.indexOf(null)] = page;
      } else {
        let lfuPage = Object.entries(frequency).sort(
          (a, b) => a[1] - b[1]
        )[0][0];
        frames[frames.indexOf(parseInt(lfuPage))] = page;
      }
    }
    frameSnapshots.push([...frames]);
  });

  return { frames: frameSnapshots, hits, faults };
};

export const mfu = (referenceString, frameSize) => {
  let frames = Array(frameSize).fill(null);
  let frequency = {};
  let hits = 0,
    faults = 0,
    frameSnapshots = [];

  referenceString.forEach((page) => {
    frequency[page] = (frequency[page] || 0) + 1;

    if (frames.includes(page)) {
      hits++;
    } else {
      faults++;
      if (frames.includes(null)) {
        frames[frames.indexOf(null)] = page;
      } else {
        let mfuPage = Object.entries(frequency).sort(
          (a, b) => b[1] - a[1]
        )[0][0];
        frames[frames.indexOf(parseInt(mfuPage))] = page;
      }
    }
    frameSnapshots.push([...frames]);
  });

  return { frames: frameSnapshots, hits, faults };
};
