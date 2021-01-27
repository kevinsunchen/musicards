import React, { Component } from "react";
import { get } from "../../utilities";
import MusicPreview from "./MusicPreview.js";


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
    this.marqueeRef = React.createRef();
    this.marqueeRefTitle = React.createRef();
    this.state = {
      trackInfo: undefined,
      marquee: false,
      marqueeTitle: false
    };
  }

  componentDidMount() {
    get("/api/getTrackProcessed", { trackId: this.props.trackId }).then((trackInfo) => {
      console.log(trackInfo);
      this.setState({trackInfo: trackInfo});
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
    });
  }

  componentDidUpdate() {

  }

  render() {
    if (!this.state.trackInfo) {
      return <div> Loading card... </div>
    }
    return (
      <div className="Musicard-container">
        {//<p className="marquee">
          //<span>
          //  {this.state.trackInfo.album} 
          //</span>
        //</p>
      }
        <div ref={this.marqueeRef} className={(this.state.marquee) ? ("marquee Musicard-album") : ("Musicard-album")}>
          <span> {this.state.trackInfo.album} </span>
        </div>
        <MusicPreview 
          trackInfo={this.state.trackInfo} 
          autoRefreshOn={() => {}}
          autoRefreshOff={() => {}}
        />

        {//<img className="Musicard-image" src={this.state.trackInfo.images[1].url} />
        }

        <div ref={this.marqueeRefTitle} className={(this.state.marqueeTitle) ? ("marquee Musicard-title") : ("Musicard-title")}>
          <span> {this.state.trackInfo.name} </span>
        </div>
        {//<div className="Musicard-title">{this.state.trackInfo.name}</div>
        }
        <div className="Musicard-artists">{this.state.trackInfo.artists.join(", ")}</div>
        
        
        
      </div>
    );
  }
}

export default Musicard;