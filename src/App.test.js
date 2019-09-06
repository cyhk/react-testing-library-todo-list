import React from 'react';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import App from './App';

it('renders without crashing using shallow', () => {
  shallow(<App />);
});

it('renders without crashing using mount', () => {
  mount(<App />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<App />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});