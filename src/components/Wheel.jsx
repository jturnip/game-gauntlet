import React, { useState } from "react";
import "../styles/Wheel.css";

const options = [
  "+3 Pts",
  "+2 Pts + Random Power-Up",
  "Gain 1 Random Achievement",
  "Shield",
  "Bonus",
  "+10",
  "-5",
  "Skip",
  "Shield",
  "Bonus",
  "+10",
  "-5",
  "Skip",
  "Shield",
  "Bonus",
  "+10",
  "-5",
  "Skip",
  "Shield",
  "Bonus",
];

export default function Wheel() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);

    const slice = 360 / options.length;
    const randomIndex = Math.floor(Math.random() * options.length);

    // Force multiple full rotations (e.g. 5–8 full spins)
    const fullRotations = 360 * (5 + Math.floor(Math.random() * 3));

    // Center the chosen slice under the pointer ▼
    const stopAngle = 360 - (randomIndex * slice + slice / 2);

    // Total rotation = full spins + stop angle
    const targetRotation = fullRotations + stopAngle;

    setRotation(targetRotation);

    // Wait for spin animation to finish before showing result
    setTimeout(() => {
      setSpinning(false);
      setResult(options[randomIndex]);
    }, 4500); // match CSS transition time
  };

  return (
    <div className="wheel-wrapper">
      <div className="wheel-title">Blessed Wheel</div>
      <div className="pointer">▼</div>
      <div
        className={`wheel ${spinning ? "spinning" : ""}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {options.map((opt, i) => (
          <div
            key={i}
            className="segment"
            style={{
              transform: `rotate(${i * (360 / options.length)}deg) skewY(-${
                90 - 360 / options.length
              }deg)`,
            }}
          >
            <span>{opt}</span>
          </div>
        ))}
      </div>

      <button className="spin-btn" onClick={spinWheel} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </button>
      {result && <p className="result">Result: {result}</p>}
    </div>
  );
}
