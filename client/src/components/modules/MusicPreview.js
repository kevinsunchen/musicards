import React, { Component } from "react";
import "./MusicPreview.css";

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
      marquee: false,
      marqueeTitle: false,
      audioPlaying: false
    };
    this.audio = new Audio(this.props.trackInfo.preview_url)
    console.log(this.audio);
  }

  componentDidMount() {
    console.log(this.props.trackInfo);
    // console.log(this.isElementOverflowing(this.marqueeRef));
    if (this.marqueeRef.current.clientWidth < this.marqueeRef.current.scrollWidth) {
      this.setState({ marquee: true });
    }
    if (this.marqueeRefTitle.current.clientWidth < this.marqueeRefTitle.current.scrollWidth) {
      this.setState({ marqueeTitle: true });
    }
    this.audio.addEventListener('ended', () => this.props.toggleAudioPlaying(this.audio));
  }

  componentWillUnmount() {
    this.audio.removeEventListener('ended', () => this.props.toggleAudioPlaying(this.audio));
    this.audio.pause();
    console.log("unmounitng", this.props.audioPlaying)
  }


  toggleAudioPlaying = () => {
    console.log(this.state.audioPlaying);
    this.setState(prevState => ({
      audioPlaying: !prevState.audioPlaying
    }), () => {
      console.log(this.state.audioPlaying);
    });
  }

  render() {
    if (!this.props.trackInfo) {
      return <div> Loading card... </div>
    }
    return (
      <div className="MusicPreview-container">
        <div ref={this.marqueeRef} className={(this.state.marquee) ? ("marquee Musicard-album") : ("Musicard-album")}>
          <span> {this.props.trackInfo.album} </span>
        </div>

        <div className="MusicPreview-imgContainer">
          <img className="MusicPreview-image" src={this.props.trackInfo.images[1].url} />
          <div className="MusicPreview-playButton" onClick={() => { this.props.toggleAudioPlaying(this.audio) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <div ref={this.marqueeRefTitle} className={(this.state.marqueeTitle) ? ("marquee MusicPreview-title") : ("MusicPreview-title")}>
          <span> {this.props.trackInfo.name} </span>
        </div>
        {//<div className="Musicard-title">{this.props.trackInfo.name}</div>
        }
        <div className="MusicPreview-artists">{this.props.trackInfo.artists.join(", ")}</div>
        
      </div>
    );
  }
}

export default MusicPreview;