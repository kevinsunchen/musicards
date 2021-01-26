import React, { Component } from "react";
import { get } from "../../utilities";

import "./Musicard.css";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the track (Spotify)
 */
class MusicPreview extends Component {
  constructor(props) {
    super(props);
    this.marqueeRef = React.createRef();
    this.marqueeRefTitle = React.createRef();
    this.state = {
      trackInfo: undefined,
      marquee: false,
      marqueeTitle: false
    };
  }

  componentDidMount() {
    console.log(this.props.trackInfo);
    // console.log(this.isElementOverflowing(this.marqueeRef));
    if (this.marqueeRef.current.clientWidth < this.marqueeRef.current.scrollWidth) {
      this.setState({ marquee: true });
    }
    console.log(this.marqueeRefTitle.current.clientWidth)
    console.log(this.marqueeRefTitle.current.scrollWidth)
    if (this.marqueeRefTitle.current.clientWidth < this.marqueeRefTitle.current.scrollWidth) {
      this.setState({ marqueeTitle: true });
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    }
  }

  componentDidUpdate() {

  }

  render() {
    if (!this.props.trackInfo) {
      return <div> Loading card... </div>
    }
    return (
      <div className="Musicard-container">
        {//<p className="marquee">
          //<span>
          //  {this.props.trackInfo.album} 
          //</span>
        //</p>
      }
        <div ref={this.marqueeRef} className={(this.state.marquee) ? ("marquee Musicard-album") : ("Musicard-album")}>
          <span> {this.props.trackInfo.album} </span>
        </div>
        <img className="Musicard-image" src={this.props.trackInfo.images[1].url} />
        <div ref={this.marqueeRefTitle} className={(this.state.marqueeTitle) ? ("marquee Musicard-title") : ("Musicard-title")}>
          <span> {this.props.trackInfo.name} </span>
        </div>
        {//<div className="Musicard-title">{this.props.trackInfo.name}</div>
        }
        <div className="Musicard-artists">{this.props.trackInfo.artists.join(", ")}</div>
        <div className="Musicard-play">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
      </div>
    );
  }
}

export default MusicPreview;