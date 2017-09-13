import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import store from '../../../store'

const contract = require('truffle-contract')
/*
export const RIDE_CANCELLED = 'RIDE_CANCELLED'
function userUpdated(user, email, phone) {
  return {
    type: RIDE_CANCELLED,
    payload: selection
  }
}
*/
export function cancelRide(selection) {
  /*
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

          // Attempt to login user.
          authenticationInstance.update3(name, email, phone, {from: coinbase})
          .then(function(result) {
            // If no error, update user.
            console.log(result);
            console.log('with name and email');

            dispatch(userUpdated({"name": name, "email": email, "phone": phone}))

            return alert('Name, email and phone number updated!')
          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
  */
}
