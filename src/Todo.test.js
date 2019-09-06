import React from 'react';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Todo from './Todo';

// smoke tests
it('renders without crashing using shallow', () => {
  shallow(<Todo />);
});

it('renders without crashing using mount', () => {
  mount(<Todo />);
});

// snapshot test
it("matches snapshot", function() {
  let wrapper = shallow(<Todo />);
  let serialized = toJson(wrapper);

  expect(serialized).toMatchSnapshot();
});

// unit tests for functions
it("should run parent handler upon clicking to remove", function(){
  let removeTodo = jest.fn();
  let wrapper = mount(<Todo removeFromList={removeTodo}/>);

  wrapper
    .find('#todo-remove')
    .simulate("click");
  
  expect(removeTodo).toHaveBeenCalled();
});

it("change state upon clicking edit", function(){
  let wrapper = mount(<Todo />);

  wrapper
    .find('#todo-edit')
    .simulate("click")

    expect(wrapper.state().edit).toBe(true);
});

it("change state when input changes", function(){
  let wrapper = mount(<Todo task={"Dig a hole"}/>);

  wrapper
    .find('#todo-edit')
    .simulate("click")

  wrapper
    .find('input[name="task"]')
    .simulate("change", {target: {name: "task", value: "Build a skyscraper"}});

  expect(wrapper.state().task).toBe("Build a skyscraper");
});

it("change state saving an edit", function(){
  const editTodo = jest.fn()
  let wrapper = mount(<Todo task={"Dig another hole"} editInList={editTodo}/>);

  // click edit button
  wrapper
    .find('#todo-edit')
    .simulate("click");

  // edit task
  wrapper
    .find('input[name="task"]')
    .simulate("change", {target: {name: "task", value: "Build a submarine"}});
    
  wrapper
    .find('#todo-edit-save')
    .simulate("click");

  expect(wrapper.state().task).toBe("Build a submarine");
});