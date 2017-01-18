import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import ModalDialog from "./ModalDialog.jsx";

class CreateCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCategoryAdd = this.handleCategoryAdd.bind(this);
  }

  handleTextChange(e) {
    this.setState({name: e.target.value});
  }

  handleCategoryAdd() {
    const newCategory = {
      name: this.state.name
    };

    this.props.onCategoryAdd(newCategory);
    this.setState({name: ""});
  }

  render() {
    return (
      <div>
        <ModalDialog show={this.props.showModal}
          onHide={this.props.onClose}
          onClick={this.handleCategoryAdd}
          title="Create New Category">
          <form>
            <div className="form-group">
              <label>List Name</label>
              <input type="text"
                onChange={this.handleTextChange}
                className="form-control"
                placeholder="List Name"/>
            </div>
          </form>
        </ModalDialog>
      </div>
    );
  }
}

export default CreateCategory;
