import React from 'react';
import data from '../Apprentice_TandemFor400_Data.json';

class Question extends React.Component {
  state = {
    // import all from JSON file
    data: data,
    // track the question number
    currentQuestionNumber: 1,
    // use the current question being chosen randomly and its choices 
    currentQuestion: {},
    currentChoices: [],
    // use the userChoice from the inputs
    userChoice: '',
    // track the number of correct and incorrect answers
    correct: 0,
    incorrect: 0,
    showFeedback: false,
    feedback: '',
    // track the questions asked
    askedQuestions: []
  }
  componentDidMount() {
    this.decideQuestion();
  }
  decideQuestion = () => {
    let questionNumber = Math.floor(Math.random() * (this.state.data.length));
    console.log(questionNumber, this.state.askedQuestions)
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
    this.setState({
      userChoice: value
    });
  }
  handleSubmit = () => {
    this.setState({
      showFeedback: true
    });
    // check the submitted answer and provide feedback
    if (this.state.userChoice === this.state.currentQuestion.correct) {
      this.setState({
        correct: this.state.correct + 1,
        feedback: 'You got it right'
      });
    } else {
      this.setState({
        incorrect: this.state.incorrect + 1,
        feedback: `Sorry, this correct answer is ${this.state.currentQuestion.correct}`
      });
    }
  }
  handleNext = () => {
    this.setState({
      currentQuestionNumber: this.state.currentQuestionNumber + 1,
      showFeedback: false,
      feedback: ''
    });
    // show the results page after the 10 questions
    if (this.state.currentQuestionNumber < 3) {
      this.componentDidMount();
    } else {
      this.props.history.push('/results')
    }
  }
  render() {
    return (
      <div>
        <h2>Question #:{this.state.currentQuestionNumber}</h2>
        <h3>Correct:{this.state.correct} - Incorrect: {this.state.incorrect}</h3>
        <p>{this.state.currentQuestion.question || ''}</p>
        {this.state.currentChoices.map((choice, i) =>
          <div key={i} >
            <input
              type='radio'
              name='choice'
              value={choice}
              onChange={e => this.handleChoice(e.target.value)}
              required
            />
            <label htmlFor={choice}>{choice}</label>
          </div>
        )}
        <p className={`feedback ${this.state.showFeedback ? '' : 'hidden'}`}>{this.state.feedback}</p>
        <button
          className={`button ${this.state.showFeedback ? 'hidden' : ''}`}
          type='submit'
          onClick={this.handleSubmit}>Submit</button>
        <button
          className={`feedback ${this.state.showFeedback ? '' : 'hidden'}`}
          type='submit'
          onClick={this.handleNext}>{`${this.state.currentQuestionNumber === 3 ? 'Show Results' : 'Show Results'}`}</button>
      </div>
    );
  }
}

export default Question;


// {this.state.data.map((question, i) => 
//   <h2 key={i}>{question.question}</h2>
//   )}