import React, { Component } from "react";
import IncomingCard from "../modules/IncomingCard.js";

import { get } from "../../utilities";
import "../../utilities.css";

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
    this.getIncomingFeed();
  }
  
  getIncomingFeed = () => {
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
    this.getIncomingFeed();
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
          key={`IncomingCard_${incomingObj.tradeInfo.tradeId}`}
          tradeId={incomingObj.tradeInfo.tradeId}
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
      <div className="u-pageWrap">
        <h1 className = "u-pageTitle">incoming</h1>
        <h2 className = "u-pageDescription">view your fulfilled requests!</h2>
        {this.props.loggedInUser && <button onClick={this.refreshFeed} className = "u-refresh">Refresh feed</button>}
        {incomingList}
      </div>
    );
  }
}

export default IncomingFeed;
