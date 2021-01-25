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
        
        <div className = "container"> 
          <div className = "iconGroup"> 
            <Link to="/requests">
              requests
              <img src = {envelope} width = "500px" class = "icon"/> <br />
            </Link>
          </div>

          <div className = "iconGroup"> 
            {this.props.loggedInUser ? (
              <Link to={`/profile/${this.props.loggedInUser._id}`}>
                profile <br />
                <img src = {idcard} width = "400px"  /> <br />
              </Link>
            ) : (
              <Link to='/login'>
                login <br />
                <img src = {idcard} width = "400px" /> <br />
              </Link>
            )}
            
          </div>

          <div class="break"></div>
          <div class = "appname"> musicards! </div>
          <div class="break"></div>
          
          <div className = "iconGroup"> 
            <Link to="/incoming">
              <img src = {box} width = "450px"/> <br />
              incoming <br />
            </Link>
          </div>

          <div className = "iconGroup"> 
            <Link to="/deck">
              <img src = {deck} width = "450px" /> <br />
              deck <br />
            </Link>
          </div>

          
        </div>
        
        
        
        
        
        
        
        
        
      </>
    );
  }
}

export default Home;
