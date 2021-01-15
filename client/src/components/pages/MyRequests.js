import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";

class MyRequests extends Component {
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
        <h1>MY REQUESTS</h1>
        <h2>Page where a user can view their pending requests to the public Requests feed.</h2>
      </>
    );
  }
}

export default MyRequests;
