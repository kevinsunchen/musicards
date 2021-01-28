import React, { Component } from "react";
import TradeHistory from "../modules/TradeHistory.js";
import ModalTrackReceived from "../modules/ModalTrackReceived.js";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Skeleton.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      viewingUser: undefined,
      tradeHistory: undefined,
      showModal: false,
      trackIdModal: undefined
    };
  }

  componentDidMount() {
    document.title = "Profile";
    // remember -- api calls go here!
    console.log("Mounting -- profileId prop:", this.props.profileId);
    this.updateViewingUser();
  }

  updateViewingUser() {
    get(`/api/user`, { userid: this.props.profileId }).then((user) => this.setState({ viewingUser: user })); 
  }

  activateMusicardModal = (trackId) => {
    this.setState({
      trackIdModal: trackId,
      showModal: true
    })
    console.log("INFO INFO INFO:", trackId);
  }

  render() {
    console.log("loggedInUser:", this.props.loggedInUser, "viewingUser:", this.state.viewingUser)
    if (!this.state.viewingUser) {
      return <div className="u-pageWrap"> loading! </div>;
    }
    else if (this.state.viewingUser._id !== this.props.profileId) {
      this.state.viewingUser = undefined;
      this.updateViewingUser();
      return <div className="u-pageWrap"> loading! </div>
    }
    else {
      return (
        <div className="u-pageWrap">
          <ModalTrackReceived
            isOpen={this.state.showModal}
            handleClose={() => { this.setState({ showModal: false }); }}
            trackId={this.state.trackIdModal}
            title="viewing song!"
            subtitle="click on the album cover to hear a preview, or click on the title to go to the song's Spotify page."
          >

          </ModalTrackReceived>
          <h1 className = "u-pageTitle u-shadowPop u-shadowPopPurple u-logofont"><strong>{this.state.viewingUser.name}</strong>'s profile</h1>
          {//<p className = "u-pageDescription">Viewing profile of user <strong>{this.state.viewingUser.name}</strong>, who has ID <strong>{this.state.viewingUser._id}</strong>.</p>
          }
          {(this.props.loggedInUser) ? (
            <>
              <p className = "u-pageDescription">welcome! now go view your deck and make requests :)</p>
              <p className = "u-pageDescription"></p>
              {(this.props.loggedInUser._id === this.state.viewingUser._id) && (
                <button onClick={this.props.handleLogout} className = "u-mainbutton">logout</button>
              )}
            </>
          ) : (<p className="u-pageDescription">you're not logged in!</p>)
          }
          
          <TradeHistory
            profileId={this.props.profileId}
            activateMusicardModal={this.activateMusicardModal}
          />
        </div>
      );
    }
  }
}

export default Profile;
