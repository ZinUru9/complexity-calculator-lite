import React, { useState } from 'react';
import './App.css';

const dimensionLabels = [
  "Configuration Effort",
  "Cross-Team Dependencies",
  "Customer Skill Required",
  "Risk Level",
  "Support Load",
  "Timeline Impact",
];

const arrMultipliers = {
  "<$30K": 1.0,
  "$30K–$70K": 1.1,
  "$71K–$149K": 1.25,
  ">$150K": 1.4,
};

function App() {
  const [scores, setScores] = useState(Array(6).fill(3));
  const [arrTier, setArrTier] = useState("<$30K");

  const avgLift = scores.reduce((a, b) => a + b, 0) / scores.length;
  const multiplier = arrMultipliers[arrTier];
  const complexityScore = (avgLift * multiplier).toFixed(2);

  const handleSliderChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        Complexity Calculator
      </h1>

      {dimensionLabels.map((label, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <label>{label}</label>
          <input
            type="range"
            min="1"
            max="5"
            value={scores[index]}
            onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
            style={{ width: "100%" }}
          />
          <div>Score: {scores[index]}</div>
        </div>
      ))}

      <div style={{ marginTop: "2rem" }}>
        <label>ARR Tier:</label>
        <select
          value={arrTier}
          onChange={(e) => setArrTier(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        >
          {Object.keys(arrMultipliers).map((tier) => (
            <option key={tier} value={tier}>
              {tier}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "2rem", fontSize: "1.25rem" }}>
        <strong>Total Complexity Score: </strong>
        <span style={{ color: "blue" }}>{complexityScore}</span>
      </div>
    </div>
  );
}

export default App;
