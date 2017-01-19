import React from "react";

import TaskModal from "./TaskModal.jsx";

class CreateTask extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleTaskAdd = this.handleTaskAdd.bind(this);

    this.state = {
      id: 0,
      name: "",
      categoryId: 0,
      priorityId: 1
    };
  }

  changeStateFromProps() {
    if (this.props.activeCategoryId == 0) {
      this.setState({
        categoryId: this.props.categories[0].id
      });
    }
    else {
      this.setState({
        categoryId: this.props.activeCategoryId
      });
    }
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

  handleTaskAdd() {
    const newTask = {
      id: this.state.id,
      name: this.state.name,
      categoryId: this.state.categoryId,
      priorityId: this.state.priorityId
    };

    this.props.onTaskAdd(newTask);

    this.setState({
      name: ""
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
          title="Create New Task"
          showModal={this.props.showModal}
          taskData={this.state}
          categories={this.props.categories}
          priorities={this.props.priorities}
          onClick={this.handleTaskAdd}
          onClose={this.props.onClose}
          onNameChange={this.handleNameChange}
          onCategoryChange={this.handleCategoryChange}
          onPriorityChange={this.handlePriorityChange}
        />
      </div>
    );
  }
}

export default CreateTask;
