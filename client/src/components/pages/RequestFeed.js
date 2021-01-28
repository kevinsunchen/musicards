import React, { Component } from "react";
import RequestCard from "../modules/RequestCard.js";
import { NewRequest } from "../modules/NewRequestInput.js";
import ModalTrackReceived from "../modules/ModalTrackReceived.js"

import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "../../utilities.css";

class RequestFeed extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      requests: undefined,
      autoRefresh: true,
      showTrackReceivedModal: false,
      trackReceivedId: undefined
    };
  }

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    this._isMounted = true;
    document.title = "Requests Feed";
    console.log(this.props.loggedInUser);
    this.getRequestFeed();

    socket.on("getRequestFeed", (requestObjs) => {
      this.populateRequestsList(requestObjs)
    });
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  autoRefreshOff = () => {
    console.log("turning autorefresh off");
    this.setState({ autoRefresh: false }, () => {
      console.log("autorefresh:", this.state.autoRefresh);
    });
  }

  autoRefreshOn = () => {
    console.log("turning autorefresh on");
    this.setState({ autoRefresh: true}, () => {
      console.log("autorefresh:", this.state.autoRefresh);
    });
  }
  
  populateRequestsList = (requestObjs) => {
    if (this._isMounted && this.state.autoRefresh) {
      console.log(this.autoRefresh);
      this.setState({ requests: [] });
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

  activateTrackReceivedModal = (trackId) => {
    this.setState({
      trackReceivedId: trackId,
      showTrackReceivedModal: true
    })
    console.log("INFO INFO INFO:", trackId);
  }

  render() {
    let requestsList = null;
    if (!this.state.requests) {
      requestsList = <div> loading... </div>;
    } else if (this.state.requests.length === 0) {
      requestsList = <div> no requests! </div>;
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
          activateTrackReceivedModal={this.activateTrackReceivedModal}
        />
      ));
    }
    return (
      <div className="u-pageWrap">
        {this.state.trackReceivedId &&
          <ModalTrackReceived
            isOpen={this.state.showTrackReceivedModal}
            handleClose={() => { this.setState({ showTrackReceivedModal: false }); }}
            trackId={this.state.trackReceivedId}
          />
        }
        <h1 className = "u-pageTitle u-shadowPop u-shadowPopPink u-logofont">requests</h1>
        <h2 className = "u-pageDescription">what kind of song would you like to discover today?</h2>
        {this.props.loggedInUser &&
          <NewRequest
            addNewRequest={this.addNewRequest}
            autoRefreshOn={this.autoRefreshOn}
            autoRefreshOff={this.autoRefreshOff}
            loggedInUser={this.props.loggedInUser}
          />}
        <div className="u-flex">
          <button
            onClick={() => {
              this.refreshFeed();
              this.setState({ autoRefresh: true });
            }}
            className="u-refresh u-buttonHoverRise"
            > refresh feed </button>
        </div>
        {requestsList}
      </div>
    );
  }
}

export default RequestFeed;
