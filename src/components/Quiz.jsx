import React from "react"
import {nanoid} from "nanoid"

export default function Quiz(props) {
    const question = decodeURIComponent(props.question)
    const choices = props.choices
        .map(item => (
            <button 
                key={nanoid()}
                onClick={() => props.handleSelectedAnswer(props.id, item)}
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
                className="choice"
            >
                {choices}
            </div>
            <hr />
        </section>
    )
}