import React, { Component } from 'react'
import SearchButtonContainer from '../../user/ui/searchbutton/SearchButtonContainer'
import SearchButtonActions from '../../user/ui/searchbutton/SearchButtonActions'
import pic from '../../../images/SearchRide.png'

class SearchRide extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }
    handleFindRide= function(e){
      //var i, myAddress;
      //var myJSONResult="https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=(cities)&language=pt_BR&key=AIzaSyA0yokkBr8ka-1JWBnL5b6ZiIuPqMIEnJU";
      //console.log(myJSONResult);
      //console.log(myJSONResult.length);
      //for (i = 0; i < myJSONResult.results.length; i++) {
      //myAddress[i] = myJSONResult.results[i].formatted_address;


    } 
      //console.log(myAddress[0]);
      //this.props.router.push('/results');
      //SearchButtonActions.SearchRide();
  };
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Search For a Ride!</h1>
            <p><strong>Hi {this.props.authData.name}!</strong></p>
            <span>
              <li className="pure-menu-list">
              <li>
                <img src={pic} alt="" onClick={this.handleFindRide.bind(this)}/>
              </li>
              </li>
            </span>
          </div>  
        </div>
      </main>
    )
  }
}

export default SearchRide


