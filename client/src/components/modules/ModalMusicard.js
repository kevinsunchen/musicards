import React, { Component } from "react";
import Modal from "./Modal.js"
import Musicard from "./Musicard.js";

import "./ModalMusicard.css";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
class ModalMusicard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  processTrackArtists = (artistsList) => {
    const n = artistsList.length;
    if (n === 1) {
      return artistsList[0];
    } else if (n === 2) {
      return artistsList[0] + " and " + artistsList[1];
    } else {
      return artistsList.slice(0, n-1).join(", ") + ", and " + artistsList[n-1];
    }
  }

  handleClick = () => {
    this.setState({ showModal: true });
  }

  handleClose = () => {
    this.setState({ showModal: false });
  }

  render() {
    let content = null;
    if (this.props.trackId) {
      content =
        <Modal
          isOpen={this.props.isOpen}
          handleClose={this.props.handleClose}
        >
          <div className="ModalMusicard-ModalContent">
            <div className="ModalMusicard-ModalText">
              {this.props.title}
            </div>
            <div className="ModalMusicard-ModalSubtitle">
              {this.props.subtitle}  
            </div>
            <Musicard trackId={this.props.trackId}/>
          </div>
        </Modal>
    }
    return (
      <>
        {content}
      </>
    );
  }
}

export default ModalMusicard;
