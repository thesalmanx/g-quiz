import React, { useState } from "react";
import quizData from "../quizData.json";
import Ladder from "./Ladder";

const QuizBoard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [buttonStyles, setButtonStyles] = useState({});

  const handleAnswerClick = (option) => {
    const isCorrect = option === quizData[currentQuestion].answer;
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setFeedback("✅ Correct! You climb up!");
      setHintUsed(false);
      setButtonStyles({ backgroundColor: "green" });
    } else {
      setFeedback("❌ Incorrect. Try again!");
      setStreak(0); // reset streak if the answer is incorrect
      setButtonStyles({ backgroundColor: "red" });
    }

    setTimeout(() => {
      setFeedback("");
      setShowHint(false); // reset hint visibility
      setButtonStyles({});
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert(`Game Over! Your final score: ${score}`);
      }
    }, 1000);
  };

  const handleShowHint = () => {
    setShowHint(true);
    setHintUsed(true); // track if hint was used
  };

  return (
    <div className="flex justify-between w-full max-w-7xl mx-auto p-8 space-x-16 quizboard">
      {/* Left Side: Quiz Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Question {currentQuestion + 1} of {quizData.length}
          </h2>
          <span className="text-sm text-white-500">
            Score: {score} | Streak: {streak}
          </span>
        </div>

        <p className="text-lg font-bold mb-4">
          {quizData[currentQuestion].question}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {quizData[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              style={buttonStyles}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition transform hover:scale-105"
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className="text-sm text-white-500 underline mb-4"
          onClick={handleShowHint}
          disabled={showHint || hintUsed}
        >
          {hintUsed ? "Hint Used" : "Show Hint"}
        </button>

        {showHint && (
          <p className="text-white-700 italic mb-4">
            Hint: {quizData[currentQuestion].hint}
          </p>
        )}

        <p className="feedback text-lg font-semibold text-center">{feedback}</p>

        <div className="mt-4 w-full bg-gray-200 rounded-full">
          <div
            className="bg-blue-500 text-xs font-medium text-white text-center p-1 leading-none rounded-full"
            style={{
              width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
              color: "black",
              fontWeight: "bold",
              fontSize: "10px",
            }}
          >
            {`Progress: ${currentQuestion + 1} / ${quizData.length}`}
          </div>
        </div>
      </div>

      {/* Right Side: Ladder Component */}
      <div className="ladder-container flex-shrink-0">
        <Ladder score={score} />
      </div>
    </div>
  );
};

export default QuizBoard;
