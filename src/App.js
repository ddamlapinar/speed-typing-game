import React, { useState, useEffect } from 'react'
import './styles.css';

function App() {

  const STARTING_TIME = 15;

  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  function handleChange(e) {
    const { value } = e.target
    setText(value)
  }
  function calculateWordCount(text) {
    const wordsArr = text.trim().split(" ")
    console.log(wordsArr.filter(word => word !== "").length)
    return wordsArr.filter(word => word !== "").length
  }

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText("")
  }
  function endGame() {
    setIsTimeRunning(false)
    setWordCount(calculateWordCount(text))
  }
  useEffect(() => {

    setTimeout(() => {

      if (isTimeRunning && timeRemaining > 0) {
        setTimeRemaining(time => time - 1)

      }
      else {
        endGame()
      }


    }, 1000)

  }, [timeRemaining, isTimeRunning])

  return (
    <div className="App">

      <h1>How fast do you type?</h1>
      <textarea
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning}


      />
      <h4>Time remaining: {timeRemaining}</h4>
      <button onClick={startGame} disabled={isTimeRunning}>Start</button>
      <h1>Word count: {wordCount}</h1>


    </div>
  );
}

export default App;
