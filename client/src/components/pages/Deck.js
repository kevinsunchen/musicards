import React, { Component } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Skeleton.css";

class Deck extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  populateEmptyDeck() {
    console.log("User's deck is empty, so populate it with their top 13 listened to tracks on Spotify.")
    get("/api/getTopTracks", { numToGet: 13 }).then((tracks) => {
      this.setState({ deck: tracks });
      body = {
        tracks: tracks
      };
      post("/api/updateUserDeck", body);
    });
  }

  componentDidMount() {
    // remember -- api calls go here!
    console.log("Mounting", this.props.loggedInUser);
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
      </>
    );
  }
}

export default Deck;
