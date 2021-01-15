import React, { Component } from "react";
import { navigate, Router } from "@reach/router";
import Home from "./pages/Home.js";
import RequestFeed from "./pages/RequestFeed.js";
import Deck from "./pages/Deck.js";
import Incoming from "./pages/Incoming.js";
import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js";
import MyRequests from "./pages/MyRequests.js";
import TradeHistory from "./pages/TradeHistory.js";
import NotFound from "./pages/NotFound.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id }, () => navigate(`/profile/${this.state.userId}`));
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <Router>
          <Home path="/" userId={this.state.userId} />
          <RequestFeed path="/requests" userId={this.state.userId} />
          <Deck path="/deck" userId={this.state.userId} />
          <Incoming path="/incoming" userId={this.state.userId} />
          <Login
            path="/login"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <Profile 
            path="/profile/:userId"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <MyRequests path="/profile/:userId/my_requests" />
          <TradeHistory path="/profile/:userId/trade_history" />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;