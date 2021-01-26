import { Link } from "@reach/router";
import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";
import "./Home.css";
import requests from "../../public/envelope.svg";
import deck from "../../public/deck.svg";
import profile from "../../public/idcard.svg";
import incoming from "../../public/giftbox.svg";

class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    document.title = "musicards!";
    // remember -- api calls go here!
  }
//<h1>HOME</h1>
//<h2>Home page. Includes icons linking to the public Requests feed, the user's Incoming cards page, the user's Deck page, and the user's Profile page.</h2>
        
  render() {
    return (
      <>
        
        <div className="Home-container">
          
          <div className="Home-requestGroup Home-topGroup Home-leftGroup">
            <div className="Home-topWrapper">
              <div className="Home-iconText u-flex-justifyFlexEnd">
                <Link to="/requests" className="u-link u-bold"> requests </Link>
              </div>
              <Link to="/requests" className="Home-iconWrapper">
                <img src={requests} className="Home-icon" />
              </Link>
            </div>
          </div>

          <div className="Home-profileGroup Home-topGroup Home-rightGroup">
            <div className="Home-topWrapper">
              <div className="Home-iconText u-flex-justifyFlexEnd">
                <Link
                  to={(this.props.loggedInUser) ? (`/profile/${this.props.loggedInUser._id}`) : ('/login')}
                  className="u-link u-bold"
                >
                  {(this.props.loggedInUser) ? "profile" : "login"}
                </Link>
              </div>
              <Link
                to={(this.props.loggedInUser) ? (`/profile/${this.props.loggedInUser._id}`) : ('/login')}
                className="Home-iconWrapper"
              >
                <img src={profile} className="Home-icon" />
              </Link>
            </div>
          </div>

          <div className="Home-logoText"> musicards! </div>
          
          <div className="Home-incomingGroup Home-bottomGroup Home-leftGroup">
            <div className="Home-topWrapper">
              <Link to="/incoming" className="Home-iconWrapper">
                <img src={incoming} className="Home-icon" />
              </Link>
              <div className="Home-iconText u-flex-justifyCenter">
                <Link to="/incoming" className="u-link u-bold"> incoming </Link>
              </div>
            </div>
          </div>

          <div className = "Home-deckGroup Home-bottomGroup Home-rightGroup"> 
            <div className="Home-topWrapper">
              <Link to="/deck" className="Home-iconWrapper">
                <img src={deck} className="Home-icon" />
              </Link>
              <div className="Home-iconText u-flex-justifyCenter">
                <Link to="/deck" className="u-link u-bold"> deck </Link>
              </div>
            </div>
          </div>
          
        </div>
        
        
        
        
        
        
        
        
        
      </>
    );
  }
}

export default Home;
