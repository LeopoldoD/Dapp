import React, { Component } from 'react'
//import IPFSUploader from './IPFSUploader.js';


class MyRidesForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selection: '',
    }
  }

  onInputChange(event) {
    this.setState({ selection: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

 //Review lengths name, phone and email

    if (this.state.selection == undefined || this.state.selection == 0)
    {
      return alert('Please select a valid option');
    }

      this.props.onCancelRideSubmit(this.state.selection);
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="selection">Ride</label>
          <input id="ride" type="text" value={this.state.selection} onChange={this.onInputChange.bind(this)} placeholder="Ride" />
          <span className="pure-form-message">This is a required field.</span>

          <button type="submit" className="pure-button pure-button-primary">Update</button>
        </fieldset>
      </form>


    )
  }
}

export default MyRidesForm
