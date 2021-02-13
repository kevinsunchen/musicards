import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";

class About extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  render() {
    return (
      <div className="u-pageWrap">
        <h1 className = "u-pageTitle u-shadowPop u-shadowPopBlue u-logofont">about</h1>
        <h2 className = "u-pageDescription">hi! we're team <em>boneless avocado</em>, creator of musicards!</h2>
        <div>
          we're two students at mit
        </div>
      </div>
    );
  }
}

export default About;
