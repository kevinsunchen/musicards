import React, { Component } from "react";
import { Link } from "@reach/router";
import MusicPreview from "./MusicPreview";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} requesterName
 * @param {string} requesterId
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
    offeredTrackText = (this.props.offeredTrackInfo)
      ? ( `Offering "${this.props.offeredTrackInfo.name}" by ${this.processTrackArtists(this.props.offeredTrackInfo.artists)}.`)
      : ( "Loading..." )
      this.props.offeredTrackInfo && console.log(this.props.offeredTrackInfo.images);
      return (
      <div className="RequestCard-story">
        <Link to={`/profile/${this.props.requesterId}`} className="u-link u-bold">
          {this.props.requesterName}
        </Link>
        <div className="RequestCard-storyContent">
          <p>Looking for a {this.props.requestedLabel} song, will trade for a {this.props.offeredLabel} song!</p>
          <p>{offeredTrackText}</p>
          Offering...
          
          <div>
            {this.props.offeredTrackInfo && <MusicPreview trackInfo={this.props.offeredTrackInfo}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleRequest;
