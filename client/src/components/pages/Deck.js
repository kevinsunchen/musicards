import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";


class Deck extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      loggedInUserDeck: undefined
    };
  }

  componentDidMount() {
    // remember -- api calls go here!

  }

  render() {
    console.log(1)
    return (
      <>
        <h1>MY DECK</h1>
        <h2>Page where the user can view their deck.</h2>
      </>
    );
  }
}

export default Deck;
