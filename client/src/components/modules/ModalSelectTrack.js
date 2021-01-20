import React, { Component } from "react";
import Modal from "./Modal.js"
import Select from "react-select"

import { get } from "../../utilities";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
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
      console.log(this.state.deck.map((track) => {
        return [track.name, track.artists];
      }));
    })
  }

  handleCloseModalClearDeck = () => {
    this.props.handleClose();
    this.setState({ deck: undefined, selectedOption: undefined });
  }

  onModalOkay = () => {
    console.log("OK", this.state.selectedOption);
    this.props.setSelectedTrack(this.state.selectedOption.value);
    this.handleCloseModalClearDeck();
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
          title="choose a song!"
          open={this.props.open}
          onOpen={this.getUserDeck}
          handleClose={this.handleCloseModalClearDeck}
          onOkay={this.onModalOkay}
          okayButtonText="Select"
        >
          {this.state.deck ? (
            <>
              <Select 
                value={this.state.selectedTrack}
                onChange={this.handleSelectionChange}
                options={this.generateSelectionOptions(this.state.deck)}              
              />
            </>
          ) : (
            <div>Loading</div>
          )}
        </Modal>
      </>
    )
  }
}

export default ModalSelectTrack;
