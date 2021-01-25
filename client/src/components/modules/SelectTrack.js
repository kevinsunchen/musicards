import React, { Component } from "react";
import Modal from "./Modal.js"
import Select from "react-select"

import { get } from "../../utilities";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} handleSelectionChange
 * @param {string} children
 */
class SelectTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: undefined
    }
  }

  componentDidMount() {
    this.getUserDeck();
  }

  getUserDeck = () => {
    get("/api/getMyDeckProcessed").then((deck) => {
      console.log("Deck received from server", deck);
      this.setState({ deck: deck });
      console.log(this.state.deck.map((track) => 
        [track.name, track.artists]
      ));
    })
  }

  generateSelectionOptions = (deck) => {
    return deck.map((trackInfo) => ({
      value: trackInfo,
      label: trackInfo.name + " -- " + trackInfo.artists.join(", ")
    }));
  }

  handleSelectionChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    this.props.handleSelectionChange(selectedOption);
  };

  render() {
    return (
      <>
        {this.props.children}
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
      </>
    )
  }
}

export default SelectTrack;
