import React, { Component } from "react";
import SingleIncoming from "./SingleIncoming.js"
import ModalSelectTrack from "./ModalSelectTrack.js"
import { RadioButtonGroup } from 'react-rainbow-components';

import { get, post } from "../../utilities";

import "./IncomingCard.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} key ={`Card_${requestObj._id}`}
 * @param {string} _id ={incomingObj.tradeInfo._id}
 * @param {string} selfName ={incomingObj.tradeInfo.selfName}
 * @param {string} selfId ={incomingObj.tradeInfo.selfId}
 * @param {string} selfLabel ={incomingObj.tradeInfo.selfLabel}
 * @param {Object} tradedTrackInfo ={incomingObj.tradeInfo.selfTrackId}
 * @param {string} traderName ={incomingObj.tradeInfo.traderName}
 * @param {string} traderId ={incomingObj.tradeInfo.traderId}
 * @param {string} traderLabel ={incomingObj.tradeInfo.traderLabel}
 * @param {Object} incomingTrackInfo ={incomingObj.tradeInfo.traderTrackId}
 * @param {Function} triggerFeedRefresh ={this.refreshFeed}
 */
class IncomingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: '3',
      trackToTrade: undefined
    };
  }

  componentDidMount() {
    console.log("Props", this.props);
  }

  executeTrade = () => {
    console.log("Attempt to trade initiated");
    const body = {
      requestId: this.props._id,
      requesterName: this.props.creator_name,
      requesterId: this.props.creator_id,
      requesterTrackId: this.props.offeredTrackId,
      requesterLabel: this.props.offeredLabel,
      fulfillerTrackId: this.state.trackToTrade._id,
      fulfillerLabel: this.props.requestedLabel
    }
    post("/api/performTrade", body).then((trade) => {
      console.log("Traded")
      console.log(trade);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      this.setState({ trackToTrade: undefined });
      this.props.triggerFeedRefresh();
    });
  }
  
  render() {
    return (
      <>
        <ModalSelectTrack
          isOpen={this.state.showModal}
          handleClose={() => this.setState({ showModal: false })}
          handleSelect={(track) => this.setState({ trackToTrade: track })}
        >
          Choose a song from your deck to trade!
        </ModalSelectTrack>

        <div className="IncomingCard-container">
          <SingleIncoming
            selfName={this.props.selfName}
            selfId={this.props.selfId}
            selfLabel={this.props.selfLabel}
            tradedTrackInfo={this.props.tradedTrackInfo}
            traderName={this.props.traderName}
            traderId={this.props.traderId}
            traderLabel={this.props.traderLabel}
            incomingTrackInfo={this.props.incomingTrackInfo}
          />
          <div>

            <button
              onClick={() => {this.setState({ trackToTrade: undefined })}}
              className=""
            >
              Decline
            </button>
            <button
              onClick={this.executeTrade}
              className=""
            >
              Add to deck
            </button>
          </div>
          <div className="IncomingCard-commentSection u-flex u-flex-justifyCenter">
            <RadioButtonGroup
              options={[
                {value: '5', label: "Love"},
                {value: '4', label: "Like"},
                {value: '3', label: "Neutral"},
                {value: '2', label: "Dislike"},
                {value: '1', label: "Hate"},
              ]}
              value={this.state.rating}
              size="small"
              style={{color: "#ffffff"}}
              onChange={(event) => this.setState({ rating: event.target.value })}
              required={true}
              label="Rate the song you got!"
              className=""
            />
          </div>
              </div>
      </>
    );
  }
}

export default IncomingCard;
