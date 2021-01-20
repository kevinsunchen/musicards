import React, { Component } from "react";
import SingleRequest from "./SingleRequest.js"

import { get } from "../../utilities";

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
      offeredTrack: undefined
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

  render() {
    if (!this.state.offeredTrack) {
      return <div> Loading... </div>
    }
    return (
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
        
      </div>
    );
  }
}

export default RequestCard;
