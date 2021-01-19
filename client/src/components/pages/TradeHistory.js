import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";

class TradeHistory extends Component {
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
        <h1>TRADE HISTORY</h1>
        <h2>Page where a user can view their trade history.</h2>
      </>
    );
  }
}

export default TradeHistory;
