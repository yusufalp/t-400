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
    const welcome = <h1>Welcome to T-400</h1>;
    expect(wrapper.contains(welcome)).toEqual(true);
  });

  it('renders one h1 element that is the title', () => {
    const wrapper = shallow(<Home />)
    const title = wrapper.find('h1')
    expect(title).toHaveLength(1)
  });

  it('renders button numbers', () => {
    const wrapper = shallow(<Home />)
    const button = wrapper.find('button')
    expect(button).toHaveLength(2)
  })
})