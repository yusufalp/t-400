import React from 'react';
import data from '../Apprentice_TandemFor400_Data.json';

class Trivia extends React.Component {
  state = {
    // import all data from JSON file
    data: data,
    // track the question number
    currentQuestionNumber: 1,
    // use the current question being chosen randomly and its choices 
    currentQuestion: {},
    currentChoices: [],
    // use the user choice from the inputs
    userChoice: '',
    // track the number of correct and incorrect answers
    correct: 0,
    incorrect: 0,
    // once submitted, show the feedback
    showFeedback: false,
    feedback: '',
    // track the questions asked
    askedQuestions: [],
    // if user submits without an answer
    isAnswerChosen: true,
    // when user answers all 10 questions
    isDone: false
  }
  componentDidMount() {
    this.decideQuestion();
  }
  decideQuestion = () => {
    let questionNumber = Math.floor(Math.random() * (this.state.data.length));
    // add all the choices together in array to be randomized later on 
    // so that the place of the correct choice is different all the time
    let choices = [...this.state.data[questionNumber].incorrect, this.state.data[questionNumber].correct];

    // if questions is asked before in the same round, choose a different question
    if (!this.state.askedQuestions.includes(questionNumber)) {
      this.setState({
        askedQuestions: [...this.state.askedQuestions, questionNumber],
        currentQuestion: this.state.data[questionNumber],
        // the order of the choices are randomized
        currentChoices: choices.sort(() => .5 - Math.random())
      });
    } else {
      this.componentDidMount()
    }
  }
  handleChoice = (value) => {
    // retrieves the value of the user choice and confirms a valid choice is selected
    this.setState({
      userChoice: value,
      isAnswerChosen: true
    });
  }
  handleSubmit = (e) => {
    // if nothing is selected, a message is displayed
    e.preventDefault();
    if (!this.state.userChoice) {
      this.setState({
        isAnswerChosen: false
      })
      return
    }

    this.setState({
      showFeedback: true
    });
    // check the submitted answer, provide feedback and change correct/incorrect count
    if (this.state.userChoice === this.state.currentQuestion.correct) {
      this.setState({
        correct: this.state.correct + 1,
        feedback: 'You got it right'
      });
    } else {
      this.setState({
        incorrect: this.state.incorrect + 1,
        feedback: `Sorry, this correct answer is '${this.state.currentQuestion.correct}'`
      });
    }
  }
  handleNext = (e) => {
    e.preventDefault()
    this.setState({
      currentQuestionNumber: this.state.currentQuestionNumber + 1,
      userChoice: '',
      showFeedback: false,
      feedback: ''
    });

    // show the results page after the 10 questions
    if (this.state.currentQuestionNumber < 10) {
      this.componentDidMount();
    } else {
      this.setState({
        isDone: true
      })
    }
  }
  // user can start over with random question by clicking the start over button on the result page
  handleStartOver = () => {
    this.props.history.push('/')
  }
  render() {
    return (
      <div className='title'>
        <div className={`${this.state.isDone ? 'hidden' : ''}`}>
          {/* scoreboard */}
          <h2>Question #: {this.state.currentQuestionNumber}</h2>
          <h3>Correct: {this.state.correct} - Incorrect: {this.state.incorrect}</h3>
          {/* question and the choices displayed one at a time */}
          <form>
            <p className='question'>{this.state.currentQuestion.question || ''}</p>
            {this.state.currentChoices.map((choice, i) =>
              <div key={i}>
                <input
                  id={choice}
                  type='radio'
                  name='choice'
                  value={choice}
                  onChange={e => this.handleChoice(e.target.value)}
                  checked={this.state.userChoice === choice}
                  disabled={this.state.showFeedback ? true : false}
                />
                <label htmlFor={choice}>{choice}</label>
              </div>
            )}
            {/* if no answers is chosen on submit, message appears */}
            <p className={`feedback select-feed ${this.state.isAnswerChosen ? 'hidden' : ''}`}>You MUST select an answer</p>
            {/* feedback displayed depending on the user choice */}
            <p className={`feedback ${this.state.showFeedback ? '' : 'hidden'} ${this.state.userChoice === this.state.currentQuestion.correct ? 'correct' : 'wrong'}`}>{this.state.feedback}</p>
            <button
              className={`${this.state.showFeedback ? 'hidden' : ''}`}
              type='submit'
              onClick={e => this.handleSubmit(e)}>
              Submit
            </button>
            <button
              className={`${this.state.showFeedback ? '' : 'hidden'}`}
              type='submit'
              onClick={e => this.handleNext(e)}>
              {`${this.state.currentQuestionNumber === 10 ? 'Show Results' : 'Next'}`}
            </button>
          </form>
        </div>
        {/* once all 10 questions answered, result page appears */}
        <div className={`result ${this.state.isDone ? '' : 'hidden'}`}>
          <h2>Your results</h2>
          <p>You have {this.state.correct} correct questions and {this.state.incorrect} incorrect questions </p>
          <p>Your average score is {this.state.correct * 10}%</p>
          <h3>{`${this.state.correct === 10
            ? 'TERMINATOR'
            : 'GOOD JOB!'}`}</h3>
          <img className='result-img' src={`${this.state.correct === 10
            ? 'https://live.staticflickr.com/450/19869372178_6bf3dc0a10_b.jpg'
            : 'https://upload.wikimedia.org/wikipedia/commons/b/be/Arnold_Schwarzenegger_2%2C_2012.jpg'}`} alt='arnold' />
          <p>Will you be back?</p>
          <button type='submit' onClick={this.handleStartOver}>Do it again</button>
        </div>
      </div>
    );
  }
}

export default Trivia;