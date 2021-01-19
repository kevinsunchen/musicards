import React, { Component } from "react";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Skeleton.css";

class Deck extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
    console.log("Mounting", this.props.loggedInUser);
  }

  populateEmptyDeck() {
    console.log("User's deck is empty, so populate it with their top 13 listened to tracks on Spotify.")
    get("/api/getTopTracks", { numToGet: 13 }).then((tracks) => {
      //this.setState({ deck: tracks });
      var body = {tracks: tracks};
      console.log(body)
      post("/api/updateUserDeck", body);
    });
  }

  renderDeckEmptyContent() {
    if (this.props.loggedInUser.deck.length === 0) {
      console.log("User's deck is empty")
      return (
        <>
          <p>Deck is empty</p>
          <button onClick={this.populateEmptyDeck}> button </button>
        </>
      )
    }
    console.log("User's deck is NOT empty")
  }

  render() {
    var currUser = this.props.loggedInUser;
    if (!currUser) {
      return <div> Log in to view your deck! </div>
    }
    console.log(currUser)
    return (
      <>
        <h1>MY DECK</h1>
        <h2>Page where the user can view their deck.</h2>
        <p>Current user <strong>{currUser.name}</strong> with ID <strong>{currUser.uid}</strong> and Spotify username <strong>{currUser.spotifyId}</strong>.</p>
        <p>{currUser.name}'s deck: {currUser.deck}</p>
        {this.renderDeckEmptyContent()}
      </>
    );
  }
}

export default Deck;
