import RideContract from '../../../../build/contracts/RideContract.json'
import Authentication from '../../../../build/contracts/Authentication.json'
import store from '../../../store'
import { browserHistory } from 'react-router'

const contract = require('truffle-contract')

/*
export const RIDES_LOADED = 'RIDES_LOADED'
function ridesLoaded(resdriving, resmyrides) {
  return {
    type: RIDES_LOADED,
    payload: resdriving, resmyrides
  }
}
*/

export var resmyrides = new Array();
export var resdriving = new Array();

export var getMyRides = function(callback) { 
  console.log('Get my rides');
  var ethUtil = require('ethereumjs-util');
  let web3 = store.getState().web3.web3Instance
  var coinbase = web3.eth.coinbase;
  console.log(coinbase);

  if (resdriving.length > 0){
    resdriving = [];
  }
  if (resmyrides.length > 0){
    resmyrides = [];
  }

  // Double-check web3's status.

  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const ride = contract(RideContract)
      const authentication = contract(Authentication)

      ride.setProvider(web3.currentProvider)
      authentication.setProvider(web3.currentProvider)
      console.log(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.
      var rideInstance
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        ride.deployed().then(function(instance) {
          rideInstance = instance

          // Get member data
          console.log('Get member data');

          console.log('pubaddress: '+coinbase);

          rideInstance.getrides({from: coinbase})
          .then(function(result) {
            console.log(result);

            // First get Driving results
            var drivingnumber = web3.toDecimal(result[0]);
            console.log('drivingnumber: '+drivingnumber);

            if (drivingnumber !== undefined && drivingnumber !== 0) {
              var driving = new Array();
              for (var i =0; i< drivingnumber; i++){
                driving.push(web3.toDecimal(result[1][i]));
              }
              console.log('driving: '+driving);
            }

            for (var k=0;k<drivingnumber;k++){
             rideInstance.returnride((driving[k])-1, {from: coinbase})
             .then(function(result2){
              console.log(result2);
              var rideID = web3.toDecimal(result2[0]);
              var rideFrom = web3.toUtf8(result2[1]);
              var rideTo = web3.toUtf8(result2[2]);
              var rideDate = web3.toUtf8(result2[3]);
              var rideTime = web3.toUtf8(result2[4]);
              var rideSeats = web3.toDecimal(result2[5]);
              var rideCost = web3.toDecimal(result2[6]);

            rideInstance.returndriverandseats(rideID-1, {from: coinbase})
              .then(function(result3){

              var ridedriver = result3[0];
              var availableseats = web3.toDecimal(result3[1]);

             var res = {id: rideID, from: rideFrom, to: rideTo, date: rideDate, time: rideTime, seats: rideSeats, availableseats: availableseats, cost: rideCost, driver:ridedriver, resultnumber: resdriving.length+1}
          
            resdriving.push(res);

            console.log('rideID: '+rideID);
            console.log('from: '+rideFrom);
            console.log('to: '+rideTo);
            console.log('date: '+rideDate);
            console.log('time: '+rideTime);
            console.log('seats: '+rideSeats);
            console.log('cost: '+rideCost);
            console.log('driver: '+ridedriver);
            console.log('availableseats: '+availableseats);


            console.log('resdrivinglength '+resdriving.length);

          }) //returndriver and seats
          }) //return ride    

          } //loop


          // Second, get Myrides result
        authentication.deployed().then(function(instance){
         authenticationInstance = instance
     
            var myridesnumber = web3.toDecimal(result[2]);
            console.log('myridesnumber:'+myridesnumber);

            if (myridesnumber == 0){
              console.log('Finish loading results, no my rides found..');
             // dispatch(ridesLoaded({"driving": resdriving, "myrides": resmyrides}))
            }

            if (myridesnumber !== undefined && myridesnumber !== 0) {
              var myrides = new Array();
              for (var i =0; i< myridesnumber; i++){
                myrides.push(web3.toDecimal(result[3][i]));
              }
              console.log('myrides: '+myrides);
            }

            for (var k=0;k<myridesnumber;k++){
             rideInstance.returnride((myrides[k])-1, {from: coinbase})
             .then(function(result4){
              console.log(result4);
              var rideID = web3.toDecimal(result4[0]);
              var rideFrom = web3.toUtf8(result4[1]);
              var rideTo = web3.toUtf8(result4[2]);
              var rideDate = web3.toUtf8(result4[3]);
              var rideTime = web3.toUtf8(result4[4]);
              var rideSeats = web3.toDecimal(result4[5]);
              var rideCost = web3.toDecimal(result4[6]);

            rideInstance.returndriverandseats(rideID-1, {from: coinbase})
              .then(function(result5){

              var ridedriver = result5[0];
              var availableseats = web3.toDecimal(result5[1]);

               //authenticationInstance
            authenticationInstance.getuserinfo(ridedriver, {from: coinbase})
            .then(function(result6){
              console.log(result6);

              var name = web3.toUtf8(result6[0]);
              var email = web3.toUtf8(result6[1]);
              var phone = web3.toDecimal(result6[2]);
              console.log('name: '+name);
              console.log('email: '+email);
              console.log('phone: '+phone);

             var res2 = {id: rideID, from: rideFrom, to: rideTo, date: rideDate, time: rideTime, seats: rideSeats, availableseats: availableseats, cost: rideCost, driver:ridedriver, resultnumber: resmyrides.length+1, drivername: name, driverphone: phone, driveremail: email}
          
            resmyrides.push(res2);

            console.log('rideID: '+rideID);
            console.log('from: '+rideFrom);
            console.log('to: '+rideTo);
            console.log('date: '+rideDate);
            console.log('time: '+rideTime);
            console.log('seats: '+rideSeats);
            console.log('cost: '+rideCost);
            console.log('driver: '+ridedriver);
            console.log('availableseats: '+availableseats);

            console.log('resmyrideslength '+resmyrides.length);

           console.log('Finish loading all results..');
           //dispatch(ridesLoaded({"driving": resdriving, "myrides": resmyrides}))

          }) //get userinfo
          }) //returndriver and seats
          }) //return ride    
          } //loop


          }) //get rides

        
          .catch(function(result) {
            console.log('Error: '+result);
            // If error...
          })

        }) //deployed
        }) //deployed2
        console.log('last thing?');
      }) //get coinbase
    } //return 

  } else {
    console.error('Web3 is not initialized.');
  }
  console.log('Calling callback');
  return(resmyrides, resdriving);
}
