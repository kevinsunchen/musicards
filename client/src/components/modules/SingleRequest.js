import React, { Component } from "react";
import { Link } from "@reach/router";
import MusicPreview from "./MusicPreview.js";
import "./RequestCard.css";

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
      ? ( `offering "${this.props.offeredTrackInfo.name}" by ${this.processTrackArtists(this.props.offeredTrackInfo.artists)}.`)
      : ( "Loading..." )
  
    return (
      <div className="u-flex RequestCard-story">
        <div className = "u-flexColumn RequestCard-Text"> 
          <div className = "RequestCard-user"> 
            <Link to={`/profile/${this.props.requesterId}`} className="u-link u-bold">
              {this.props.requesterName}
            </Link>
          </div>
          <div className = "RequestCard-lookingText">
            <p>looking for <strong>{this.props.requestedLabel}</strong>,</p>
          </div>
          <div className = "RequestCard-lookingText">
            <p>will trade for <strong>{this.props.offeredLabel}!</strong></p>
          </div>

        </div>

        <div className="u-flexColumn u-flex-alignCenter">
          {this.props.offeredTrackInfo &&
            <MusicPreview
              trackInfo={this.props.offeredTrackInfo}
              autoRefreshOn={this.props.autoRefreshOn}
              autoRefreshOff={this.props.autoRefreshOff}
            />
          }
        </div>
      </div>
    );
  }
}

export default SingleRequest;
