import React from "react"
import {nanoid} from "nanoid"

export default function Quiz(props) {
    const question = decodeURIComponent(props.question)
    const classes = (item) => {
        if (props.isGameOver) {
            if (item === (props.selected && props.correctAnswer)) {
                return "correct-answer choices-btn"
            } else if ((item === props.selected) && (item !== props.correctAnswer)) {
                return "wrong-answer choices-btn"
            } else {
                return "faded-btn"
            }
        } else if (!props.isGameOver) {
            if (props.selected === item) {
                return "selected-answer choices-btn"
            } else {
                return "choices-btn"
            }
        }
    }

    const style = {cursor: props.isDisabled ? "auto" : "pointer"}
    const choices = props.choices
        .map(item => (
            <button
                className={classes(item)}
                key={nanoid()}
                onClick={() => props.handleSelectedAnswer(props.id, item)}
                disabled={props.isDisabled}
                style={style}
            >
                {decodeURIComponent(item)}
            </button>
        ))

    return(
        <section className="quiz">
            <div 
                className="question"
            >
                {question}
            </div>
            <div
                className="choices"
            >
                {choices}
            </div>
            <hr />
        </section>
    )
}