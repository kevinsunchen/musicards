import React, { Component } from "react";
import { Link } from "@reach/router";
import { scaleRotate as Menu } from 'react-burger-menu'
import requests from "../../public/envelope.svg";
import deck from "../../public/deck.svg";
import profile from "../../public/idcard.svg";
import incoming from "../../public/giftbox.svg";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleStateChange = (state) => {
    this.setState({isOpen: state.isOpen})  
  }

  closeMenu = () => {
    this.setState({isOpen: false})
  }

  render() {
    return (
      <Menu
        disableAutoFocus
        itemListElement="div"
        pageWrapId={ "page-wrap" }
        outerContainerId={ "outer-container" }
        isOpen={ this.state.isOpen }
        onStateChange={(state) => this.handleStateChange(state)}
      >
        <Link to="/" className="NavBar-logo u-logofont u-shadowPop u-shadowPopBlue" onClick={this.closeMenu}> musicards! </Link>

        <div className="">
          <Link to="/requests" className="NavBar-iconGroup u-link u-bold" onClick={this.closeMenu}>
            <img src={requests} className="NavBar-icon" />
            <div>requests</div>
          </Link>
        </div>

        <div className="u-flexColumn">
          <Link to="/incoming" className="NavBar-iconGroup u-link u-bold" onClick={this.closeMenu}>
            <img src={incoming} className="NavBar-icon" />
            <div>incoming</div>
          </Link>
        </div>

        <div className="u-flexColumn">
          <Link to="/deck" className="NavBar-iconGroup u-link u-bold" onClick={this.closeMenu}>
            <img src={deck} className="NavBar-icon" />
            <div>deck</div>
          </Link>
        </div>

        {this.props.loggedInUser ? (
          <div className="u-flexColumn">
            <Link to={`/profile/${this.props.loggedInUser._id}`} className="NavBar-iconGroup u-link u-bold" onClick={this.closeMenu}>
              <img src={profile} className="NavBar-icon" />
              <div>profile</div>
            </Link>
          </div>
        ) : (
            <div className="u-flexColumn">
              <Link to={'/login'} className="NavBar-iconGroup u-link u-bold" onClick={this.closeMenu}>
                <img src={requests} className="NavBar-icon" />
                <div>login</div>
              </Link>
            </div>
          )}
      </Menu>
    );
  }
}

export default NavBar;

/**
 *       <nav className="NavBar-container">
        <div className="NavBar-title">musicards!</div>
        <div className="NavBar-linkContainer">
          <Link to="/" className="NavBar-link">
            Home
          </Link>
        </div>
        <div className="NavBar-linkContainer">
          {this.props.userId ? (
            <Link to={`/profile/${this.props.userId}`} className="NavBar-link">
              Profile
            </Link>
          ) : (
            <Link to={'/login'} className="NavBar-link">
              Login
            </Link>
          )}
        </div>
      </nav>
 */