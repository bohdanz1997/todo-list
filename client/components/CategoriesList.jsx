import React from "react";

import Category from "./Category.jsx";
import CreateCategory from "./CreateCategory.jsx";

import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
import ListGroup from "react-bootstrap/lib/ListGroup";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";

class CategoriesList extends React.Component {
  constructor() {
    super();

    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.handleCategoryAdd = this.handleCategoryAdd.bind(this);

    this.state = {
      showCreateModal: false
    }
  }

  openCreateModal() {
      this.setState({ showCreateModal: true });
  }

  closeCreateModal() {
      this.setState({ showCreateModal: false });
  }

  handleCategoryAdd(data) {
    this.closeCreateModal();
    this.props.onCategoryAdd(data);
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-6">
        <div className="panel panel-default">
          <div className="panel-heading lead clearfix">
            Categories
              <Button
                  className="pull-right"
                  bsStyle="success"
                  onClick={this.openCreateModal}>
                Create New Category
              </Button>
          </div>
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
                  onDelete={this.props.onCategoryDelete.bind(null, cat)} />
              )
            }
          </ListGroup>
          </div>
        </div>
          <CreateCategory
            onCategoryAdd={this.handleCategoryAdd}
            showModal={this.state.showCreateModal}
            onClose={this.closeCreateModal} />
      </div>
    );
  }
}

export default CategoriesList;
