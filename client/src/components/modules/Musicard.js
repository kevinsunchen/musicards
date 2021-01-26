import React, { Component } from "react";
import { get } from "../../utilities";

import "./Musicard.css";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the track (Spotify)
 */
class Musicard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackInfo: undefined
    };
  }

  componentDidMount() {
    get("/api/getTrackProcessed", { trackId: this.props.trackId }).then((trackInfo) => {
      console.log(trackInfo);
      this.setState({trackInfo: trackInfo});
    })
  }

  render() {
    if (!this.state.trackInfo) {
      return <div> Loading card... </div>
    }
    return (
      <div className="Musicard-container">
        <div className="Musicard-album">{this.state.trackInfo.album}</div>
        <img className="Musicard-image" src={this.state.trackInfo.images[1].url} />
        <div className="Musicard-title">{this.state.trackInfo.name}</div>
        <div className="Musicard-artists">{this.state.trackInfo.artists.join(", ")}</div>
        <div className="Musicard-play"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg> </div>
        
      </div>
    );
  }
}

export default Musicard;
