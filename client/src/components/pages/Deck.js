import React, { Component } from "react";
import { get, post } from "../../utilities";
import Musicard from "../modules/Musicard.js";

import "../../utilities.css";
import "./Deck.css"

class Deck extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      deck: undefined
    };
  }

  componentDidMount() {
    document.title = "My Deck";
    // remember -- api calls go here!
    console.log("Mounting", this.props.loggedInUser);
    get("/api/getMyDeck").then((deck) => {
      this.setState({ deck: deck })
      console.log(this.state.deck)
    })
  }

  populateEmptyDeck = () => {
    console.log("User's deck is empty, so populate it with their top 13 listened to tracks on Spotify.")
    get("/api/getMyTopTracks", { limit: 13 }).then((tracks) => {
      var body = {tracks: tracks};
      console.log(body)
      post("/api/addToMyDeck", body).then((deck) => {
        this.setState({ deck: deck });
      });
    });
  }

  renderDeckEmptyContent() {
    console.log("User's deck is empty")
    return (
      <>
        <p>Your deck is empty :(</p>
        <button onClick={this.populateEmptyDeck}> Populate Deck from Spotify! </button>
      </>
    )
  }

  renderDeckContent() {
    console.log("User's deck is NOT empty:", this.state.deck)
    let deckCards = this.state.deck.map((trackId) => (
      <Musicard key={trackId} trackId={trackId} />
    ))
    console.log(deckCards)
    return (
      <>
        <div className = "Deck-deckGroup"> {deckCards} </div>
      </>
    )
  }

  render() {
    let contentToRender = null;
    if (!this.props.loggedInUser) {
      contentToRender = <div className=""> Log in to view your deck! </div>
    }
    else if (!this.state.deck) {
      contentToRender = <div className=""> Loading... </div>
    } else {
      contentToRender = this.state.deck.length === 0 ? (
        this.renderDeckEmptyContent()
      ) : (
        this.renderDeckContent()
      )
    }
    console.log(this.props.loggedInUser)
    return (
      <div className="u-pageWrap">
        <h1 className = "u-pageTitle u-shadowPop u-shadowPopYellow u-logofont">my deck</h1>
        <h2 className = "u-pageDescription">your collected songs! use these in trades :)</h2>
        {contentToRender}
      </div>
    );
  }
}

export default Deck;
