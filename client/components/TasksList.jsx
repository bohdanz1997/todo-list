import React from "react";

import Task from "./Task.jsx";
import CreateTask from "./CreateTask.jsx";
import EditTask from "./EditTask.jsx";

import { Button, Modal, Col } from "react-bootstrap/lib";

import axios from "../api";

class TasksList extends React.Component {

  constructor(props) {
    super(props);

    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.handleTaskAdd = this.handleTaskAdd.bind(this);
    this.handleTaskAddClick = this.handleTaskAddClick.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.handleTaskEdit = this.handleTaskEdit.bind(this);
    this.handleTaskEditClick = this.handleTaskEditClick.bind(this);

    this.state = {
      showCreateModal: false,
      showEditModal: false,
      taskDataForEdit: {
        id: 0,
        name: "",
        categoryId: 0,
        priorityId: 1
      }
    }
  }

  openCreateModal() {
      this.setState({ showCreateModal: true });
  }

  closeCreateModal() {
      this.setState({ showCreateModal: false });
  }

  openEditModal() {
    this.setState({ showEditModal: true });
  }

  closeEditModal() {
    this.setState({ showEditModal: false });
  }

  handleTaskAddClick() {
    if (this.props.data.categories.length > 0) {
      this.openCreateModal();
    }
    else {
      alert("Firstly create any category!");
    }
  }

  handleTaskAdd(data) {
    this.closeCreateModal();
    this.props.onTaskAdd(data);
  }

  handleTaskEditClick(data) {
    axios.getTask(data.attributes.getNamedItem('data-id').value)
    .then(data => {
      this.setState({ taskDataForEdit: data.data });
      this.openEditModal();
    });
  }

  handleTaskEdit(data) {
    this.closeEditModal();
    this.props.onTaskEdit(data);
  }

  renderPanelHead() {
    return(
      <div className="panel-heading lead clearfix">
        Tasks
        <Button
            className="pull-right"
            bsStyle="success"
            onClick={this.handleTaskAddClick}>
          Create New Task
        </Button>
      </div>
    );
  }

  renderPanelBody() {
    const tasks = this.props.activeCategoryId === 0
      ? this.props.data.tasks
      : this.props.data.tasks
        .filter(t => t.categoryId === this.props.activeCategoryId);
    return(
      <div className="panel-body">
        <ul className="todo-list ui-sortable">
          {
            tasks.map(task =>
              <Task
                key={task.id}
                taskData={task}
                priorities={this.props.data.priorities}
                onCheckedChange={this.props.onTaskStatusChange.bind(this, task)}
                onTaskEdit={this.handleTaskEditClick}
                onDelete={this.props.onTaskDelete.bind(this, task)} />
            )
          }
        </ul>
      </div>
    );
  }

  render() {
    return (
      <Col xs={12} sm={6}>
        <div className="panel panel-default">
          {this.renderPanelHead()}
          {this.renderPanelBody()}
        </div>
        <CreateTask
          activeCategoryId={this.props.activeCategoryId}
          categories={this.props.data.categories}
          priorities={this.props.data.priorities}
          onTaskAdd={this.handleTaskAdd}
          showModal={this.state.showCreateModal}
          onClose={this.closeCreateModal} />
        <EditTask
          taskData={this.state.taskDataForEdit}
          categories={this.props.data.categories}
          priorities={this.props.data.priorities}
          onTaskEdit={this.handleTaskEdit}
          showModal={this.state.showEditModal}
          onClose={this.closeEditModal} />
      </Col>
    );
  }
}

export default TasksList;
