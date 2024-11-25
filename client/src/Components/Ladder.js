import React, { useEffect, useState } from "react";

const Ladder = ({ score }) => {
  const [monkeyPosition, setMonkeyPosition] = useState(score * 20);

  useEffect(() => {
    // Update monkey position based on the score
    setMonkeyPosition(score * 20);
  }, [score]);

  const totalSteps = 10; // Total number of steps on the ladder
  const stepHeight = 20; // Height for each step
  const maxScore = totalSteps; // Maximum score to reach the top

  return (
    <div className="ladder-container flex flex-col items-center">
      {/* Banana at the top */}
      <div className="banana text-4xl mb-2" role="img" aria-label="banana">
        🍌
      </div>
      <div className="ladder relative w-20 h-60 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center justify-end overflow-hidden">
        {/* Ladder steps */}
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`step ${i % 2 === 0 ? "w-3/4" : "w-1/2"} h-1 bg-gray-600 rounded-full absolute`}
            style={{
              bottom: `${i * stepHeight}px`,
            }}
          />
        ))}

        {/* Monkey */}
        <div
          className="monkey text-3xl transition-transform duration-500 ease-out"
          style={{
            transform: `translateY(-${monkeyPosition}px)`,
            position: "absolute",
            bottom: 0,
          }}
          role="img"
          aria-label="monkey"
        >
          🐒
        </div>
      </div>

      {/* Display current score below the ladder */}
      <div className="score text-lg font-bold mt-2">{score}</div>
    </div>
  );
};

export default Ladder;
