import React from 'react';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import TodoList from './TodoList';

it('renders without crashing using shallow', () => {
  shallow(<TodoList />);
});

it('renders without crashing using mount', () => {
  mount(<TodoList />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<TodoList />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("should add a Todo component to todos array", function() {
  let wrapper = mount(<TodoList />);
  expect(wrapper.state().todos.length).toBe(0);

  wrapper
    .instance()
    .addTodo({ task: "Eat" });

  expect(wrapper.state().todos.length).toBe(1);
});

it("should remove a Todo component from the todos array", function(){
  let wrapper = mount(<TodoList />);

  wrapper
    .instance()
    .addTodo({ task: "Eat" });

  expect(wrapper.state().todos.length).toBe(1);

  let id = wrapper.state().todos[0].uniqueID;

  wrapper
    .instance()
    .removeTodo(id);

  expect(wrapper.state().todos.length).toBe(0);
});

it("should edit a Todo component from the todos array", function(){
  let wrapper = mount(<TodoList />);

  wrapper
    .instance()
    .addTodo({ task: "Eat" });

  expect(wrapper.state().todos.length).toBe(1);

  let id = wrapper.state().todos[0].uniqueID;

  wrapper
    .instance()
    .editTodo(id, "Sleep");

  expect(wrapper.state().todos.length).toBe(1);
  expect(wrapper.state().todos[0].task).toBe("Sleep");
});