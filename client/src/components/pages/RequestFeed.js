import React, { Component } from "react";
import RequestCard from "../modules/RequestCard.js";
import { NewRequest } from "../modules/NewRequestInput.js";

import "../../utilities.css";
import "./Skeleton.css";

import { get } from "../../utilities";

class RequestFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: undefined,
    };
  }

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "Requests Feed";
    console.log(this.props.loggedInUser);
    this.getRequestFeed();
  }
  
  getRequestFeed = () => {
    get("/api/getRequestFeed").then((requestObjs) => {
      this.setState({ requests: [] })
      let reversedRequestObjs = requestObjs.reverse();
      reversedRequestObjs.map((requestObj) => {
        this.setState({ requests: this.state.requests.concat([requestObj]) });
      });
      console.log(this.state.requests)
    });
  }

  refreshFeed = () => {
    this.setState({ requests: undefined });
    this.getRequestFeed();
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
    if (!this.state.requests) {
      requestsList = "Loading..."
    } else if (this.state.requests.length === 0) {
      requestsList = <div>No requests!</div>;
    } else {
      // console.log(this.state.requests)
      requestsList = this.state.requests.map((requestObj) => (
        <RequestCard
          key={`RequestCard_${requestObj._id}`}
          _id={requestObj._id}
          creator_name={requestObj.creator_name}
          creator_id={requestObj.creator_id}
          offeredLabel={requestObj.offeredLabel}
          requestedLabel={requestObj.requestedLabel}
          offeredTrackId={requestObj.offeredTrackId}
          loggedInUser={this.props.loggedInUser}
          triggerFeedRefresh={this.refreshFeed}
        />
      ));
    }
    return (
      <>
        <h1>REQUESTS FEED</h1>
        <h2>The page displaying the public requests feed. Includes links to a users' own pending requests, as well as their trade history.</h2>
        <button onClick={this.refreshFeed}>Refresh feed</button>
        {this.props.loggedInUser && <NewRequest addNewRequest={this.addNewRequest} />}
        {requestsList}
      </>
    );
  }
}

export default RequestFeed;
