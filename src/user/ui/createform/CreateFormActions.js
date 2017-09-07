import RideContract from '../../../../build/contracts/RideContract.json'
import { browserHistory } from 'react-router'
import store from '../../../store'
import {ipfs} from '../../../database/ipfs'

const contract = require('truffle-contract')

/*export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}
*/
//var db;
//let rideID = 0;

export function createRide(address, address2, seats, startDate, rideTime) {
 // let web3 = store.getState().web3.web3Instance
  console.log('Create a new ride');
  console.log(address);
  console.log(seats);
  console.log(startDate);
  console.log(rideTime);

//  ipfs('createnewride', address, address2, startDate, rideTime, seats);

  var ethUtil = require('ethereumjs-util');
  let web3 = store.getState().web3.web3Instance

  var coinbase = web3.eth.coinbase;
  console.log(coinbase);


  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the RideContract object.
      const ride = contract(RideContract)
      ride.setProvider(web3.currentProvider)
      console.log('provider:');
      console.log(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.
      var rideInstance


        web3.eth.getCoinbase((error, pubaddress) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }


        ride.deployed().then(function(instance) {
          rideInstance = instance


          console.log('attempting create');
       
          // Attempt to login user.
          rideInstance.createnewride(address, address2, startDate, rideTime, seats, 500, {from: pubaddress})
          .then(function(result) {
            // If no error, login user.
            console.log(result);
            //var rideID = web3.toDecimal(result[0]);
            //var from = web3.toUtf8(result[1]);
            //console.log(rideID);
            //console.log(from);

            //var rideFrom = web3.toUtf8(result[1]);
            //var rideFrom = web3.toUtf8(result[2]);
            //var rideDate = web3.toUtf8(result[3]);
            //var rideTime = web3.toUtf8(result[4]);
            //var rideSeats = web3.toDecimal(result[5]);
            //var rideCost = web3.toDecimal(result[6]);
            

            var currentLocation = browserHistory.getCurrentLocation()

            if ('redirect' in currentLocation.query)
            {
              return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }

            return browserHistory.push('/results')
          })
          .catch(function(result) {
            // If error, go to signup page.
            console.error('Wallet ' + pubaddress + ' does not have an account!')

            return browserHistory.push('/signup')
          })

         

      




        }) //create ride 






//      }) //signVerify
      }) //getcoinbase

    } //return
  } else {
    console.error('Web3 is not initialized.');
  }
  
} 

