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
        <h2 className = "u-pageDescription">hello! we're <em>boneless avocado</em>, the team behind musicards!</h2>
        <div>
          we are two students currently at MIT (co '23). some info:
          <li>
            kevin: course 6-2 (EECS)
          </li>
          <li>
            amy: course 20 (bioeng)
          </li>
          we created this site as part of MIT's <a href="https://weblab.mit.edu/" className="u-link u-bold">2021 Web.lab competition</a> and won 3rd Place in the main division, as well as the Most Unique Concept award and the Appian Special Category sponsor award.
          
          but most importantly, we had a lot of fun making this site! and we hope you have a lot of fun using it :)
        </div>
      </div>
    );
  }
}

export default About;
