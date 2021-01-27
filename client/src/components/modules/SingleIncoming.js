import React, { Component } from "react";
import { Link } from "@reach/router";

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

  render() {
    const requestInfoText = <p className = "Incoming-RequestedInfo">
      <i>You asked for a {this.props.selfLabel} song in exchange for a {this.props.traderLabel} song, offering "{this.props.tradedTrackInfo.name}" by {this.processTrackArtists(this.props.tradedTrackInfo.artists)}.</i>
    </p>

    const traderTrackText = <p className = "Incoming-GivenInfo">
      <Link to={`/profile/${this.props.traderId}`} className="u-link u-bold">
        {this.props.traderName}
      </Link> sent you "{this.props.incomingTrackInfo.name}" by {this.processTrackArtists(this.props.incomingTrackInfo.artists)}!
    </p>

    return (
    <div className="IncomingCard-story">
      <div className="IncomingCard-storyContent">
        {requestInfoText}
        {traderTrackText}
      </div>
    </div>
    );
  }
}

export default SingleIncoming;
