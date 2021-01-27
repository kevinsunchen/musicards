import { Link } from "@reach/router";
import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";
import "./Home.css";
import requests from "../../public/envelope.svg";
import deck from "../../public/deck.svg";
import profile from "../../public/idcard.svg";
import incoming from "../../public/giftbox.svg";
import Modal from "../modules/Modal.js";

class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      showModal: true
    };
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
        <Modal
          isOpen={this.state.showModal}
          handleClose={() => this.setState({ showModal: false })}
        >
          <div className = "Home-modalText u-flexColumn"> 
            <div className = "Home-modalTextIntro"> 
              welcome to musicards! here are some recommendations for u :D
            </div>

            <div className = "Home-modalTextBullets u-flexColumn"> 
              <div className = "Home-modalTextBulletPoint"> 1.  <strong> login/profile</strong> - log in with your spotify </div>
              <div className = "Home-modalTextBulletPoint"> 2.  <strong> deck</strong> - populate your deck with your first suit of musicards! </div>
              <div className = "Home-modalTextBulletPoint"> 3.  <strong> request</strong> - make a request for a <i>~ v i b e ~</i> you've been searching for  </div>
              <div className = "Home-modalTextBulletPoint"> 4.  <strong> request</strong> - fulfill somebody else's request while you're at it! </div>
              <div className = "Home-modalTextBulletPoint"> 5.  <strong> incoming</strong> - check out what other people have sent u :O </div>
            </div>

            <div className = "Home-modalTextClosing"> 
              if you ever need to find this info again, just click on the <strong>logo </strong> on the <strong> home page</strong> :) we hope you enjoy our site!
            </div>

          </div>
          
        </Modal>
        
        <div className="Home-container">
          
          <div className="Home-requestsGroup Home-topGroup Home-leftGroup">
            <div className="Home-topWrapper u-flex-alignCenter">
              <div className="Home-iconText u-flex-justifyFlexEnd">
                <Link to="/requests" className="Home-requestsText u-logofont"> requests </Link>
              </div>
              <Link to="/requests" className="Home-iconWrapperTopL">
                <img src={requests} className="Home-icon Home-requestsIcon" />
              </Link>
            </div>
          </div>

          <div className="Home-profileGroup Home-topGroup Home-rightGroup">
            <div className="Home-topWrapper u-flex-alignCenter">
              <div className="Home-iconText u-flex-justifyFlexEnd">
                <Link
                  to={(this.props.loggedInUser) ? (`/profile/${this.props.loggedInUser._id}`) : ('/login')}
                  className="Home-profileText u-logofont"
                >
                  {(this.props.loggedInUser) ? "profile" : "login"}
                </Link>
              </div>
              <Link
                to={(this.props.loggedInUser) ? (`/profile/${this.props.loggedInUser._id}`) : ('/login')}
                className="Home-iconWrapperTopR"
              >
                <img src={profile} className="Home-icon Home-profileIcon" />
              </Link>
            </div>
          </div>

          <div className="Home-logoText u-logofont u-shadowPop u-shadowPopBlue" onClick={() => {this.setState({showModal: true})}}> musicards! </div>
          
          <div className="Home-incomingGroup Home-bottomGroup Home-leftGroup">
            <div className="Home-topWrapper u-flex-alignCenter">
              <Link to="/incoming" className="Home-iconWrapper">
                <img src={incoming} className="Home-icon Home-incomingIcon" />
              </Link>
              <div className="Home-iconText Home-iconTextBottom u-flex-justifyStart">
                <Link to="/incoming" className="Home-incomingText u-logofont"> incoming </Link>
              </div>
            </div>
          </div>

          <div className = "Home-deckGroup Home-bottomGroup Home-rightGroup"> 
            <div className="Home-topWrapper u-flex-alignCenter">
              <Link to="/deck" className="Home-iconWrapper">
                <img src={deck} className="Home-icon Home-deckIcon" />
              </Link>
              <div className="Home-iconText Home-iconTextBottom u-flex-justifyFlexStart">
                <Link to="/deck" className="Home-deckText u-logofont"> deck </Link>
              </div>
            </div>
          </div>
          
        </div>
        
        
        
        
        
        
        
        
        
      </>
    );
  }
}

export default Home;
