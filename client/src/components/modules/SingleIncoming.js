import React, { Component } from "react";
import { Link } from "@reach/router";
import ModalTrackReceived from "./ModalTrackReceived.js"

import "./IncomingCard.css";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
class SingleIncoming extends Component {
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
    const requestInfoText = <p className = "Incoming-RequestedInfo">
      <i>You asked for {this.props.selfLabel} in exchange for {this.props.traderLabel}, offering "{this.props.tradedTrackInfo.name}" by {this.processTrackArtists(this.props.tradedTrackInfo.artists)}.</i>
    </p>

    const traderTrackText = <div className = "Incoming-GivenInfo">
      <Link to={`/profile/${this.props.traderId}`} className="u-link u-bold">
        {this.props.traderName}
      </Link> sent you <div className="incoming-wrapReceivedText" onClick={this.handleClick}>
        "{this.props.incomingTrackInfo.name}"</div> by {this.processTrackArtists(this.props.incomingTrackInfo.artists)}!
    </div>

    return (
      <>
        <ModalTrackReceived
          isOpen={this.state.showModal}
          handleClose={this.handleClose}
          trackId={this.props.incomingTrackInfo._id}
          title="you received a song!"
          subtitle="click on the album cover to hear a preview, or click on the title to go to the song's Spotify page."
        />

        <div className="IncomingCard-storyContent">
          {requestInfoText}
          {traderTrackText}
        </div>
      </>
    );
  }
}

export default SingleIncoming;
