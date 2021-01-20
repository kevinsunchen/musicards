import React, { Component } from "react";
import RequestCard from "../modules/RequestCard.js";
import { NewRequest } from "../modules/NewPostInput.js";

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
    console.log(this.props.loggedInUser);
    get("/api/getRequestFeed").then((requestObjs) => {
      let reversedRequestObjs = requestObjs.reverse();
      reversedRequestObjs.map((requestObj) => {
        this.setState({ requests: this.state.requests.concat([requestObj]) });
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewRequest = (requestObj) => {
    this.setState({
      requests: [requestObj].concat(this.state.requests),
    });
  };

  render() {
    let requestsList = null;
    const hasRequests = this.state.requests.length !== 0;
    if (hasRequests) {
      requestsList = this.state.requests.map((requestObj) => (
        <RequestCard
          key={`Card_${requestObj._id}`}
          _id={requestObj._id}
          creator_name={requestObj.creator_name}
          creator_id={requestObj.creator_id}
          content={requestObj.content}
          userId={this.props.loggedInUser}
        />
      ));
    } else {
      requestsList = <div>No requests!</div>;
    }
    return (
      <>
        <h1>REQUESTS FEED</h1>
        <h2>The page displaying the public requests feed. Includes links to a users' own pending requests, as well as their trade history.</h2>
        {this.props.loggedInUser && <NewRequest addNewRequest={this.addNewRequest} />}
        {requestsList}
      </>
    );
  }
}

export default RequestFeed;
