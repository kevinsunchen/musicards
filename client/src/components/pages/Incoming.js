import React, { Component } from "react";

import { get } from "../../utilities";
import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID

class Incoming extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      incoming: undefined
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    get("/api/getUserIncomingFeed").then((incomingObjs) => {
      this.setState({ incoming: [] });
      let reversedIncomingObjs = incomingObjs.reverse();
      reversedIncomingObjs.map((incomingObj) => {
        this.setState({ incoming: this.state.incoming.concat([incomingObj]) });
      });
      console.log(this.state.incoming);
    });
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
