import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID

class Incoming extends Component {
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
        <h1>INCOMING</h1>
        <h2>Page where the user can view their incoming cards from trades.</h2>
      </>
    );
  }
}

export default Incoming;
