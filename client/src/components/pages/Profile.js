import React, { Component } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Skeleton.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      viewingUser: undefined
    };
  }

  updateViewingUser() {
    get(`/api/user`, { userid: this.props.profileId }).then((user) => this.setState({ viewingUser: user })); 
  }

  componentDidMount() {
    document.title = "Profile";
    // remember -- api calls go here!
    console.log("Mounting -- profileId prop:", this.props.profileId);
    this.updateViewingUser();
  }

  render() {
    console.log("loggedInUser:", this.props.loggedInUser, "viewingUser:", this.state.viewingUser)
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
          <h1>PROFILE</h1>
          <h2>Page where a user can view and update their profile information.</h2>
          <p>Viewing profile of user <strong>{this.state.viewingUser.name}</strong>, who has ID <strong>{this.state.viewingUser._id}</strong>.</p>
          
          {(this.props.loggedInUser) ? (
            <>
              <p>Currently logged in as user <strong>{this.props.loggedInUser.name}</strong>, who has ID <strong>{this.props.loggedInUser._id}</strong>.</p>

              {(this.props.loggedInUser._id === this.state.viewingUser._id) && (
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
