import { Link } from "@reach/router";
import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";
import "./Home.css";
import envelope from "../../public/envelope.svg";
import deck from "../../public/deck.svg";
import idcard from "../../public/idcard.svg";
import box from "../../public/giftbox.svg";

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
          <div className="Home-requestGroup Home-topIcons">
            <Link to="/requests" className="u-link u-bold">
              <div className="Home-iconText">
                requests
              </div>
              <img src = {envelope} width = "500px" className= "icon"/>
            </Link>
          </div>

          <div className = "Home-profileGroup Home-topIcons"> 
            <Link
              to={(this.props.loggedInUser) ? (`/profile/${this.props.loggedInUser._id}`) : ('/login')}
              className="u-link u-bold"
            >
              <div className="Home-iconText">
                {(this.props.loggedInUser) ? "profile" : "login"}
              </div>
              <img src = {idcard} width = "450px"  />
            </Link>
          </div>

          <div className="Home-logoText"> musicards! </div>
          
          <div className="Home-incomingGroup Home-bottomIcons"> 
            <Link to="/incoming" className="u-link u-bold">
              <img src = {box} width = "450px"/>
              <div className="Home-iconText">
                incoming
              </div>
            </Link>
          </div>

          <div className = "Home-deckGroup Home-bottomIcons"> 
            <Link to="/deck" className="u-link u-bold">
              <img src = {deck} width = "450px" />
              <div className="Home-iconText">
                deck
              </div>
            </Link>
          </div>

          
        </div>
        
        
        
        
        
        
        
        
        
      </>
    );
  }
}

export default Home;
