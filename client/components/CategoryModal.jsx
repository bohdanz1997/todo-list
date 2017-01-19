import React from "react";

import ModalDialog from "./ModalDialog.jsx";

import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap/lib";

class CategoryMoodal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
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
              <ControlLabel>List Name</ControlLabel>
              <FormControl
                type="text"
                defaultValue={this.props.categoryData.name}
                onChange={this.handleNameChange}
                placeholder="List Name" />
            </FormGroup>
          </form>
        </ModalDialog>
      </div>
    );
  }
}

export default CategoryMoodal;
