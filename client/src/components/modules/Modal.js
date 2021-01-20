import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} title of the modal
 * @param {string} show, a boolean to control whether or not the modal should currently be shown
 * @param {string} children, the body content of the modal
 * @param {string} handleClose, a function that handles closing the modal (setting this.prop.show to false in the parent component)
 */
class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props, prevProps)
    if (!prevProps.open && this.props.open) {
      this.props.onOpen();
    }
  }

  render() {
    if (!this.props.open) {
      return null;
    }
    else {
      return (
        <>
        <div>
          {this.props.title}
        </div>

        <div>
          {this.props.children}
        </div>

        <div>
          <button onClick={this.props.handleClose}>
            Close
          </button>
        </div>
        </>
      );
    }
  }
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default Modal;
