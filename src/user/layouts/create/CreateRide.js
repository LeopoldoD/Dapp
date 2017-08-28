import React, { Component } from 'react'
import CreateFormContainer from '../../ui/createform/CreateFormContainer'

class CreateRide extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Create a new Ride!</h1>
            <p> Here you can create a new ride to share fuel costs with others.</p>
            <CreateFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default CreateRide
