import React from "react"
import {nanoid} from "nanoid"
import Home from "./components/Home"
import Quiz from "./components/Quiz"
import "./css/main.css"
import TopBlob from "./img/top-blob.png"
import BottomBlob from "./img/bottom-blob.png"

export default function App() {
    const [startQuiz, setStartQuiz] = React.useState(false)
    const [triviaData, setTriviaData] = React.useState([])
    const [quizArray, setQuizArray] = React.useState([])
    const [isGameOver, setIsGameOver] = React.useState(false)
    const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0)
    const [category, setCategory] = React.useState(9)
    const [difficulty, setDifficulty] = React.useState("easy")
    const [isDisabled, setIsDisabled] = React.useState(false)

    function handleCategoryChange(event) {
        setCategory(event)
    }

    function handleDifficultyChange(event) {
        setDifficulty(event)
    }

    function toggleStart() {
        setStartQuiz(true)
    }

    const getTriviaData = async () => {
        const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`)
        const data = await res.json()
        setTriviaData(data.results)
    }

    React.useEffect(() => {
        getTriviaData()
    }, [category, difficulty])
    
    React.useEffect(() => {
        setQuizArray(getQuizArray(triviaData))
    },[triviaData])

    // fisher-yates shuffle
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex
        // while there remain elements to shuffle
        while (currentIndex != 0) {
          // pick a remaining element
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          //  swap it with the current element
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
        }
        return array
    }

    function getQuizArray(data) {
        const quizArr = data.map(obj => {
            // spread operator to include incorrect and correct answer
            // use shuffle function to randomize choices
            const choices = shuffle([...obj.incorrect_answers, obj.correct_answer])

            return (
                {
                    id: nanoid(),
                    question: obj.question,
                    choices: choices,
                    correctAnswer: obj.correct_answer,
                    selected: null
                }
            )

        })
        return quizArr
    }

    // handle answer selection
    // changes obj.selected to selected answer
    const handleSelectedAnswer = (id, selectedAnswer) => {
        setQuizArray(prevQuizArray => (
            prevQuizArray.map(question => (
                question.id === id ?
                {...question, selected: selectedAnswer} :
                question
            ))
        ))
    }

    const quizElements = quizArray.map((quiz,i) => (
            <Quiz
                key={quiz.id}
                id={quiz.id}
                question={quiz.question}
                choices={quiz.choices}
                correctAnswer={quiz.correctAnswer}
                selected={quiz.selected}
                handleSelectedAnswer={handleSelectedAnswer}
                isDisabled={isDisabled}
                isGameOver={isGameOver}
            />   
    ))
    
    function checkAnswers(arr) {
        // checks if every .selected is null in quizArray
        // returns array of true/false values
        const selectedValueArray = quizArray.map(question => (
            question.selected !== null
        ))
        // condense to true/false value
        const allAnswersSelected = selectedValueArray.every((element) => element)
        
        // if all questions have an answer selected
        let count = 0
        if (allAnswersSelected) {
            // then count how many answers are correct
            const countCorrectAnswers = quizArray.map(question => {
                question.selected === question.correctAnswer ?
                count ++ :
                count
            })
            setCorrectAnswersCount(count)
            setIsGameOver(true)
            setIsDisabled(true)
        }
    }

    function playAgain() {
        setIsGameOver(false)
        setIsDisabled(false)
        setCorrectAnswersCount(0)
        setStartQuiz(false)
        getTriviaData()
    }
    
    return (
        <>
            <img
                className="top-blob"
                src={TopBlob}
                alt="Top Background Blob"
            />
            {!startQuiz && 
            <Home 
                toggleStart={toggleStart}
                category={category}
                handleCategoryChange={handleCategoryChange}
                difficulty={difficulty}
                handleDifficultyChange={handleDifficultyChange}
            />}
            <section className="quiz-container" style={{display: startQuiz ? "flex" : "none"}}>
                {startQuiz && <div>{quizElements}</div>}
                {startQuiz && 
                !isGameOver && 
                <button
                    className="check-answers"
                    onClick={() => checkAnswers(quizArray)}
                >
                    Check answers
                </button>}
                {isGameOver && 
                <div>
                    <p className="score-description">
                        You scored {correctAnswersCount}/{quizArray.length} correct answers
                        <button
                            className="play-again"
                            onClick={() => playAgain()}
                        >
                            Play again
                        </button>
                    </p>
                </div>}
            </section>
            
            <img
                className="bottom-blob"
                src={BottomBlob}
                alt="Top Background Blob"
            />
            
        </>
    )
}