import React, { Component } from 'react';
// import './App.css';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      edit: false
    }
    this.remove = this.remove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
  }

  remove() {
    this.props.removeFromList(this.props.id);
  }

  handleEdit() {
    this.setState({
      edit: true
    });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  saveEdit(evt) {
    evt.preventDefault();
    this.props.editInList(this.props.id, this.state.task);
    this.setState({
      edit: false
    });
  }

  render() {
    if (this.state.edit) {
      return (
        <div>
          <form>
            <input name="task" 
                  onChange={this.handleChange} 
                  data-testid="task-edit-input"
                  value={this.state.task}/>
            <button id="todo-edit-save" onClick={this.saveEdit}>Save</button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            {this.state.task}
          </div>
          <button id="todo-edit" onClick={this.handleEdit}>Edit</button>
          <button id="todo-remove" onClick={this.remove}>Delete</button>
        </div>);
    }

  }
}

export default Todo;
