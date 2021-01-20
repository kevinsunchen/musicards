import React, { Component } from "react";
import Modal from "./Modal.js"
import { get } from "../../utilities";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
class ModalSelectTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: undefined
    }
  }

  componentDidMount() {

  }

  getUserDeck = () => {
    get("/api/getMyDeckProcessed").then((deck) => {
      console.log("Deck received from server", deck)
      this.setState({ deck: deck })
    })
  }

  render() {
    return (
      <>
        <Modal
          title="Choose a song to trade!"
          open={this.props.open}
          onOpen={this.getUserDeck}
          handleClose={this.props.handleClose}
        >
          placeholder text
        </Modal>
      </>
    )
  }
}

export default ModalSelectTrack;
