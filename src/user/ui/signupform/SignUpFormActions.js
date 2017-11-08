import RideContract from '../../../../build/contracts/RideContract.json'
import { verifyIdentity } from '../loginbutton/LoginButtonActionsv2'
import store from '../../../store'

const contract = require('truffle-contract')

export function signUpUser(name, email, phone) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const ride = contract(RideContract)
      ride.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var rideInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        //coinbase is the ethereum address
        if (error) {
          console.error(error);
        }

        console.log(ride.deployed());

        ride.deployed().then(function(instance) {
          rideInstance = instance
        
          console.log('attempting signup');
          // Attempt to sign up user.
          rideInstance.signup(name, email, phone, {from: coinbase})
          .then(function(result) {
            // If no error, login user.
            console.log('will login User');
            return dispatch(verifyIdentity())
          })
          .catch(function(result) {
            // If error...
          alert('error signing up');
          })
        }) 


      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
