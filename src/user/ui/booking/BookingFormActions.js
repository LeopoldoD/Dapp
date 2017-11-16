import RideContract from '../../../../build/contracts/RideContract.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract')

export function bookRide(id, seats) {
  console.log('Results');
  console.log('Id: '+id);
  console.log('Seats: '+seats);

  let web3 = store.getState().web3.web3Instance

  var coinbase = web3.eth.coinbase;
  console.log(coinbase);


  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the RideContract object.
      const ride = contract(RideContract)
      ride.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var rideInstance

        web3.eth.getCoinbase((error, pubaddress) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        ride.deployed().then(function(instance) {
          rideInstance = instance

          console.log('attempting book');

          // check if seats are available
            rideInstance.checkseatsandcost(id, seats, {from: pubaddress})
          .then(function(result){
            console.log(result);
            var availableseats = web3.toDecimal(result[0]);
            var totalcost = web3.toDecimal(result[1]);
            console.log('seats available: '+availableseats);
            console.log('totalcost: '+totalcost);

            if (seats > availableseats){
              return alert ('Invalid number of seats selected');
            }

           rideInstance.prebook(id, seats, {from: pubaddress})
          .then(function(result2){
            console.log(result2);

            var contractaddress;
            rideInstance.getcontractaddress({from: pubaddress})
            .then(function(contract){
              console.log(contract)
              contractaddress = contract;

            web3.eth.sendTransaction({
            from: pubaddress,
            to: contractaddress,
            value: web3.toWei(totalcost, 'finney') 
              }, function(error, result3) {
                if (!error) {
                  console.log('Ride paid!')
                } 
                else {
                  console.log('Error sending transaction: '+error);
                }
                console.log(result3);

            /*  rideInstance.test({from:pubaddress}).then(function(test){
                var coolcounter = web3.toDecimal(test[1]);
                var coolcounter2 = web3.toDecimal(test[2]);
                var coolcounter3 = web3.toDecimal(test[3]);
                var coolcounter4 = web3.toDecimal(test[4]);
                var cool = web3.toDecimal(test[5]);
                console.log(test);
*/
            var currentLocation = browserHistory.getCurrentLocation()

            if ('redirect' in currentLocation.query)
            {
              return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }

            return browserHistory.push('/dashboard')

          }) // Send transaction

          }) // getcontractaddress
        .catch(function(e){
            alert('Error getting contract address '+e);
        });

          }) // prebook
        .catch(function(e){
            alert('Error at prebooking: '+e);
        });

          }) //check seats and cost
          .catch(function(e){
            alert('Error at checkseatsandcost: '+e);
          });

        }) //deployed 
        // Error deployed
          .catch(function(result) {
            // If error, go to signup page.
            console.log('error with deployer: '+result);
            //console.error('Wallet ' + pubaddress + ' does not have an account!')

            return browserHistory.push('/signup')
          })
      }) //getcoinbase

    } //return
  } else {
    console.error('Web3 is not initialized.');
  }
} 