import RideContract from '../../../../build/contracts/RideContract.json'
import { browserHistory } from 'react-router'
import store from '../../../store'
import {ipfs} from '../../../database/ipfs'

const contract = require('truffle-contract')


export function bookRide(id, seats) {
  console.log('Results');
  console.log('Id: '+id);
  console.log('Seats: '+seats);

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
            rideInstance.getavailableseats(id, {from: pubaddress})
          .then(function(result){
            console.log(result);
            var availableseats = web3.toDecimal(result);
            console.log('seats available: '+availableseats);

            if (seats > availableseats){
              return alert ('Invalid number of seats selected');
            }

          var cost;
          var driver;
          var totalcost;

           rideInstance.verifybooking(id, seats, {from: pubaddress})
          .then(function(result){
            console.log(result);
            driver = result[0];
            cost = web3.toDecimal(result[1]);
            totalcost = cost*seats;
              console.log("to: "+driver);
              console.log('cost: '+cost);
              console.log("totalcost: "+totalcost);

            web3.eth.sendTransaction({
            from: pubaddress,
            to:  driver,
            value: web3.toWei(totalcost, 'ether')
              }, function(error, result2) {
                if (!error) {
                  console.log('Ride paid!')
                } 
                else {
                  console.log('Error: '+error);
                }

          rideInstance.bookride(id, seats, {from: pubaddress, gas: 440000})
          .then(function(result2){
            console.log(result2);
            console.log('Ride booked!')
/*
          var book = rideInstance.Bookride({fromBlock: 0, toBlock: 'latest'});
            book.watch(function(err, result3) {
            if(err) {
              console.log('Error booking ride');
              console.log(err);
               return;
             }
              console.log(result3);
              driver = result3.args.to;
              cost = result3.args.cost;
              totalcost = cost*seats;
              console.log("to: "+driver);
              console.log('cost: '+cost);
              console.log("totalcost: "+totalcost);
*/
            var currentLocation = browserHistory.getCurrentLocation()

            if ('redirect' in currentLocation.query)
            {
              return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }

            return browserHistory.push('/dashboard')

          })//Bookride watch event
          .catch(function(e){
            console.log('Book ride watch event error: '+e);
          });

          }) //Book ride
          .catch(function(e){
            console.log('Book ride function error: '+e);
          });

          }); //send transaction

          }) //get available seats
          .catch(function(e){
            console.log('Get available seats error: '+e);
          });

        }) //deployed 
        // Error deployed
          .catch(function(result) {
            // If error, go to signup page.
            console.log('error'+result);
            console.error('Wallet ' + pubaddress + ' does not have an account!')

            return browserHistory.push('/signup')
          })
      }) //getcoinbase

    } //return
  } else {
    console.error('Web3 is not initialized.');
  }
  
} 