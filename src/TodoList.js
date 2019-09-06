import React, { Component }from 'react';
// import './App.css';
import uuid from "uuid/v4"
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    }
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }

  addTodo(data){
    this.setState(function(st) {
      const { task } = data;
      const uniqueID = uuid();

      const newTodo = {
        task,
        uniqueID
      }
      const newTodos = [...st.todos, newTodo];
      return {todos: newTodos}
    });
  }

  removeTodo(id){
    this.setState(function(st) {
      const newTodos =st.todos.filter(todo => todo.uniqueID !== id);
      return {todos: newTodos}
    });
  }

  editTodo(id, newTask){
    this.setState(function(st) {
      // find element
      const changeIdx = st.todos.findIndex(todo => todo.uniqueID === id);
      const oldTodo = st.todos[changeIdx];
      const newTodos = [...st.todos];

      // change element
      const editedTodos = {
        task: newTask,
        uniqueID: oldTodo.uniqueID
      }

      newTodos[changeIdx] = editedTodos;

      // return element
      return({todos: newTodos});
    });
  }

  render() {
    const todos = this.state.todos.map(todo => <Todo key={todo.uniqueID} 
                                                     id={todo.uniqueID} 
                                                     removeFromList={this.removeTodo} 
                                                     editInList={this.editTodo} 
                                                     task={todo.task}/>)
    return (<div>
      <NewTodoForm addToList={this.addTodo}/>
      {todos}
    </div>);
  }
}

export default TodoList;