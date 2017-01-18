import React from "react";
import "./Category.less";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";
import classnames from 'classnames';

class Category extends React.Component {
  constructor() {
    super();
    this.handleCategoryClick = this.handleCategoryClick.bind(this);

  }

handleCategoryClick() {
  this.props.onCategoryClick(this.props.id);
}

  render() {
    const removeIconClass = classnames("glyphicon glyphicon-remove-circle", {
     "tool-white": this.props.activeCategoryId === this.props.id,
     "tool-red"  : this.props.activeCategoryId !== this.props.id
    });
    return (
      <ListGroupItem
        href="#"
        active={this.props.activeCategoryId === this.props.id
          ? "active"
          : "" }
        key={this.props.key}
        onClick={this.handleCategoryClick}>
        {
          this.props.id === 0
          ? <i></i>
          : <i className={removeIconClass}
            onClick={this.props.onDelete}
            data-id={this.props.id}></i> }
        <span className="badge">{this.props.tasksCount}</span>
        {this.props.name}
      </ListGroupItem>
    );
  }
}

export default Category;
