import Dropdown from "./Dropdown"

export default function Home(props) {
    const categoryOptions =[
        {label: 'General Knowledge', value:'9'},
        {label: 'Entertainment: Books', value:'10'},
        {label: 'Entertainment: Film', value:'11'},
        {label: 'Entertainment: Music', value:'12'},
        {label: 'Entertainment: Musicals & Theatres', value:'13'},
        {label: 'Entertainment: Television', value:'14'},
        {label: 'Entertainment: Video Games', value:'15'},
        {label: 'Entertainment: Board Games', value:'16'},
        {label: 'Science & Nature', value:'17'},
        {label: 'Science: Computers', value:'18'},
        {label: 'Science: Mathematics', value:'19'},
        {label: 'Mythology', value:'20'},
        {label: 'Sports', value:'21'},
        {label: 'Geography', value:'22'},
        {label: 'History', value:'23'},
        {label: 'Politics', value:'24'},
        {label: 'Art', value:'25'},
        {label: 'Celebrities', value:'26'},
        {label: 'Animals', value:'27'},
        {label: 'Vehicles', value:'28'},
        {label: 'Entertainment: Comics', value:'29'},
        {label: 'Science: Gadgets', value:'30'},
        {label: 'Entertainment: Japanese Anime & Manga', value:'31'},
        {label: 'Entertainment: Cartoon & Animations', value:'32'}
    ]

    const difficultyOptions =[
        {label: 'Easy', value: 'easy'},
        {label: 'Medium', value: 'medium'},
        {label: 'Hard', value: 'hard'}
    ]

    return (
        <div className="home-container">
        <section className="home">
            <h1 className="title">Quizzical</h1>
            <p className="description">Trivia Game</p>
            <div className="dropdown">
                <Dropdown
                    label="Category:"
                    options={categoryOptions}
                    value={props.category}
                    onChange={props.handleCategoryChange}
                />
            </div>
            <div className="dropdown">
                <Dropdown
                    label="Difficulty:"
                    options={difficultyOptions}
                    value={props.difficulty}
                    onChange={props.handleDifficultyChange}
                />
            </div>
            <button 
                className="start-quiz"
                onClick={props.toggleStart}
            >
                Start quiz
            </button>
        </section>
        </div>
    )
}