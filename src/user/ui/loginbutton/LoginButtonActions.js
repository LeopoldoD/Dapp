import AuthenticationContract from '../../../../build/contracts/Authentication.json'
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

export function loginUser() {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance
          console.log('attempting login');
       
          // Attempt to login user.
          authenticationInstance.login2({from: coinbase})
          .then(function(result) {
            // If no error, login user.
            console.log(result);
            var userName = web3.toUtf8(result[0]);
            var userEmail = web3.toUtf8(result[1]);
            var userPhone = web3.toUtf8(result[2]);
            

            dispatch(userLoggedIn({"name": userName, "email": userEmail, "phone": userPhone}))

            // Used a manual redirect here as opposed to a wrapper.
            // This way, once logged in a user can still access the home page.
            var currentLocation = browserHistory.getCurrentLocation()

            if ('redirect' in currentLocation.query)
            {
              return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }

            return browserHistory.push('/dashboard')
          })
          .catch(function(result) {
            // If error, go to signup page.
            console.error('Wallet ' + coinbase + ' does not have an account!')

            return browserHistory.push('/signup')
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
