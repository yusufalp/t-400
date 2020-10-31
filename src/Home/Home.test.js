import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Home from './Home';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe('Home component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<Home />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders Home title", () => {
    const wrapper = shallow(<Home />);
    const welcome = wrapper.find('h1');
    expect(welcome).toHaveLength(1);
    expect(welcome.text()).toEqual('Welcome to T-400');
  });

  it('renders button numbers', () => {
    const wrapper = shallow(<Home />);
    const button = wrapper.find('button');
    expect(button).toHaveLength(2);
  })
})