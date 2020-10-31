import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Trivia from './Trivia';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import data from '../Apprentice_TandemFor400_Data.json';

Enzyme.configure({ adapter: new Adapter() });

describe('Trivia component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Trivia />
      </MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should select a question from data', () => {
    const questions = (data.map(question => question.question));
    const wrapper = shallow(<Trivia />);
    const question = wrapper.find('.question');
    expect(questions.includes(question.text())).toEqual(true);
  });

  it('should show a message when no answer is chosen', ()=>{
    const wrapper = shallow(<Trivia />);
    const message = wrapper.find('.select-feed');
    expect(message).toHaveLength(1);
    expect(message.text()).toEqual('You MUST select an answer');
  })

  it('should not show a feedback if no answer is chosen', () => {
    const wrapper = shallow(<Trivia />);
    wrapper.instance().handleChoice();
    expect(wrapper.state('isAnswerChosen')).toBe(true);
  });
})