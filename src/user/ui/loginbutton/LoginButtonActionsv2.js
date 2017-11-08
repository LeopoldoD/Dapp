import RideContract from '../../../../build/contracts/RideContract.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract')

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user, email, phone) {
  return {
    type: USER_LOGGED_IN,
    payload: user, email, phone
  }
}

 export function verifyIdentity(){
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const ridecontract = contract(RideContract)
      ridecontract.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var rideInstance


        web3.eth.getCoinbase((error, pubaddress) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        ridecontract.deployed().then(function(instance) {
          rideInstance = instance
          console.log('attempting login');

          // authenticate user before login
          
          rideInstance.authenticateuser({from: pubaddress})
          .then(function(verify){
            console.log('user authenticated');

          // Attempt to login user.
          rideInstance.login({from: pubaddress})
          .then(function(result) {
            // If no error, login user.
            console.log('user loggedin');
            var userName = web3.toUtf8(result[0]);
            var userEmail = web3.toUtf8(result[1]);
            var userPhone = web3.toDecimal(result[2]);
          
            dispatch(userLoggedIn({"name": userName, "email": userEmail, "phone": userPhone}))

          console.log('end authenticate user');
            // Used a manual redirect here as opposed to a wrapper.
            // This way, once logged in a user can still access the home page.
            var currentLocation = browserHistory.getCurrentLocation()

            if ('redirect' in currentLocation.query)
            {
              return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }

            return browserHistory.push('/dashboard')
          }) //login

          .catch(function(result) {
            // If error, go to signup page.
            alert('Login error, please create an account');

            return browserHistory.push('/signup')
          })
        }) // authenticate user
        .catch(function(result) {
            // If error, go to signup page.
            alert('error authenticate user, invalid credentials');

            return browserHistory.push('/signup')
          });
        }) //authentication 
      }) //getcoinbase

    } //return
  } else {
    console.error('Web3 is not initialized.');
  }
} //loginUser
