import React, { Component } from "react";
import SingleRequest from "./SingleRequest.js"
import ModalSelectTrack from "./ModalSelectTrack.js"

import { get, post } from "../../utilities";

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
class RequestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      offeredTrack: undefined,
      showModal: false,
      trackToTrade: undefined
    };
  }

  componentDidMount() {
    get("/api/getTrackProcessed", { trackId : this.props.offeredTrackId }).then((trackInfo) => {
      this.setState({ offeredTrack: trackInfo })
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
    post("/api/performTrade").then(() => {

    }).catch(() => {
      
    }).finally(() => {
      this.setState({ trackToTrade: undefined });
    });
  }

  render() {
    if (this.state.trackToTrade) {
      console.log("Track to trade:", this.state.trackToTrade);
    }

    if (this.props.loggedInUser) {
      
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
            offeredTrack={this.state.offeredTrack}
          />
          
          {this.props.loggedInUser && (
            <button
              onClick={() => this.setState({ showModal: true })}
            >
              Trade!
            </button>
          )}
        </div>
      </>
    );
  }
}

export default RequestCard;
