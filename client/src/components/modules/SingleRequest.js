import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
class SingleRequest extends Component {
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
    let offeredTrackText = null;
    offeredTrackText = (this.props.offeredTrack)
      ? ( `Offering "${this.props.offeredTrack.name}" by ${this.processTrackArtists(this.props.offeredTrack.artists)}.`)
      : ( "Loading..." )

      return (
      <div className="Card-story">
        <Link to={`/profile/${this.props.creator_id}`} className="u-link u-bold">
          {this.props.creator_name}
        </Link>
        <div className="Card-storyContent">
          <p>Looking for a {this.props.offeredLabel} song, will trade for a {this.props.requestedLabel} song!</p>
          <p>{offeredTrackText}</p>
        </div>
      </div>
    );
  }
}

export default SingleRequest;
