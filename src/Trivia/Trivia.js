import React from 'react';
import data from '../Apprentice_TandemFor400_Data.json';

class Question extends React.Component {
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
  handleStartOver = () => {
    this.props.history.push('/')
  }
  render() {
    return (
      <div className='main'>
        <div className={`${this.state.isDone ? 'hidden' : ''}`}>
          <h2>Question #: {this.state.currentQuestionNumber}</h2>
          <h3>Correct: {this.state.correct} - Incorrect: {this.state.incorrect}</h3>
          <form>
            <p>{this.state.currentQuestion.question || ''}</p>
            {this.state.currentChoices.map((choice, i) =>
              <label key={i} htmlFor={choice}>
                <input
                  type='radio'
                  name='choice'
                  value={choice}
                  onChange={e => this.handleChoice(e.target.value)}
                  checked={this.state.userChoice === choice}
                />
                {choice}
              </label>
            )}
            <p className={`selection-feed ${this.state.isAnswerChosen ? 'hidden' : ''}`}>You MUST select an answer</p>
            <p className={`feedback ${this.state.showFeedback ? '' : 'hidden'}`}>{this.state.feedback}</p>
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
        <div className={`${this.state.isDone ? '' : 'hidden'}`}>
          <h2>Your results</h2>
          <p>You have {this.state.correct} correct questions and {this.state.incorrect} incorrect questions </p>
          <p>Your average score is {this.state.correct * 10}%</p>
          <h3>{`${this.state.correct === 10 ? 'TERMINATOR' : 'GOOD JOB!'}`}</h3>
          <button type='submit' onClick={this.handleStartOver}>Do it again</button>
        </div>
      </div>
    );
  }
}

export default Question;


// {this.state.data.map((question, i) => 
//   <h2 key={i}>{question.question}</h2>
//   )}