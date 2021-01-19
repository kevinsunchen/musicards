import React, { Component } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Skeleton.css";


class Deck extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      uid: undefined,
      spotifyId: undefined,
      name: undefined,
      deck: undefined
    };
  }

  updateLoggedInUser() {
    console.log("Mounting", this.props.userId)
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({
          uid: user._id,
          spotifyId: user.spotifyId,
          name: user.name,
          deck: user.deck
        });
      }
    });
  }

  componentDidMount() {
    // remember -- api calls go here!
    console.log("Mounting", this.props.userId)
    this.updateLoggedInUser();
  }

  render() {
    if (!this.state.uid) {
      return <div> Log in to view your deck! </div>
    }
    console.log(this.state)
    return (
      <>
        <h1>MY DECK</h1>
        <h2>Page where the user can view their deck.</h2>
        <p>Current user <strong>{this.state.name}</strong> with ID <strong>{this.state.uid}</strong> and Spotify username <strong>{this.state.spotifyId}</strong>.</p>
        <p>{this.state.name}'s deck: {this.state.deck}</p>
      </>
    );
  }
}

export default Deck;
