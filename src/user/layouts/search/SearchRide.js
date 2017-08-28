import React, { Component } from 'react'
import SearchFormContainer from '../../ui/searchform/SearchFormContainer'

class SearchRide extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1> Search a Ride!</h1>
            <p> Here you can find a ride.</p>
            <SearchFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default SearchRide
