import React, { Component } from 'react'
import SearchRide from '../../../images/SearchRide.png'
import CreateRide from '../../../images/CreateRide.png'
import MyRides from '../../../images/MyRides.png'
//import { Link } from 'react-router'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }
  
  handleSearch= function(e){
      this.props.router.push('/search');
  };

  handleCreate= function(e){
      this.props.router.push('/create');
  };

  handleMyRides = function (e){
    this.props.router.push('/myrides');
  }
  

  render() {    
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Welcome to Decentralized Ride Share!</h1>
            <p><strong>Hi {this.props.authData.name}!</strong></p>
            <span>
              <li className="pure-menu-list">
              <li>
                <img src={SearchRide} alt="" onClick={this.handleSearch.bind(this)}/>
              </li>
              <li>
                <img src={CreateRide} alt="" onClick={this.handleCreate.bind(this)}/>
              </li>
              <li>
                <img src={MyRides} alt="" onClick={this.handleMyRides.bind(this)}/>
              </li>
              </li>
             </span> 
          </div>
        </div>
      </main>
    )//return
  }//render
}//Dashboard

export default Dashboard
