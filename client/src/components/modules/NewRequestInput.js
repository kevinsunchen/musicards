import React, { Component } from "react";
import ModalSelectTrack from "./ModalSelectTrack.js";
import { Link } from "@reach/router";

import "./NewRequestInput.css";
import { post } from "../../utilities";
import placeholder from "../../public/blank.png";

import "./RequestCard.css";
import "./MusicPreview.css"
import "./ModalSelectTrack.css"

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
      window.alert("Incomplete fields! Please check that all fields are filled before posting.")
      console.log("Incomplete fields!", this.state.offeredLabel, this.state.requestedLabel, this.state.offeredTrack)
    }
  };

  render() {
    return (
      <>
        <ModalSelectTrack
          isOpen={this.state.showModal}
          handleClose={() => this.setState({ showModal: false })}
          handleSelect={(track) => this.setState({ offeredTrack: track })}
          autoRefreshOn={this.props.autoRefreshOn}
          autoRefreshOff={this.props.autoRefreshOff}
        >
          <div>
            <p className="modalselectTrack-text"> choose a song from your deck to trade! </p>
            <p className="modalselectTrack-text modalselectTrack-subtext"> and don't worry, traded cards don't disappear from your deck, so share your music to your heart's content :) </p>
          </div>
        </ModalSelectTrack>

        <div className="">
          <div className="u-flex RequestCard-container">
            <div className = "u-flex RequestCard-infoSection RequestCard-story">
              <div className="u-flexColumn RequestCard-Text">
                <div className = "RequestCard-user"> 
                  <Link to={`/profile/${this.props.loggedInUser._id}`} className="u-link u-bold"> me </Link>
                </div>
                <div className = "RequestCard-lookingText">
                  <p>
                    i'm looking for
                    <input
                      type="text"
                      placeholder={this.props.defaultTextWanted}
                      value={this.state.requestedLabel}
                      onChange={this.handleChangeRequested}
                      className="NewPostInput-input"
                    />,
                  </p>
                </div>

                <div className = "RequestCard-lookingText">
                  <p>
                    and will give 
                    <input
                      type="text"
                      placeholder={this.props.defaultTextOffered}
                      value={this.state.offeredLabel}
                      onChange={this.handleChangeOffered}
                      className="NewPostInput-input"
                    />.
                  </p>
                </div>

                <div className = "RequestCard-lookingText">
                  <p>
                    {(this.state.offeredTrack) ? ( <>offering {this.state.offeredTrack.name}!</> ) : ( <>no song selected yet :(</> )}
                  </p>
                </div> 
              </div>
               
              <div className="u-flexColumn u-flex-alignCenter">
                <div className="MusicPreview-imgContainer" onClick={() => {this.setState({ showModal: true })}}>
                  <img className="MusicPreview-img" src={this.state.offeredTrack ? this.state.offeredTrack.images[1].url : placeholder} />
                  <div className="MusicPreview-addButton">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="u-flexColumn RequestCard-tradeSection">
              <button
                type="submit"
                value="Submit"
                className="Request-tradeButton u-buttonHoverRise"
                onClick={this.handleSubmit}
              >
                post!
              </button>
            </div>
            
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
    return <NewRequestInput
      defaultTextWanted="party bangerzzz B)"
      defaultTextOffered="sad boi hours :("
      onSubmit={this.addRequest}
      autoRefreshOn={this.props.autoRefreshOn}
      autoRefreshOff={this.props.autoRefreshOff}
      loggedInUser={this.props.loggedInUser}
    />;
  }
}

export { NewRequest };
