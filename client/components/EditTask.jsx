import React from "react";
import Button from "react-bootstrap/lib/Button";
import ModalDialog from "./ModalDialog.jsx";

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

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleCategoryChange(e) {
    this.setState({ categoryId: e.target.value });
  }

  handlePriorityChange(e) {
    this.setState({ priorityId: e.target.value });
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
        <ModalDialog
          show={this.props.showModal}
          onHide={this.props.onClose}
          onClick={this.handleTaskEdit}
          title="Edit Task">
          <form>
            <div className="form-group">
              <label>Task</label>
              <input
                type="text"
                defaultValue={this.props.taskData.name}
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
              <select
                value={this.state.priorityId}
                onChange={this.handlePriorityChange}
                className="form-control">
                {
                  this.props.priorities.map(pr =>
                    <option
                      value={pr.id}
                      key={pr.id}>
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

export default EditTask;
