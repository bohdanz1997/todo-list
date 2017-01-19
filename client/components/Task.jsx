import React from "react";
import classnames from 'classnames';

class Task extends React.Component {
  constructor() {
    super();

    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick(e) {
    this.props.onTaskEdit(e.target);
  }

  renderTaskSection() {
    const { isDone, name, category, priorityId } = this.props.taskData;
    //const priorities = this.props.priorities;
    const labelClass = classnames("label", {
      "label-danger" : priorityId == 1,
      "label-warning": priorityId == 2,
      "label-success": priorityId == 3
    });

    return (
      <span>
        <input type="checkbox" checked={isDone} onChange={this.props.onCheckedChange} />
        <span className="text">{name}</span>
        <small className={labelClass}>{category.name}</small>
      </span>
    );
  }

  renderActionsSection() {
    return (
      <div className="tools">
        <i data-id={this.props.taskData.id}
          className="glyphicon glyphicon-pencil"
          onClick={this.handleEditClick}></i>
        <i className="glyphicon glyphicon-remove-circle"
          onClick={this.props.onDelete}></i>
      </div>
    );
  }

  render() {
    return (
      <li onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={this.props.taskData.isDone ? "done" : ""}
        key={this.props.key}>
        {this.renderTaskSection()}
        {this.renderActionsSection()}
      </li>
    );
  }
}

export default Task;
