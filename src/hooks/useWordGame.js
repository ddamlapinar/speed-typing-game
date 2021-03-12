import {useState,useEffect,useRef} from 'react'
function useWordGame(){
    const STARTING_TIME = 15
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textareaRef = useRef(null)
    function handleChange(e) {
        const { value } = e.target
        setText(value)
      }
      function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ");
        console.log(wordsArr.filter(word => word !== "").length);
        return wordsArr.filter(word => word !== "").length;
      }
    
      function startGame() {
        setIsTimeRunning(true);
        setTimeRemaining(STARTING_TIME);
        setText("");
        textareaRef.current.disabled=false;
        textareaRef.current.focus();
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
      return {textareaRef, handleChange, text, isTimeRunning, timeRemaining, startGame, wordCount}
}
export default useWordGame