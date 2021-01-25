import React, { Component } from "react";
import RatingIcon from "./RatingIcon.js";


import "./SingleIncomingRate.css";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
class SingleIncomingRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      hoverRating: 0
    }
  }
  
  onMouseEnter = (index) => {
    this.setState({ hoverRating: index });
  }

  onMouseLeave = () => {
    this.setState({ hoverRating: 0 });
  }


  render() {
    return (
      <div className="u-flexColumn SingleIncomingRate-content">
        Rate the song you got!
        <div className="u-flex u-flex-justifyCenter">
          {[1, 2, 3, 4, 5].map((index) => 
            <RatingIcon 
            key={`RatingIcon_${index}`}
            index={index} 
            rating={this.props.rating} 
            hoverRating={this.state.hoverRating} 
            onMouseEnter={this.onMouseEnter} 
            onMouseLeave={this.onMouseLeave} 
            onSaveRating={this.props.setRating} />
            )}
        </div>
      </div>
    );
  }
}

export default SingleIncomingRate;
