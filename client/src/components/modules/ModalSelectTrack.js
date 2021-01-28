import React, { Component } from "react";
import Modal from "./Modal.js"
import Select from "react-select"

import { get } from "../../utilities";

import "./ModalSelectTrack.css"

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {boolean} isOpen={this.state.showModal}
 * @param {Function} handleClose={this.handleClose}
 * @param {String} trackId={this.props.incomingTrackInfo._id}
 * 
 */
class ModalSelectTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: undefined,
      selectedOption: undefined
    }
  }

  getUserDeck = () => {
    get("/api/getMyDeckProcessed").then((deck) => {
      console.log("Deck received from server", deck);
      this.setState({ deck: deck });
    });
  }

  onOpen = () => {
    this.getUserDeck();
    this.props.autoRefreshOff();
  }

  onModalOkay = () => {
    if (this.state.selectedOption) {
      console.log("Track selected:", this.state.selectedOption);
      this.props.handleSelect(this.state.selectedOption.value);
      this.props.handleClose();
      this.setState({ deck: undefined, selectedOption: undefined });
    }
  }

  handleCloseModalClearDeck = () => {
    console.log("close modal");
    this.props.handleClose();
    this.props.autoRefreshOn();
    this.setState({ deck: undefined, selectedOption: undefined });
  }

  generateSelectionOptions = (deck) => {
    return deck.map((trackInfo) => ({ value: trackInfo, label: trackInfo.name + " -- " + trackInfo.artists.join(", ") }));
  }

  handleSelectionChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          onOpen={this.onOpen}
          handleClose={this.handleCloseModalClearDeck}
          onOkay={this.onModalOkay}
          okayButtonText="select"
        >
          {this.props.children}
          {this.state.deck ? (
            <div className="modalSelectTrack-selectBar">
              <Select
                value={this.state.selectedTrack}
                onChange={this.handleSelectionChange}
                options={this.generateSelectionOptions(this.state.deck)}              
              />
            </div>
          ) : (
            <div>Loading</div>
          )}
        </Modal>
      </>
    )
  }
}

export default ModalSelectTrack;
