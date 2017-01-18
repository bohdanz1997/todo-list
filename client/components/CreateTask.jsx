import React from "react";
import Button from "react-bootstrap/lib/Button";
import ModalDialog from "./ModalDialog.jsx";

class CreateTask extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      categoryId: 0,
      priorityId: 1
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleTaskAdd = this.handleTaskAdd.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleCategoryChange(e) {
    this.setState({ categoryId: e.target.value });
  }

  handlePriorityChange(e) {
    this.setState({ priorityId: e.target.value });
  }

  handleTaskAdd() {
    const newTask = {
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

  changeStateFromProps() {
    this.setState({
      categoryId: this.props.activeCategoryId
    });
  }

  render() {
    return (
      <div>
        <ModalDialog
          show={this.props.showModal}
          onHide={this.props.onClose}
          onClick={this.handleTaskAdd}
          title="Create New Task"
          >
          <form>
            <div className="form-group">
              <label>Task</label>
              <input
                type="text"
                onChange={this.handleNameChange}
                className="form-control"
                placeholder="Task" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={this.state.categoryId}
                onChange={this.handleCategoryChange}
                className="form-control">
                {
                  this.props.categories.map(cat =>
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  )
                }
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select value={this.state.priorityId}
                onChange={this.handlePriorityChange}
                className="form-control">
                {
                  this.props.priorities.map(pr =>
                    <option value={pr.id} key={pr.id}>
                      {pr.name}
                    </option>
                  )
                }
              </select>
            </div>
          </form>
        </ModalDialog>
      </div>
    );
  }
}

export default CreateTask;
