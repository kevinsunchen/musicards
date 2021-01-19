import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";

import { get } from "../../utilities";

class RequestFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
    };
  }

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "Requests Feed";
    get("/api/getRequestFeed").then((requestObjs) => {
      let reversedRequestObjs = requestObjs.reverse();
      reversedRequestObjs.map((requestObj) => {
        this.setState({ requests: this.state.requests.concat([requestObj]) });
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewStory = (storyObj) => {
    this.setState({
      stories: [storyObj].concat(this.state.stories),
    });
  };

  render() {
    return (
      <>
        <h1>REQUESTS FEED</h1>
        <h2>The page displaying the public requests feed. Includes links to a users' own pending requests, as well as their trade history.</h2>
      </>
    );
  }
}

export default RequestFeed;
