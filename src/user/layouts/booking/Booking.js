import React, { Component } from 'react'
import BookingFormContainer from '../../ui/booking/BookingFormContainer'

class Booking extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1> Results!</h1>
            <p> Here you can find your search results.</p>
            <BookingFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Booking
