import React, { Component } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";

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
      this.setState({
        trackInfo: trackInfo
      });
    })
  }

  render() {
    if (!this.state.trackInfo) {
      return <div> Loading card... </div>
    }
    return (
      <div className="Musicard-wrapper">
        <img className="Musicard-image" src={this.state.trackInfo.images[1].url} />
        <div className="Musicard-title">{this.state.trackInfo.name}</div>
        <div className="Musicard-artists">{this.state.trackInfo.artists.join(", ")}</div>
        <div className="Musicard-album">{this.state.trackInfo.album}</div>
        <br />
      </div>
    );
  }
}

export default Musicard;
