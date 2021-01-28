import React, { Component } from "react";
import { Link } from "@reach/router"
import MusicPreview from "./MusicPreview.js"

import "./TradeHistoryCard.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {String} key={`RequestCard_${requestObj._id}`}
 * @param {String} _id={requestObj._id}
 * @param {String} requesterName={requestObj.requesterName}
 * @param {String} requesterId={requestObj.requesterId}
 * @param {String} offeredLabel={requestObj.offeredLabel}
 * @param {String} requestedLabel={requestObj.requestedLabel}
 * @param {String} offeredTrackId={requestObj.offeredTrackId}
 * @param {Object} loggedInUser={this.props.loggedInUser}
 * @param {Function} triggerFeedRefresh={this.refreshFeed}
 * @param {Function} autoRefreshOn={this.autoRefreshOn}
 * @param {Function} autoRefreshOff={this.autoRefreshOff}
 */
class TradeHistoryCard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      offeredTrackInfo: undefined,
      showModal: false,
      trackToTrade: undefined
    };
  }

  componentDidMount() {
    console.log(this.props)
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
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
    return (
      <div className="TradeHistoryCard-container u-flex">
        <div className = "u-flexColumn TradeHistoryCard-textSection"> 
          <div className = "TradeHistoryCard-lookingText">
            <p>
              <Link
                to={`/profile/${this.props.requesterId}`}
                className="u-link u-bold"
              >
                {this.props.requesterName}
              </Link>
              {' '} was looking for {' '}
              <strong>{this.props.requesterLabel}</strong>,
              and was offering {' '}
              <strong>{this.props.fulfillerLabel}</strong>
              {' '} (aka {' '}
              <span className="TradeHistoryCard-wrapReceivedText" onClick={() => {this.props.activateMusicardModal(this.props.requesterTrackInfo._id)}}>
                {this.props.requesterTrackInfo.name}
              </span> by {' '}
              {this.processTrackArtists(this.props.requesterTrackInfo.artists)}).
            </p>
          </div>
          <div className = "TradeHistoryCard-lookingText">
            <p>
              in return, {' '}
              <Link
                to={`/profile/${this.props.fulfillerId}`}
                className="u-link u-bold"
              >
                {this.props.fulfillerName}
              </Link>
              {' '} sent them {' '}
              <span className="TradeHistoryCard-wrapReceivedText" onClick={() => {this.props.activateMusicardModal(this.props.fulfillerTrackInfo._id)}}>
                {this.props.fulfillerTrackInfo.name}
              </span> by {' '}
              {this.processTrackArtists(this.props.fulfillerTrackInfo.artists)}!
            </p>
          </div>
        </div>

        <div className="TradeHistoryCard-previewSection">
          <div className="TradeHistoryCard-musicPreview">
            <MusicPreview trackInfo={this.props.requesterTrackInfo}/>
          </div>
          <div className="TradeHistoryCard-musicPreview">
            <MusicPreview trackInfo={this.props.fulfillerTrackInfo}/>
          </div>
        </div>
      </div>
    );
  }
}

export default TradeHistoryCard;
