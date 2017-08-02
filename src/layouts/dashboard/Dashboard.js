import React, { Component } from 'react'
import SearchRide from '../../../images/SearchRide.png'
import CreateRide from '../../../images/CreateRide.png'
import SearchButtonContainer from '../../user/ui/searchbutton/SearchButtonContainer'
import SearchButtonActions from '../../user/ui/searchbutton/SearchButtonActions'
// import CreateButtonContainer from '../../user/ui/createbutton/CreateButtonContainer'
import { Link } from 'react-router'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }
  
  handleSearch= function(e){
      this.props.router.push('/search');
      //console.log(SearchButtonActions.SearchRide());
      //SearchButtonActions.SearchRide();
  };

    handleCreate= function(e){
      this.props.router.push('/create');
  };
  

  render() {    
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Welcome</h1>
            <p><strong>Hi {this.props.authData.name}!, your email is {this.props.authData.email}</strong></p>
            <span>
              <li className="pure-menu-list">
              <li>
                <img src={SearchRide} alt="" onClick={this.handleSearch.bind(this)}/>
              </li>
              <li>
                <img src={CreateRide} alt="" onClick={this.handleCreate.bind(this)}/>
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
