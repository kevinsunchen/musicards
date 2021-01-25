import React, { Component } from "react";
import { navigate, Router, Match } from "@reach/router";
import NavBar from "./modules/NavBar.js";
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
import "./App.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import "./App.css";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ loggedInUser: user });
      }
    });
  }

  handleLogin = () => {
    get("/api/spotifyLogin").then((data) => {
      console.log((data))
      window.location.href = data.url
    })
  }

  handleLogout = () => {
    this.setState({ loggedInUser: undefined });
    console.log("logging out")
    post("/api/logout").then(() => navigate('/login'));
  };

  render() {
    return (
      <>
        {console.log("Logged in?", this.state.loggedInUser)}
        <div className = "wrapper"> 


            <Match
              path="/">
              {props =>
                props.match ? (
                  <></>
                  ) : (
                    <div className="navbar">

                    <NavBar
                    loggedInUser={this.state.loggedInUser}
                    />
                    </div>
                    )
                  }
            </Match>

          <div className="maincontent"
          >
          <Router
          >
            <Home path="/" loggedInUser={this.state.loggedInUser} />
            <RequestFeed path="/requests" loggedInUser={this.state.loggedInUser} />
            <Deck path="/deck" loggedInUser={this.state.loggedInUser} />
            <Incoming path="/incoming" loggedInUser={this.state.loggedInUser} />
            <Login
              path="/login"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              loggedInUser={this.state.loggedInUser}
              />
            <Profile 
              path="/profile/:profileId"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              loggedInUser={this.state.loggedInUser}
              />
            <MyRequests path="/profile/:profileId/my_requests" />
            <TradeHistory path="/profile/:profileId/trade_history" />
            <NotFound default />
          </Router>            
              </div>
        </div>
        
        
      </>
    );
  }
}

export default App;