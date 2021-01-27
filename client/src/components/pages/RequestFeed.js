import React, { Component } from "react";
import RequestCard from "../modules/RequestCard.js";
import { NewRequest } from "../modules/NewRequestInput.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "../../utilities.css";

class RequestFeed extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      requests: undefined,
      autoRefresh: true
    };
  }

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    this._isMounted = true;
    document.title = "Requests Feed";
    console.log(this.props.loggedInUser);
    this.getRequestFeed();

    if (this.state.autoRefresh) {
      socket.on("getRequestFeed", (requestObjs) => {
        this.populateRequestsList(requestObjs)
      });
    }
  }

  componentDidUpdate() {
    
  }

  autoRefreshOff = () => {
    this.setState({ autoRefresh: false });
  }

  autoRefreshOn = () => {
    this.setState({ autoRefresh: true});
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }
  
  populateRequestsList = (requestObjs) => {
    if (this._isMounted) {
      console.log(this._isMounted);
      this.setState({ requests: [] })
      let reversedRequestObjs = requestObjs.reverse();
      reversedRequestObjs.map((requestObj) => {
        this.setState({ requests: this.state.requests.concat([requestObj]) });
      });
      console.log(this.state.requests);
    }
  }

  getRequestFeed = () => {
    get("/api/getRequestFeed").then((requestObjs) => {
      this.populateRequestsList(requestObjs);
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
      requestsList = "Loading...";
    } else if (this.state.requests.length === 0) {
      requestsList = "No requests!";
    } else {
      // console.log(this.state.requests)
      requestsList = this.state.requests.map((requestObj) => (
        <RequestCard
          key={`RequestCard_${requestObj._id}`}
          _id={requestObj._id}
          requesterName={requestObj.requesterName}
          requesterId={requestObj.requesterId}
          offeredLabel={requestObj.offeredLabel}
          requestedLabel={requestObj.requestedLabel}
          offeredTrackId={requestObj.offeredTrackId}
          loggedInUser={this.props.loggedInUser}
          triggerFeedRefresh={this.refreshFeed}
          autoRefreshOn={this.autoRefreshOn}
          autoRefreshOff={this.autoRefreshOff}
        />
      ));
    }
    return (
      <div className="u-pageWrap">
        <h1 className = "u-pageTitle">requests</h1>
        <h2 className = "u-pageDescription">The page displaying the public requests feed. Includes links to a users' own pending requests, as well as their trade history.</h2>
        <button onClick={this.refreshFeed} className = "u-refresh">refresh feed</button>
        {this.props.loggedInUser && <NewRequest addNewRequest={this.addNewRequest} />}
        {requestsList}
      </div>
    );
  }
}

export default RequestFeed;
