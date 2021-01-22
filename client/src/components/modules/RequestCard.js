import React, { Component } from "react";
import SingleRequest from "./SingleRequest.js"
import ModalSelectTrack from "./ModalSelectTrack.js"

import { get, post } from "../../utilities";

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} key ={`Card_${requestObj._id}`}
 * @param {string} _id ={requestObj._id}
 * @param {string} creator_name ={requestObj.creator_name}
 * @param {string} creator_id ={requestObj.creator_id}
 * @param {string} offeredLabel ={requestObj.offeredLabel}
 * @param {string} requestedLabel ={requestObj.requestedLabel}
 * @param {string} offeredTrackId ={requestObj.offeredTrackId}
 * @param {Object} loggedInUser ={this.props.loggedInUser}
 */
class RequestCard extends Component {
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
    get("/api/getTrackProcessed", { trackId : this.props.offeredTrackId }).then((trackInfo) => {
      this.setState({ offeredTrackInfo: trackInfo })
    })
    /**
    get("/api/comment", { parent: this.props._id }).then((comments) => {
      this.setState({
        comments: comments,
      });
    });
    */
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewComment = (commentObj) => {
    this.setState({
      comments: this.state.comments.concat([commentObj]),
    });
  };

  executeTrade = () => {
    console.log("Attempt to trade initiated");
    const body = {
      requestId: this.props._id,
      requesterName: this.props.creator_name,
      requesterId: this.props.creator_id,
      requesterTrackId: this.props.offeredTrackId,
      requesterLabel: this.props.offeredLabel,
      fulfillerTrackId: this.state.trackToTrade._id,
      fulfillerLabel: this.props.requestedLabel
    }
    post("/api/performTrade", body).then((trade) => {
      console.log("Traded")
      console.log(trade);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      this.setState({ trackToTrade: undefined });
      this.props.triggerFeedRefresh();
    });
  }

  render() {
    let tradeOrConfirmButton = null;
    if (this.props.loggedInUser) {
      if (this.state.trackToTrade) {
        console.log("Track to trade:", this.state.trackToTrade);
        tradeOrConfirmButton = (
          <>
          <button
            onClick={() => {this.setState({ trackToTrade: undefined })}}
          >
            Cancel
          </button>
          <button
            onClick={this.executeTrade}
          >
            Confirm
          </button>
          </>
        );
      } else {
        tradeOrConfirmButton = (
          <button
            onClick={() => this.setState({ showModal: true })}
          >
            Trade!
          </button>
        );
      }
    } else {
      tradeOrConfirmButton = "Log in to trade!"
    }
    return (
      <>
        <ModalSelectTrack
          isOpen={this.state.showModal}
          handleClose={() => this.setState({ showModal: false })}
          handleSelect={(track) => this.setState({ trackToTrade: track })}
        >
          Choose a song from your deck to trade!
        </ModalSelectTrack>

        <div className="Card-container">
          <SingleRequest
            _id={this.props._id}
            creator_name={this.props.creator_name}
            creator_id={this.props.creator_id}
            content={this.props.content}
            offeredLabel={this.props.offeredLabel}
            requestedLabel={this.props.requestedLabel}
            offeredTrackInfo={this.state.offeredTrackInfo}
          />

          {this.state.trackToTrade && (
            <div>
              Currently chosen song: {this.state.trackToTrade.name}
            </div>
          )} 
          {tradeOrConfirmButton}
        </div>
      </>
    );
  }
}

export default RequestCard;
