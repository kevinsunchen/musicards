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
        <div className="u-pageWrap">
          <h1 className = "u-pageTitle"><strong>{this.state.viewingUser.name}</strong>'s profile</h1>
          {//<p className = "u-pageDescription">Viewing profile of user <strong>{this.state.viewingUser.name}</strong>, who has ID <strong>{this.state.viewingUser._id}</strong>.</p>
          }
          {(this.props.loggedInUser) ? (
            <>
              <p className = "u-pageDescription">welcome! now go view your deck and make requests :)</p>
              <p className = "u-pageDescription"></p>
              {(this.props.loggedInUser._id === this.state.viewingUser._id) && (
                <button onClick={this.props.handleLogout} className = "u-refresh">logout</button>
              )}

            </>
          ) : (<p>Not logged in.</p>)
          }
        </div>
      );
    }
  }
}

export default Profile;
