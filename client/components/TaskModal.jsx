import React from "react";
import ModalDialog from "./ModalDialog.jsx";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap/lib";

class TaskModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  handleCategoryChange(e) {
    this.props.onCategoryChange(e.target.value);
  }

  handlePriorityChange(e) {
    this.props.onPriorityChange(e.target.value);
  }

  render() {
    return (
      <div>
        <ModalDialog
          show={this.props.showModal}
          onHide={this.props.onClose}
          onClick={this.props.onClick}
          title={this.props.title}>
          <form onSubmit={this.props.onClick}>
            <FormGroup>
              <ControlLabel>Task</ControlLabel>
              <FormControl
                type="text"
                defaultValue={this.props.taskData.name}
                onChange={this.handleNameChange}
                placeholder="Task" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Category</ControlLabel>
              <FormControl
                componentClass="select"
                value={this.props.taskData.categoryId}
                onChange={this.handleCategoryChange}>
                {
                  this.props.categories.map(cat =>
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  )
                }
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Priority</ControlLabel>
              <FormControl
                componentClass="select"
                value={this.props.taskData.priorityId}
                onChange={this.handlePriorityChange}>
                {
                  this.props.priorities.map(pr =>
                    <option
                      value={pr.id}
                      key={pr.id}>
                      {pr.name}
                    </option>
                  )
                }
              </FormControl>
            </FormGroup>
          </form>
        </ModalDialog>
      </div>
    );
  }
}

export default TaskModal;
