import React, { Component } from 'react'
import MyRidesFormContainer from '../../ui/myridesform/MyRidesFormContainer'

class MyRides extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>My Rides</h1>
            <p>Here you will find your rides.</p>
            <MyRidesFormContainer />
          </div> 
        </div>
        </main>
    )
  }
}

export default MyRides
