import React, { Component }from 'react';

class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { task } = this.state
    this.props.addToList({ task });
    this.setState({
      task: ""
    })
  }

  render() {
    const styles = {
      margin: "3px"
    }
    
    return (
    <form>
      <label style={styles} htmlFor="task">Task</label>
      <input style={styles} 
             name="task" 
             id="task"
             value={this.state.task} 
             onChange={this.handleChange} 
             placeholder="What do you need to do?"/>
      <button onClick={this.handleSubmit}>Add</button>
    </form>
    );
  }
}

export default NewTodoForm;
