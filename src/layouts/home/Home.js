import React, { Component } from 'react'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Welcome to Ride Share!</h1>
            <p>Ride Share allows you to share fuel costs with others.</p>
            <h2>Decentralized Application</h2>
            <p>Ride Share is a decentralized Application (dApp) running on Ethereum blockchain. </p>
            <p>To login click in the upper-right corner or signup to create an account. </p>
            <h3>Further Reading</h3>
            <p>The React/Redux portions of the authentication fuctionality are provided by <a href="https://github.com/mjrussell/redux-auth-wrapper" target="_blank">mjrussell/redux-auth-wrapper</a>.</p>
            <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0yokkBr8ka-1JWBnL5b6ZiIuPqMIEnJU&libraries=places"></script>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
