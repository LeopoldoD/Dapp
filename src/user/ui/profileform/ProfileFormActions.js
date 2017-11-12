//import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import RideContract from '../../../../build/contracts/RideContract.json'
import store from '../../../store'

const contract = require('truffle-contract')

export const USER_UPDATED = 'USER_UPDATED'
function userUpdated(user, email, phone) {
  return {
    type: USER_UPDATED,
    payload: user, email, phone
  }
}

export function updateUser(name, email, phone) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the ride object.
      const ride = contract(RideContract)
      ride.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on RideContract.
      var rideInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        ride.deployed().then(function(instance) {
          rideInstance = instance

          // Return owner  
/*          rideInstance.returnOwner({from: coinbase}).then(function(owner, error){    
          console.log('owner: '+owner); 

          // Get contract balance
          rideInstance.getcontractbalance({from: coinbase}).then(function(balance){
            var contractbalance = web3.toDecimal(balance);
            console.log(contractbalance);
*/

          // Attempt to update user
          rideInstance.update(name, email, phone, {from: coinbase})
          .then(function(result) {
            // If no error, update user.
            console.log(result);
            console.log('with name and email');

            dispatch(userUpdated({"name": name, "email": email, "phone": phone}))

            return alert('Name, email and phone number updated!')
          }) // update
        //   }) // owner
          .catch(function(error){
            console.log('error ownable: '+error);
          })
        //}) // getcontracbalance
          .catch(function(result) {
            // If error...
          })

      })
      }) //coinbase
    } //return
  } else {
    console.error('Web3 is not initialized.');
  }
}
