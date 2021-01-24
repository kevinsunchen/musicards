import React, { Component } from "react";
import IncomingCard from "../modules/IncomingCard.js";

import { get } from "../../utilities";
import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID

class IncomingFeed extends Component {
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
      console.log("Incoming:", this.state.incoming);
    });
  }
  
  refreshFeed = () => {
    this.setState({ incoming: undefined });
    this.getRequestFeed();
  }

  render() {
    let incomingList = null;
    if (!this.props.loggedInUser) {
      incomingList = "Log in to see your incoming Musicards!";
    } else if (!this.state.incoming) {
      incomingList = "Loading...";
    } else if (this.state.incoming.length === 0) {
      incomingList = "No incoming Musicards!";
    } else {
      // console.log(this.state.requests)
      incomingList = this.state.incoming.map((incomingObj) => (
        <IncomingCard
          key={`IncomingCard_${incomingObj.tradeInfo._id}`}
          _id={incomingObj.tradeInfo._id}
          selfName={incomingObj.tradeInfo.selfName}
          selfId={incomingObj.tradeInfo.selfId}
          selfLabel={incomingObj.tradeInfo.selfLabel}
          tradedTrackInfo={incomingObj.tradedTrackInfo}
          traderName={incomingObj.tradeInfo.traderName}
          traderId={incomingObj.tradeInfo.traderId}
          traderLabel={incomingObj.tradeInfo.traderLabel}
          incomingTrackInfo={incomingObj.incomingTrackInfo}
          triggerFeedRefresh={this.refreshFeed}
        />
      ));
    }
    return (
      <>
        <h1>INCOMING</h1>
        <h2>Page where the user can view their incoming cards from trades.</h2>
        {incomingList}
      </>
    );
  }
}

export default IncomingFeed;
