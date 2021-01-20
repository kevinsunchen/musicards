import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

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
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default Modal;
