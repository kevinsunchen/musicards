import React, { Component } from "react";

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
class HeartIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg className="HeartIcon" xmlns="http://www.w3.org/2000/svg" fill={this.props.fill} viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
    );
  }
}

class RatingIcon extends Component {
  constructor(props) {
    super(props);
  }
  
  fill = () => {
    if (this.props.hoverRating >= this.props.index) {
      return 'red';
    } else if (!this.props.hoverRating && this.props.rating >= this.props.index) {
      return 'red';
    }
    return 'white';
  }

  render() {
    return (
      <div
        onClick={() => this.props.onSaveRating(this.props.index)}
        onMouseEnter={() => this.props.onMouseEnter(this.props.index)}
        onMouseLeave={() => this.props.onMouseLeave()}
      >
        <HeartIcon fill={this.fill()}/>
      </div>
    );
  }
}

export default RatingIcon;
