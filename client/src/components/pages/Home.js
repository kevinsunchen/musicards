import { Link } from "@reach/router";
import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";

class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        <h1>HOME</h1>
        <h2>Home page. Includes icons linking to the public Requests feed, the user's Incoming cards page, the user's Deck page, and the user's Profile page.</h2>
        <Link to="/requests">
          Requests <br />
        </Link>
        <Link to="/incoming">
          Incoming <br />
        </Link>
        <Link to="/deck">
          Deck <br />
        </Link>
        {this.props.loggedInUser ? (
          <Link to={`/profile/${this.props.loggedInUser._id}`}>
            Profile <br />
          </Link>
        ) : (
          <Link to='/login'>
            Login <br />
          </Link>
        )}
      </>
    );
  }
}

export default Home;
