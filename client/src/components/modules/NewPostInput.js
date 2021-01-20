import React, { Component } from "react";
import ModalSelectTrack from "./ModalSelectTrack.js";

import "./NewPostInput.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
class NewRequestInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offeredLabel: "",
      requestedLabel: "",
      offeredTrack: undefined,
      showModal: false
    };
  }

  // called whenever the user types in the offered genre input box
  handleChangeOffered = (event) => {
    this.setState({
      offeredLabel: event.target.value,
    });
  };

  // called whenever the user types in the requested genre input box
  handleChangeRequested = (event) => {
    this.setState({
      requestedLabel: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new request
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.offeredLabel && this.state.requestedLabel && this.state.offeredTrack) {
      this.props.onSubmit && this.props.onSubmit(this.state.offeredLabel, this.state.requestedLabel, this.state.offeredTrack._id);
      this.setState({
        offeredLabel: "",
        requestedLabel: "",
        offeredTrack: undefined
      });
    } else {
      console.log("Incomplete fields!", this.state.offeredLabel, this.state.requestedLabel, this.state.offeredTrack)
    }
  };

  setSelectedTrack = (track) => {
    this.setState({ offeredTrack: track });
  }

  render() {
    return (
      <>
        <ModalSelectTrack
          open={this.state.showModal}
          handleClose={() => this.setState({ showModal: false })}
          setSelectedTrack={this.setSelectedTrack}
        />

        <div className="u-flex">
          <div className="">
            <div className="">
              I want a
              <input
                type="text"
                placeholder={this.props.defaultText}
                value={this.state.requestedLabel}
                onChange={this.handleChangeRequested}
                className="NewPostInput-input"
              />
              song 
            </div>
            <div className="">
              for a 
              <input
                type="text"
                placeholder={this.props.defaultText}
                value={this.state.offeredLabel}
                onChange={this.handleChangeOffered}
                className="NewPostInput-input"
              />
              song
            </div>
            <div>
              {(this.state.offeredTrack) ? (
                <>
                  Currently chosen song: {this.state.offeredTrack.name}
                </>
              ) : (
                <>
                  Add a song to trade!
                </>
              )}

            </div>
          </div>

          <div className="u-flex">
            <button
              type="submit"
              className="NewPostInput-button u-pointer"
              value="Submit"
              onClick={() => this.setState({ showModal: true })}
              >
              Choose song
            </button>

            <button
              type="submit"
              className="NewPostInput-button u-pointer"
              value="Submit"
              onClick={this.handleSubmit}
            >
              Post!
            </button>
          </div>
        </div>
      </>
    );
  }
}

/**
 * NewRequest is a New Post component for requests
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
class NewRequest extends Component {
  addRequest = (offeredLabel, requestedLabel, offeredTrackId) => {
    console.log(offeredLabel, requestedLabel, offeredTrackId)
    const body = {
      offeredLabel: offeredLabel,
      requestedLabel: requestedLabel,
      offeredTrackId: offeredTrackId
    };
    post("/api/postToRequestFeed", body).then((story) => {
      // display this story on the screen
      this.props.addNewRequest(story);
    });
  };

  render() {
    return <NewRequestInput defaultText="New Request" onSubmit={this.addRequest} />;
  }
}

export { NewRequest };
