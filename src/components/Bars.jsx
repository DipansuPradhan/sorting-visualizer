import React from "react";

export default function Bars({ state }) {
  const { array, active, swap, fixed } = state;
  const max = Math.max(...array, 1);

  return (
    <div className="container">
      {array.map((value, index) => {
        const classes = ["bar"];
        if (active?.includes(index)) classes.push("active");
        if (swap && active?.includes(index)) classes.push("swap");
        if (fixed?.has(index)) classes.push("fixed");

        return (
          <div
            key={index}
            className={classes.join(" ")}
            style={{
              height: `${(value / max) * 100}%`,
              width: `calc((100% - ${(array.length - 1)} * 2px) / ${array.length})`,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "-22px",
                color: "var(--text)",   // ✅ FIXED
                fontSize: "12px",
                fontWeight: "600",
                userSelect: "none",
              }}
            >
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
