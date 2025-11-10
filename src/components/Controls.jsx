import React from "react";

export default function Controls({
  generate,
  sort,
  algorithm,
  setAlgorithm,
  speed,
  setSpeed,
  size,
  setSize,
  disabled,
  theme,
  toggleTheme,
}) {
  return (
    <div className="controls">
      <button onClick={generate} disabled={disabled}>Generate Array</button>

      <label>
        &nbsp;Algorithm:&nbsp;
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={disabled}
        >
          <option>Bubble</option>
          <option>Selection</option>
          <option>Insertion</option>
          <option>Merge</option>
          <option>Quick</option>
        </select>
      </label>

      <label>
        &nbsp;Size:&nbsp;
        <input
          type="range"
          min="10"
          max="160"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          disabled={disabled}
        />
      </label>

      <label>
        &nbsp;Speed:&nbsp;
        <input
          type="range"
          min="10"
          max="150"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          disabled={disabled}
        />
      </label>

      <button onClick={sort} disabled={disabled}>Sort</button>

      {/* Theme toggle at the end */}
      <button
        type="button"
        className="theme-btn"
        onClick={toggleTheme}
        title="Toggle dark/light"
        style={{ marginLeft: 8 }}
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
}
