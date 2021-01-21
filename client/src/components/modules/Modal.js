import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} title of the modal
 * @param {string} show, a boolean to control whether or not the modal should currently be shown
 * @param {string} children, the body content of the modal
 * @param {function} handleClose, a function that handles closing the modal (setting this.prop.show to false in the parent component)
 * @param {function} onOpen, an optional prop holding a function to execute upon opening the modal
 * @param {function} onOkay, an optional prop that, if defined, adds an OK button to the modal; the prop holds a function to run upon clicking OK 
 * @param {string} okayButtonText, an optional prop that, if defined, changes the text of the OK button on the modal
 */
class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
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
          {this.props.onOkay && (
            <button onClick={this.props.onOkay}>
              {this.props.okayButtonText || (<>OK</>)}
            </button>
          )}
          <button onClick={this.props.handleClose}>
            {this.props.closeButtonText || (
              this.props.onOkay ? (
                <>Cancel</>
              ) : (
                <>Close</>
              )
            )}
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