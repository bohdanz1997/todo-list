import React from "react";

import TaskModal from "./TaskModal.jsx";

class EditTask extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleTaskEdit = this.handleTaskEdit.bind(this);

    this.state = {
      id: 0,
      name: "",
      categoryId: 0,
      priorityId: 1
    };
  }

  changeStateFromProps() {
    this.setState({
      id: this.props.taskData.id,
      name: this.props.taskData.name,
      categoryId: this.props.taskData.CategoryId,
      priorityId: this.props.taskData.PriorityId
    });
  }

  handleNameChange(value) {
    this.setState({ name: value });
  }

  handleCategoryChange(value) {
    this.setState({ categoryId: value });
  }

  handlePriorityChange(value) {
    this.setState({ priorityId: value });
  }

  handleTaskEdit() {
    const newTask = {
      id: this.state.id,
      name: this.state.name,
      categoryId: this.state.categoryId,
      priorityId: this.state.priorityId
    };

    this.props.onTaskEdit(newTask);

    this.setState({
      id: 0,
      name: "",
      categoryId: 0,
      priorityId: 1
     });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.showModal && nextProps.showModal) {
      this.changeStateFromProps();
    }
  }

  render() {
    return (
      <div>
        <TaskModal
          title="Edit Task"
          showModal={this.props.showModal}
          taskData={this.state}
          categories={this.props.categories}
          priorities={this.props.priorities}
          onClick={this.handleTaskEdit}
          onClose={this.props.onClose}
          onNameChange={this.handleNameChange}
          onCategoryChange={this.handleCategoryChange}
          onPriorityChange={this.handlePriorityChange}
        />
      </div>
    );
  }
}

export default EditTask;
