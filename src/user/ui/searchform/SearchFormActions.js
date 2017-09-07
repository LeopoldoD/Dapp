import RideContract from '../../../../build/contracts/RideContract.json'
import { browserHistory } from 'react-router'
import store from '../../../store'
//import {ipfs} from '../../../database/ipfs'
const contract = require('truffle-contract')

export function searchRide(address, address2, startDate) {

  console.log('Print search ride results');
  console.log('From: '+address);
  console.log('To: '+address2);
  console.log('Date: '+startDate);

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
 	
           console.log('attempting results');

//Works getlength!
/*

		rideInstance.getlength({from: pubaddress})
          .then(function(result){
            console.log(result);
            var longitud = web3.toDecimal(result);
            console.log(longitud);
*/
	var searchid;

		rideInstance.createsearchid({from: pubaddress})
          .then(function(result){
            console.log(result);

        rideInstance.getsearchid({from: pubaddress})
           .then(function(result3){
            console.log(result3);
            var searchid = web3.toDecimal(result3);
            console.log(searchid);

		rideInstance.countresults(address, address2, startDate, searchid, {from: pubaddress})
          .then(function(result2){
            console.log(result2);
            var rideID2 = web3.toDecimal(result2[0]);
            var rideID5 = web3.toDecimal(result2[2]);
            var rideID6 = web3.toDecimal(result2[3]);
            console.log('results: '+rideID2);
            console.log('records: '+rideID5);
            console.log('searchid: '+rideID6);
            
            var searchresults = new Array;

           		for (var i=0; i< rideID2; i++){
           			searchresults.push(web3.toDecimal(result2[1][i]));
           			//console.log(searchresults[i]);
           		}

           		 for (var i=0; i< rideID2; i++){
           			console.log(searchresults[i]);
           			//console.log(searchresults[i]);
           		}

	
		})
        })

/*
          rideInstance.returnride(test, {from: pubaddress})
          .then(function(result){
            console.log(result);
            var rideID2 = web3.toDecimal(result[0]);
            var rideFrom = web3.toUtf8(result[1]);
            var rideTo = web3.toUtf8(result[2]);
            var rideDate = web3.toUtf8(result[3]);
            var rideTime = web3.toUtf8(result[4]);
            var rideSeats = web3.toDecimal(result[5]);
            var rideCost = web3.toDecimal(result[6]);
  
            console.log(rideID2);
            console.log(rideFrom);
            console.log(rideTo);
            console.log(rideDate);
            console.log(rideTime);
            console.log(rideSeats);
            console.log(rideCost);
     */
     //})
         
      //  })
            var currentLocation = browserHistory.getCurrentLocation()

            if ('redirect' in currentLocation.query)
            {
              return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }

            return browserHistory.push('/results')
          }) //rideinstance


          .catch(function(result) {
            // If error, go to signup page.
            console.log(result);
            console.error('Wallet ' + pubaddress + ' does not have an account!')


            return browserHistory.push('/signup')
          })

      }) //deployed
   	})// get coinbase

    } //return
  } else {
    console.error('Web3 is not initialized.');
  }
  
}	



/*
//  ipfs('searchride', address, address2, startDate);

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
          console.log('attempting search');
       
          // Attempt to login user.
          rideInstance.searchrides({from: pubaddress})
          .then(function(result) {
            // If no error, login user.
            console.log(result);
            var rideID = web3.toDecimal(result[0]);
            var rideFrom = web3.toUtf8(result[1]);
            var rideFrom = web3.toUtf8(result[2]);
            var rideDate = web3.toUtf8(result[3]);
            var rideTime = web3.toUtf8(result[4]);
            var rideSeats = web3.toDecimal(result[5]);
            var rideCost = web3.toDecimal(result[6]);;
            

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
        }) //authentication 
//      }) //signVerify
      }) //getcoinbase

    } //return
  } else {
    console.error('Web3 is not initialized.');
  }
  */







