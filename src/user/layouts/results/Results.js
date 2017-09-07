import React, { Component } from 'react'
import ResultsContainer from '../../ui/results/ResultsContainer'

class Results extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1> Results!</h1>
            <p> Here you can find your search results.</p>
           // <ResultsContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Results
