import React, { Component } from "react";
import "./MusicPreview.css";

/**
 * Story is a component that renders creator and content of a story
 * Partially inspired by https://stackoverflow.com/questions/47686345/playing-sound-in-react-js
 * 
 * Proptypes
 * @param {string} _id of the track (Spotify)
 */
class MusicPreview extends Component {
  constructor(props) {
    super(props);
    this.audio = new Audio(this.props.trackInfo.preview_url)
    this.state = {
      audioPlaying: false
    }
  }

  componentDidMount() {
    console.log(this.props.trackInfo);
    this.audio.addEventListener('ended', () => this.toggleAudioPlaying());
  }

  componentWillUnmount() {
    this.audio.removeEventListener('ended', () => this.toggleAudioPlaying());
    this.audio.pause();
    console.log("unmounitng", this.state.audioPlaying);
  }

  toggleAudioPlaying = () => {
    this.setState(prevState => ({ audioPlaying: !prevState.audioPlaying }), () => {
      console.log("playing?", this.state.audioPlaying);
      (this.state.audioPlaying) ? (
        this.audio.play().catch((err) => {
          console.log("err", err);
          window.alert("unfortunately, this song does not have a preview url :( use your imagination maybe?");
          this.setState({ audioPlaying: false });
        })
      ) : (this.audio.pause());
      if (this.props.autoRefreshOn && this.props.autoRefreshOff) {
        (this.state.audioPlaying) ? (this.props.autoRefreshOff()) : (this.props.autoRefreshOn());
      }
    });
  }

  render() {
    if (!this.props.trackInfo) {
      return <div> Loading card... </div>
    }
    return (
      <div className="MusicPreview-imgContainer" onClick={() => { this.toggleAudioPlaying() }}>
          <img className="MusicPreview-img" src={this.props.trackInfo.images[1].url} />

          <div className="MusicPreview-playButton">
            <svg className="shadow"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={"white"}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
      </div>
    );
  }
}

export default MusicPreview;