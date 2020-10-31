import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Result from './Result';

describe('Result component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Result />
      </MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Result />
        </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})