# Page Replacement Simulator

## Group Members:
- **K. Kanistan** (2021E064)
- **P. Pogitha** (2021E112)

## Description:
The **Page Replacement Simulator** is a web application designed to visualize the operation of four different page replacement algorithms. The simulator allows users to input a reference string (the sequence of page accesses) and the number of frames (the available memory space) and then view the step-by-step simulation of the algorithms. It calculates page hits and faults and provides a final result, highlighting the best-performing algorithm.

## Supported Algorithms:
- **FIFO (First-In-First-Out)**
- **LRU (Least Recently Used)**
- **LFU (Least Frequently Used)**
- **MFU (Most Frequently Used)**

---

## How the Algorithms Work:

### 1. **FIFO (First-In-First-Out)**:
**FIFO** is the simplest page replacement algorithm. It replaces the oldest page in memory when a page fault occurs.

**Steps:**
1. Initialize the frames with empty spaces.
2. Traverse the reference string (sequence of page accesses).
3. For each page:
   - If the page is already in memory, it is a **hit**.
   - If the page is not in memory, it is a **fault**.
   - Replace the oldest page in memory with the new page.
   - Keep track of the order in which pages were inserted.

**Example:**
Let’s say we have 3 frames and the reference string is: `7 0 1 2 0 3 0 4 2 3 0 3`.

- Initially, all frames are empty: `- - -`
- Insert `7`: `7 - -`
- Insert `0`: `7 0 -`
- Insert `1`: `7 0 1`
- Page fault for `2`, replace `7`: `2 0 1`
- Page fault for `0`, replace `1`: `2 0 0`
- Continue replacing the oldest pages when page faults occur.

---

### 2. **LRU (Least Recently Used)**:
**LRU** replaces the least recently used page when a page fault occurs. The idea is to keep track of the last time a page was accessed and replace the one that hasn't been used for the longest time.

**Steps:**
1. Initialize the frames with empty spaces.
2. Traverse the reference string.
3. For each page:
   - If the page is in memory, it is a **hit**, and we update the time it was accessed.
   - If the page is not in memory, it is a **fault**.
   - Replace the least recently used page by looking at the timestamps of each page.
   - Update the access time of the newly added page.

**Example:**
Let’s say we have 3 frames and the reference string is: `7 0 1 2 0 3 0 4 2 3 0 3`.

- Initially, all frames are empty: `- - -`
- Insert `7`: `7 - -`
- Insert `0`: `7 0 -`
- Insert `1`: `7 0 1`
- Page fault for `2`, replace the least recently used page `7`: `2 0 1`
- Page fault for `0`, replace the least recently used page `1`: `2 0 0`
- Continue replacing the least recently used page when a page fault occurs.

---

### 3. **LFU (Least Frequently Used)**:
**LFU** replaces the page that has been used the least number of times. The idea is to keep track of the frequency of each page and replace the one that is accessed the least.

**Steps:**
1. Initialize the frames with empty spaces and a frequency counter for each page.
2. Traverse the reference string.
3. For each page:
   - If the page is in memory, it is a **hit**, and its frequency is incremented.
   - If the page is not in memory, it is a **fault**.
   - If all frames are full, replace the page with the lowest frequency.
   - If there is a tie (multiple pages with the same frequency), replace the one that was accessed first.

**Example:**
Let’s say we have 3 frames and the reference string is: `7 0 1 2 0 3 0 4 2 3 0 3`.

- Initially, all frames are empty: `- - -`
- Insert `7`: `7 - -`
- Insert `0`: `7 0 -`
- Insert `1`: `7 0 1`
- Page fault for `2`, replace `7` (least frequent): `2 0 1`
- Page fault for `0`, increase frequency for `0`: `2 0 0`
- Continue replacing the least frequently used page when a page fault occurs.

---

### 4. **MFU (Most Frequently Used)**:
**MFU** replaces the page that has been used the most number of times. The idea is to keep track of the frequency of each page and replace the one that is accessed the most.

**Steps:**
1. Initialize the frames with empty spaces and a frequency counter for each page.
2. Traverse the reference string.
3. For each page:
   - If the page is in memory, it is a **hit**, and its frequency is incremented.
   - If the page is not in memory, it is a **fault**.
   - If all frames are full, replace the page with the highest frequency.
   - If there is a tie (multiple pages with the same frequency), replace the one that was accessed first.

**Example:**
Let’s say we have 3 frames and the reference string is: `7 0 1 2 0 3 0 4 2 3 0 3`.

- Initially, all frames are empty: `- - -`
- Insert `7`: `7 - -`
- Insert `0`: `7 0 -`
- Insert `1`: `7 0 1`
- Page fault for `2`, replace `1` (most frequent): `2 0 1`
- Page fault for `0`, increase frequency for `0`: `2 0 0`
- Continue replacing the most frequently used page when a page fault occurs.

---


## Technology Used
- React: Frontend library for building user interfaces.
- React Router: For navigation between pages.
- CSS: For styling the application.

## How to Use:

### Running the Application Locally:

To run the project locally, follow the steps below:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/page-replacement-simulator.git
