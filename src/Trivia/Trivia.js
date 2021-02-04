import React from 'react';
import data from '../Apprentice_TandemFor400_Data.json';
import Result from '../Result/Result';

class Trivia extends React.Component {
  state = {
    data: data,
    // track the question number
    currentQuestionNumber: 1,
    // use the current question being chosen randomly and its choices 
    currentQuestion: {},
    currentChoices: [],
    userChoice: '',
    correct: 0,
    incorrect: 0,
    showFeedback: false,
    feedback: '',
    // track the questions asked
    askedQuestions: [],
    // if user submits without an answer
    isAnswerChosen: true,
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

    if (!this.state.askedQuestions.includes(questionNumber)) {
      this.setState({
        askedQuestions: [...this.state.askedQuestions, questionNumber],
        currentQuestion: this.state.data[questionNumber],
        // the order of the choices are randomized
        currentChoices: choices.sort(() => .5 - Math.random())
      });
    } else {
      this.componentDidMount();
    }
  }
  handleChoice = (value) => {
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
      });
      return;
    }

    this.setState({
      showFeedback: true
    });

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
    e.preventDefault();
    this.setState({
      currentQuestionNumber: this.state.currentQuestionNumber + 1,
      userChoice: '',
      showFeedback: false,
      feedback: ''
    });

    if (this.state.currentQuestionNumber < 10) {
      this.componentDidMount();
    } else {
      this.setState({
        isDone: true
      });
    }
  }
  render() {
    return (
      <div className='title'>
        <div className={`${this.state.isDone ? 'hidden' : ''}`}>
          <h2>Question #: {this.state.currentQuestionNumber}</h2>
          <h3>Correct: {this.state.correct} - Incorrect: {this.state.incorrect}</h3>
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
            <p className={`feedback select-feed ${this.state.isAnswerChosen ? 'hidden' : ''}`}>You MUST select an answer</p>
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
        <div className={`result ${this.state.isDone ? '' : 'hidden'}`}>
          <Result correct={this.state.correct} incorrect={this.state.incorrect} />
        </div>
      </div>
    );
  }
}

export default Trivia;