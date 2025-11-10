import React, { useEffect, useMemo, useRef, useState } from "react";
import Controls from "./components/Controls";
import Bars from "./components/Bars";

import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";

const ALGOS = {
  Bubble: bubbleSort,
  Selection: selectionSort,
  Insertion: insertionSort,
  Merge: mergeSort,
  Quick: quickSort,
};

function makeArray(n) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 480) + 20);
}

export default function App() {
  const [size, setSize] = useState(60);
  const [speed, setSpeed] = useState(60);
  const [algorithm, setAlgorithm] = useState("Merge");
  const [base, setBase] = useState(makeArray(size));

  // THEME: dark/light with persistence
  const getInitialTheme = () => {
    const saved = localStorage.getItem("sv-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  };
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("sv-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // animation state
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const stepsRef = useRef([]);
  const timerRef = useRef(null);

  // current frame of animation
  const current = useMemo(() => {
    if (!stepsRef.current.length) {
      return { array: base, active: [], swap: false, fixed: new Set() };
    }
    return stepsRef.current[Math.min(idx, stepsRef.current.length - 1)];
  }, [base, idx]);

  // regenerate array only when SIZE changes
  useEffect(() => {
    const arr = makeArray(size);
    setBase(arr);
    setIdx(0);
    stepsRef.current = [];
  }, [size]);

  function generate() {
    if (running) return;
    const arr = makeArray(size);
    setBase(arr);
    setIdx(0);
    stepsRef.current = [];
  }

  function sort() {
    if (running) return;
    const fn = ALGOS[algorithm];
    const steps = fn(base);
    stepsRef.current = steps;
    setIdx(0);
    setRunning(true);
  }

  // animation ticker
  useEffect(() => {
    if (!running) return;

    timerRef.current = setInterval(() => {
      setIdx((k) => {
        const next = k + 1;
        if (next >= stepsRef.current.length) {
          clearInterval(timerRef.current);
          setRunning(false);
        }
        return next;
      });
    }, Math.max(10, speed));

    return () => clearInterval(timerRef.current);
  }, [running, speed]);

  return (
    <>
      <Controls
        generate={generate}
        sort={sort}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        speed={speed}
        setSpeed={setSpeed}
        size={size}
        setSize={setSize}
        disabled={running}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Bars state={current} />
    </>
  );
}
