import { Link } from "@reach/router";
import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";
import "./Home.css";
import envelope from "../../public/envelope.svg";
import deck from "../../public/deck.svg";
import idcard from "../../public/idcard.svg";
import box from "../../public/box.svg";

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
              requests <br />
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
<<<<<<< HEAD
              <img src = {box} width = "500px"/> <br />
=======
              <img src = {deck} width = "400px"/> <br />
>>>>>>> 2df6214 (css start for home page)
              incoming <br />
            </Link>
          </div>

          <div className = "iconGroup"> 
            <Link to="/deck">
<<<<<<< HEAD
              <img src = {deck} width = "450px" /> <br />
=======
              <img src = {deck} width = "400px" /> <br />
>>>>>>> 2df6214 (css start for home page)
              deck <br />
            </Link>
          </div>

          
        </div>
        
        
        
        
        
        
        
        
        
      </>
    );
  }
}

export default Home;
