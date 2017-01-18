import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

class ModalDialog extends React.Component {
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.children}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            <Button
              onClick={this.props.onClick}
              bsStyle="primary">
                Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalDialog;
