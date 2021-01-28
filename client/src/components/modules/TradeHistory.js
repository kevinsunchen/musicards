import React, { Component } from "react";
import TradeHistoryCard from "./TradeHistoryCard.js"
import { get } from "../../utilities";

import "./TradeHistory.css";
import "../../utilities.css";

class TradeHistory extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      tradeHistory: []
    }
  }

  componentDidMount() {
    // remember -- api calls go here!
    console.log("history", this.props.tradeHistory)
    get("/api/getUserTradeHistory", { userId: this.props.profileId }).then((tradeHistory) => {
      console.log(tradeHistory);
      let reversedtradeHistoryObjs = tradeHistory.reverse();
      reversedtradeHistoryObjs.map((tradeHistoryObjs) => {
        this.setState({ tradeHistory: this.state.tradeHistory.concat([tradeHistoryObjs]) });
      });
    });
  }

  render() {
    let tradeHistoryList = null;
    if (!this.state.tradeHistory) {
      tradeHistoryList = <div> loading... </div>; }
    else if (this.state.tradeHistory.length === 0) {
      tradeHistoryList = <div className="u-pageDescription"> trade history empty! head to the requests or incoming pages to start :) </div>;
    } else {
      // console.log(this.state.requests)
      tradeHistoryList = this.state.tradeHistory.map((tradeHistoryObj) => (
        <TradeHistoryCard
          key={`TradeHistoryCard${tradeHistoryObj._id}`}
          _id={tradeHistoryObj._id}
          requesterName={tradeHistoryObj.requesterName}
          requesterId={tradeHistoryObj.requesterId}
          requesterLabel={tradeHistoryObj.requesterLabel}
          requesterTrackInfo={tradeHistoryObj.requesterTrackInfo}
          offeredTrackId={tradeHistoryObj.offeredTrackId}
          fulfillerName={tradeHistoryObj.fulfillerName}
          fulfillerId={tradeHistoryObj.fulfillerId}
          fulfillerLabel={tradeHistoryObj.fulfillerLabel}
          fulfillerTrackInfo={tradeHistoryObj.fulfillerTrackInfo}
          activateMusicardModal={this.props.activateMusicardModal}
        />
      ));
    }
    return (
      <>
        <div className="TradeHistory-title u-logofont u-shadowPop u-shadowPopPurple">trade history</div>
        {tradeHistoryList}
      </>
    );
  }
}

export default TradeHistory;
