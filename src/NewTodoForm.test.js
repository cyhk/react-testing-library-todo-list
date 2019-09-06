import React from 'react';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import NewTodoForm from './NewTodoForm';

it('renders without crashing using shallow', () => {
  shallow(<NewTodoForm />);
});

it('renders without crashing using mount', () => {
  mount(<NewTodoForm />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<NewTodoForm />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("should change state when input changes", function() {
  let wrapper = mount(<NewTodoForm />);

  //test task
  wrapper
    .find('input[name="task"]')
    .simulate("change", {target: {name: "task", value: "Sleep"}});

  expect(wrapper.state().task).toBe("Sleep");
})

it("should submit when button is pressed", function(){
  const addTodo = jest.fn();
  let wrapper = mount(<NewTodoForm addToList={addTodo}/>);

  wrapper
    .find("button")
    .simulate("click")

  expect(addTodo).toHaveBeenCalled();
});