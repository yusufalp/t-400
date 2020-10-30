import React from 'react';
import ReactDOM from 'react-dom';
import Trivia from './Trivia';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import data from '../Apprentice_TandemFor400_Data.json';

Enzyme.configure({ adapter: new Adapter() });

describe('Trivia component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Trivia />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should select a question from data', () => {
    const questions = (data.map(question => question.question));
    const wrapper = shallow(<Trivia />);
    const question = wrapper.find('.question')
    expect(questions.includes(question.text())).toEqual(true)
  });

  it('should not show a feedback if no answer is chosen', () => {
    const wrapper = shallow(<Trivia />);
    wrapper.instance().handleChoice();
    expect(wrapper.state('isAnswerChosen')).toBe(true);
  });
})