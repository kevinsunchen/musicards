import { Link } from "@reach/router";
import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";
import "./Home.css";
import requests from "../../public/envelope.svg";
import deck from "../../public/deck.svg";
import profile from "../../public/idcard.svg";
import incoming from "../../public/giftbox.svg";
import ModalSelectTrack from "../modules/ModalSelectTrack.js";

class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {showModal: false};
    
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
        <ModalSelectTrack
          isOpen={this.state.showModal}
          handleClose={() => this.setState({ showModal: false })}
        >
          welcome to musicards! here are some recommendations for u :D
          1. profile - log in with your spotify
          2. deck - populate your deck with your first suit of musicards! 
          3. request - add a request for a ~ v i b e ~ you've been searching for 
          4. request pt. 2 - fulfill somebody else's request while you're at it!
          5. incoming - check out what other people have sent u :O

          if you ever need to find this info again, just click on the logo on the home page :) we hope you enjoy our site!
        </ModalSelectTrack>
        
        <div className="Home-container">
          
          <div className="Home-requestGroup Home-topGroup Home-leftGroup">
            <div className="Home-topWrapper u-flex-alignCenter">
              <div className="Home-iconText u-flex-justifyFlexEnd">
                <Link to="/requests" className="u-link u-bold"> requests </Link>
              </div>
              <Link to="/requests" className="Home-iconWrapperTopL">
                <img src={requests} className="Home-icon" />
              </Link>
            </div>
          </div>

          <div className="Home-profileGroup Home-topGroup Home-rightGroup">
            <div className="Home-topWrapper u-flex-alignCenter">
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
                className="Home-iconWrapperTopR"
              >
                <img src={profile} className="Home-icon" />
              </Link>
            </div>
          </div>

          <div className="Home-logoText u-logofont"> musicards! </div>
          
          <div className="Home-incomingGroup Home-bottomGroup Home-leftGroup">
            <div className="Home-topWrapper u-flex-alignCenter">
              <Link to="/incoming" className="Home-iconWrapper">
                <img src={incoming} className="Home-icon" />
              </Link>
              <div className="Home-iconText Home-iconTextBottom u-flex-justifyStart">
                <Link to="/incoming" className="u-link u-bold"> incoming </Link>
              </div>
            </div>
          </div>

          <div className = "Home-deckGroup Home-bottomGroup Home-rightGroup"> 
            <div className="Home-topWrapper u-flex-alignCenter">
              <Link to="/deck" className="Home-iconWrapper">
                <img src={deck} className="Home-icon" />
              </Link>
              <div className="Home-iconText Home-iconTextBottom u-flex-justifyFlexStart">
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
