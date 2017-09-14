import React, { Component } from 'react'
import RidesList from './RidesList'
import {getMyRides} from './MyRidesFormActions'
//import IPFSUploader from './IPFSUploader.js';


class MyRidesForm extends Component {

  handleSubmit(event) {
    event.preventDefault()
      this.props.onGetMyRidesSubmit();
  }

  render() { 
    return(
      <div>
      <RidesList/>
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>

          <button type="submit" className="pure-button pure-button-primary">Get Rides</button>

        </fieldset>
      </form>
      </div> 

    )
  }
}

export default MyRidesForm
