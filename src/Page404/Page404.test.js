import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Page404 from './Page404';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe('Page404 component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Page404 />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<Page404 />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders not found message", () => {
    const wrapper = shallow(<Page404 />);
    const notFound = <h2>Page not found!</h2>;
    expect(wrapper.contains(notFound)).toEqual(true);
  });

  it('renders one h2 element that has the message', () => {
    const wrapper = shallow(<Page404 />)
    const message = wrapper.find('h2')
    expect(message).toHaveLength(1)
  });

  it('renders one image', () => {
    const wrapper = shallow(<Page404 />)
    const image = wrapper.find('img')
    expect(image).toHaveLength(1)
  })
})