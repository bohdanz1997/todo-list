import React from "react";
import "./Category.less";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";
import classnames from 'classnames';

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleCategoryDelete = this.handleCategoryDelete.bind(this);
  }

  handleCategoryClick() {
    this.props.onCategoryClick(this.props.id);
  }

  handleEditClick(e) {
    this.props.onEdit(e.target);
  }

  handleCategoryDelete(e) {
    const dataId = e.target.attributes.getNamedItem('data-id').value;
    if (this.props.tasksCount > 0) {
      if (confirm("All tasks related this category will be deleted")){
        this.props.onDelete(dataId);
      }
    }
    else {
      this.props.onDelete(dataId);
    }
  }

  renderTools() {
    const removeIconClass = classnames("glyphicon glyphicon-remove-circle", {
     "tool-white": this.props.activeCategoryId === this.props.id,
     "tool-red"  : this.props.activeCategoryId !== this.props.id
    });
    const editIconClass = classnames("glyphicon glyphicon-pencil", {
     "tool-white": this.props.activeCategoryId === this.props.id,
     "tool-red"  : this.props.activeCategoryId !== this.props.id
    });

    if (this.props.id === 0) {
      return null;
    }
    return (
     <span>
       <i className={editIconClass}
          onClick={this.handleEditClick}
          data-id={this.props.id}>
       </i>
       <i className={removeIconClass}
          onClick={this.handleCategoryDelete}
          data-id={this.props.id}>
       </i>
    </span>
    );
  }

  render() {
    return (
      <ListGroupItem
        href="#"
        active={this.props.activeCategoryId === this.props.id
          ? "active"
          : "" }
        key={this.props.key}
        onClick={this.handleCategoryClick}>
        {this.renderTools()}
        <span className="badge">{this.props.tasksCount}</span>
        {this.props.name}
      </ListGroupItem>
    );
  }
}

export default Category;
