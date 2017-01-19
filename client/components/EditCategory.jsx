import React from "react";

import CategoryModal from "./CategoryModal.jsx";

class EditCategory extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryEdit = this.handleCategoryEdit.bind(this);

    this.state = {
      id: 0,
      name: ""
    };
  }

  changeStateFromProps() {
    this.setState({
      id: this.props.categoryData.id,
      name: this.props.categoryData.name
    });
  }

  handleNameChange(value) {
    this.setState({ name: value });
  }

  handleCategoryEdit() {
    const newCategory = {
      id: this.state.id,
      name: this.state.name
    };

    this.props.onCategoryEdit(newCategory);

    this.setState({ id: 0, name: "" });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.showModal && nextProps.showModal) {
      this.changeStateFromProps();
    }
  }

  render() {
    return (
      <div>
        <CategoryModal
          title="Edit Category"
          showModal={this.props.showModal}
          categoryData={this.state}
          onClick={this.handleCategoryEdit}
          onClose={this.props.onClose}
          onNameChange={this.handleNameChange}
        />
      </div>
    );
  }
}

export default EditCategory;
