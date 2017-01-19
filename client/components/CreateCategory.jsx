import React from "react";

import CategoryModal from "./CategoryModal.jsx";

class CreateCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryAdd = this.handleCategoryAdd.bind(this);
  }

  handleNameChange(value) {
    this.setState({name: value});
  }

  handleCategoryAdd() {
    const newCategory = {
      name: this.state.name
    };

    this.props.onCategoryAdd(newCategory);

    this.setState({ name: "" });
  }

  render() {
    return (
      <div>
        <CategoryModal
          title="Create New Category"
          showModal={this.props.showModal}
          categoryData={this.state}
          onClick={this.handleCategoryAdd}
          onClose={this.props.onClose}
          onNameChange={this.handleNameChange}
        />
      </div>
    );
  }
}

export default CreateCategory;
