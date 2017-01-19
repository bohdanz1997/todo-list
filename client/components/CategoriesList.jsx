import React from "react";

import Category from "./Category.jsx";
import CreateCategory from "./CreateCategory.jsx";
import EditCategory from "./EditCategory.jsx";

import { Button, Modal, ListGroup, ListGroupItem, Col } from "react-bootstrap/lib";

import axios from "../api";

class CategoriesList extends React.Component {
  constructor() {
    super();

    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.handleCategoryAdd = this.handleCategoryAdd.bind(this);
    this.handleCategoryEditClick = this.handleCategoryEditClick.bind(this);
    this.handleCategoryEdit = this.handleCategoryEdit.bind(this);

    this.state = {
      showCreateModal: false,
      showEditModal: false,
      categoryDataForEdit: {
        id: 0,
        name: ""
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

  handleCategoryAdd(data) {
    this.closeCreateModal();
    this.props.onCategoryAdd(data);
  }

  handleCategoryEditClick(data) {
    axios.getCategory(data.attributes.getNamedItem('data-id').value)
    .then(data => {
      this.setState({ categoryDataForEdit: data.data });
      this.openEditModal();
    });
  }

  handleCategoryEdit(data) {
    this.closeEditModal();
    this.props.onCategoryEdit(data);
  }

  renderPanelHead() {
    return (
      <div className="panel-heading lead clearfix">
        Categories
          <Button
              className="pull-right"
              bsStyle="success"
              onClick={this.openCreateModal}>
            Create New Category
          </Button>
      </div>
    );
  }

  renderPanelBody() {
    return (
      <div className="panel-body">
        <ListGroup>
          <Category
            name="All"
            key={0}
            id={0}
            activeCategoryId={this.props.activeCategoryId}
            tasksCount={this.props.data.tasks.length}
            onCategoryClick={this.props.onCategoryClick} />
          {
            this.props.data.categories.map(cat =>
              <Category
                name={cat.name}
                key={cat.id}
                id={cat.id}
                activeCategoryId={this.props.activeCategoryId}
                tasksCount={cat.tasks.length}
                onCategoryClick={this.props.onCategoryClick}
                onEdit={this.handleCategoryEditClick}
                onDelete={this.props.onCategoryDelete} />
            )
          }
      </ListGroup>
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
          <CreateCategory
            onCategoryAdd={this.handleCategoryAdd}
            showModal={this.state.showCreateModal}
            onClose={this.closeCreateModal} />
          <EditCategory
            categoryData={this.state.categoryDataForEdit}
            onCategoryEdit={this.handleCategoryEdit}
            showModal={this.state.showEditModal}
            onClose={this.closeEditModal} />
      </Col>
    );
  }
}

export default CategoriesList;
