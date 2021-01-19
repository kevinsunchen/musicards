import React, { Component } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Skeleton.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      viewingUser: undefined,
      loggedInUser: undefined
    };
  }

  updateViewingUser() {
    get(`/api/user`, { userid: this.props.profileId }).then((user) => this.setState({ viewingUser: user })); 
  }

  updateLoggedInUser() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ loggedInUser: user });
      }
    });
  }

  componentDidMount() {
    // remember -- api calls go here!
    console.log("Mounting -- profileId prop:", this.props.profileId, ", userId prop:", this.props.userId);
    this.updateViewingUser();
    this.updateLoggedInUser();   
  }

  render() {
    console.log("userId:", this.props.userId, "loggedInUser:", this.state.loggedInUser, "viewingUser:", this.state.viewingUser)
    if (!this.state.viewingUser) {
      return <div> Loading! </div>;
    }
    else if (this.state.viewingUser._id !== this.props.profileId) {
      this.state.viewingUser = undefined;
      this.updateViewingUser();
      return <div> Loading! </div>
    }
    else {
      return (
        <>
          {console.log("1) On a profile page, userId prop:", this.props.userId)}
          {console.log("2) On a profile page, profileId prop:", this.props.profileId)}
          <h1>PROFILE</h1>
          <h2>Page where a user can view and update their profile information.</h2>
          <p>Viewing profile of user <strong>{this.state.viewingUser.name}</strong>, who has ID <strong>{this.props.profileId}</strong>.</p>
          
          {(this.state.loggedInUser) ? (
            <>
              <p>Currently logged in as user <strong>{this.state.loggedInUser.name}</strong>, who has ID <strong>{this.props.userId}</strong>.</p>

              {(this.state.loggedInUser._id === this.state.viewingUser._id) && (
                <button onClick={this.props.handleLogout}>logout</button>
              )}

            </>
          ) : (<p>Not logged in.</p>)
          }
        </>
      );
    }
  }
}

export default Profile;
