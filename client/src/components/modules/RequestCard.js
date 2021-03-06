import React, { Component } from "react";
import SingleRequest from "./SingleRequest.js"
import ModalSelectTrack from "./ModalSelectTrack.js"

import { get, post } from "../../utilities";

import "./RequestCard.css";

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
class RequestCard extends Component {
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
    get("/api/getTrackProcessed", { trackId : this.props.offeredTrackId }).then((trackInfo) => {
      if (this._isMounted) {
        this.setState({ offeredTrackInfo: trackInfo });
      }
    })
    /**
    get("/api/comment", { parent: this.props._id }).then((comments) => {
      this.setState({
        comments: comments,
      });
    });
    */
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewComment = (commentObj) => {
    this.setState({
      comments: this.state.comments.concat([commentObj]),
    });
  };

  executeTrade = () => {
    if (this.props.loggedInUser._id === this.props.requesterId) {
      window.alert("Can't trade with yourself!")
    } else if (this.state.trackToTrade._id === this.props.offeredTrackId) {
      window.alert("The selected track can't be the same as the requested track!")
    }
    else {
      console.log("Attempt to trade initiated");
      const body = {
        requestId: this.props._id,
        requesterName: this.props.requesterName,
        requesterId: this.props.requesterId,
        requesterTrackId: this.props.offeredTrackId,
        requesterLabel: this.props.requestedLabel,
        fulfillerTrackId: this.state.trackToTrade._id,
        fulfillerLabel: this.props.offeredLabel
      }
      post("/api/performTrade", body).then((trade) => {
        console.log("Traded")
        console.log("TRADE RECEIVED:", trade);
        this.props.activateTrackReceivedModal(trade.requesterTrackId);
      }).catch((err) => {
        console.log(err);
        window.alert("this request has already been fulfilled!");
      }).finally(() => {
        this.setState({ trackToTrade: undefined });
        this.props.autoRefreshOn();
        this.props.triggerFeedRefresh();
      });
      
    }
  }
  
  onTradeButtonClick = () => {
    if (this.props.loggedInUser._id === this.props.requesterId) {
      window.alert("Can't trade with yourself!");
    } else {
      this.setState({ showModal: true });
      this.props.autoRefreshOn();
    }
  }

  render() {
    let tradeOrConfirmButton = null;
    if (this.props.loggedInUser) {
      if (this.state.trackToTrade) {
        console.log("Track to trade:", this.state.trackToTrade);
        tradeOrConfirmButton = (
          <div className = "u-flex RequestCard-buttongroup">
            <button className = "RequestCard-cancelConfirm RequestCard-confirm u-buttonHoverRise"
              onClick={this.executeTrade}
            >
              confirm
            </button>
            <button className = "RequestCard-cancelConfirm RequestCard-cancel u-buttonHoverRise"
              onClick={() => {this.setState({ trackToTrade: undefined })}}
            >
              cancel
            </button>
          </div>
        );
      } else {
        tradeOrConfirmButton = (
          <button
            onClick={this.onTradeButtonClick}
            className = "Request-tradeButton u-buttonHoverRise"
          >
            trade!
          </button>
        );
      }
    } else {
      tradeOrConfirmButton = "Log in to trade!"
    }
    return (
      <div>
        <ModalSelectTrack
          isOpen={this.state.showModal}
          handleClose={() => this.setState({ showModal: false })}
          handleSelect={(track) => this.setState({ trackToTrade: track })}
          autoRefreshOn={this.props.autoRefreshOn}
          autoRefreshOff={this.props.autoRefreshOff}
        >
          <div>
            <p className="modalselectTrack-text"> choose a song from your deck to trade! </p>
            <p className="modalselectTrack-text modalselectTrack-subtext"> and don't worry, traded cards don't disappear from your deck, so share your music to your heart's content :) </p>
          </div>
        </ModalSelectTrack>

        <div className="RequestCard-container u-flex">
          <div className="RequestCard-infoSection"> 
            <SingleRequest
              _id={this.props._id}
              requesterName={this.props.requesterName}
              requesterId={this.props.requesterId}
              content={this.props.content}
              offeredLabel={this.props.offeredLabel}
              requestedLabel={this.props.requestedLabel}
              offeredTrackInfo={this.state.offeredTrackInfo}
              autoRefreshOn={this.props.autoRefreshOn}
              autoRefreshOff={this.props.autoRefreshOff}
            />
          </div>
          <div className="RequestCard-tradeSection u-flexColumn">
            {this.state.trackToTrade && (
                <div className="RequestCard-chosenSongSection">
                  <p>
                    currently chosen:
                  </p>
                  {this.state.trackToTrade.name}
                </div>
              )} 
              {tradeOrConfirmButton}
            </div>
          </div>
      </div>
    );
  }
}

export default RequestCard;
