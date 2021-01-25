import React, { Component } from "react";
import SingleIncoming from "./SingleIncoming.js"
import ModalSelectTrack from "./ModalSelectTrack.js"
import SingleIncomingRate from "./SingleIncomingRate.js";

import { get, post } from "../../utilities";

import "./IncomingCard.css";

const ratingOptions = [
  {value: '5', label: "Love"},
  {value: '4', label: "Like"},
  {value: '3', label: "Neutral"},
  {value: '2', label: "Dislike"},
  {value: '1', label: "Hate"},
]

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
      rating: undefined,
    };
  }

  componentDidMount() {
    console.log("Props", this.props);
  }

  declineIncoming = () => {
    if (!this.state.rating) {
      window.alert("Please rate the song you received before declining!");
    } else {
      const body = {
        rating: this.state.rating,
        tradeId: this.props.tradeId
      }
      post("/api/declineIncoming", body).then((response) => {
        this.props.triggerFeedRefresh();
      }).catch((err) => { console.log(err) });
    }
  }

  addIncomingToDeck = () => {
    console.log("Attempt to trade initiated");
    if (!this.state.rating) {
      window.alert("Please rate the song you received before adding it to your deck!");
    } else {
      const body = {
        rating: this.state.rating,
        tradeId: this.props.tradeId,
        incomingTrackId: this.props.incomingTrackInfo._id
      }
      post("/api/addIncomingToDeck", body).then((response) => {
        console.log("Traded")
        console.log(response);
        this.props.triggerFeedRefresh();
      }).catch((err) => {
        console.log(err);
      });
    }
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
          <div className="u-flex">
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
            <div className="">
              <button
                onClick={this.declineIncoming}
                className=""
              > Decline </button>
              <button
                onClick={this.addIncomingToDeck}
                className=""
              > Add to deck </button>
            </div>
          </div>
          <div className="IncomingCard-commentSection u-flex u-flex-justifyCenter">
            <SingleIncomingRate
              rating={this.state.rating}
              setRating={(num) => {this.setState({ rating: num })}}
            />
          </div>
        </div>
      </>
    );
  }
}

export default IncomingCard;
