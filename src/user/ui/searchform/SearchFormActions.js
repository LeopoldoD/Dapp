import React, { Component } from 'react'
import RideContract from '../../../../build/contracts/RideContract.json'
import Authentication from '../../../../build/contracts/Authentication.json'
import { browserHistory } from 'react-router'
import store from '../../../store'
//import {ipfs} from '../../../database/ipfs'
const contract = require('truffle-contract')

export var results = new Array();

export function searchRide(address, address2, startDate) {

  console.log('Print search ride results');
  console.log('From: '+address);
  console.log('To: '+address2);
  console.log('Date: '+startDate);

  var ethUtil = require('ethereumjs-util');
  let web3 = store.getState().web3.web3Instance
  console.log('web3 '+web3);

  var coinbase = web3.eth.coinbase;
  console.log(coinbase);

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the RideContract object.
      const ride = contract(RideContract)
      const authentication = contract(Authentication)
      ride.setProvider(web3.currentProvider)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var rideInstance
      var authenticationInstance

        web3.eth.getCoinbase((error, pubaddress) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

   		ride.deployed().then(function(instance) {
          rideInstance = instance
 	        
           console.log('attempting results');

        	var searchid;
          var searchresults = new Array;


      authentication.deployed().then(function(instance){
        authenticationInstance = instance
    

// Promises chained 

  function createsearchid(){
    var promise = new Promise(function(resolve, reject){

      rideInstance.createsearchid({from: pubaddress})
       .then(function(result){
         console.log(result);
        resolve({tx: result});
       })
      });   
    return promise;
  }

  function getsearchid(){
    var promise = new Promise(function(resolve, reject){
      rideInstance.getsearchid({from: pubaddress})
           .then(function(result2){
            console.log(result2);
            searchid = web3.toDecimal(result2);
            console.log('getsearchid: '+searchid);
            resolve({id: searchid});
      })  
    });   
    return promise;   
  }

  function countresults(){
    var promise = new Promise(function(resolve, reject){
      rideInstance.countresults(address, address2, startDate, searchid, {from: pubaddress})
          .then(function(result3){
            console.log(result3);
            var count = web3.toDecimal(result3[0]);
            var total = web3.toDecimal(result3[2]);
            var searchID = web3.toDecimal(result3[3]);
            console.log('results: '+count);
            console.log('records: '+total);
            console.log('searchid: '+searchID);

              for (var i=0; i< count; i++){
                searchresults.push(web3.toDecimal(result3[1][i]));
              }

               for (var j=0; j< count; j++){
                console.log(searchresults[j]);
              }

              if (count == 0){
                if (results.length > 0){
                  results = [];
                }
                redirection();
              }

              else {
                resolve({searchids: searchresults})
              }
       })    
    });   
    return promise;       
  }


  function returnride(){
    var promise = new Promise(function(resolve, reject){
    // Check if results contains data
      if (results.length >0 ){
          results = [];
      }

      for (var k=0;k<searchresults.length;k++){

          rideInstance.returnride(searchresults[k]-1, {from: pubaddress})
          .then(function(result4){
            console.log(result4);
            var rideID = web3.toDecimal(result4[0]);
            var rideFrom = web3.toUtf8(result4[1]);
            var rideTo = web3.toUtf8(result4[2]);
            var rideDate = web3.toUtf8(result4[3]);
            var rideTime = web3.toUtf8(result4[4]);
            var rideSeats = web3.toDecimal(result4[5]);
            var rideCost = web3.toDecimal(result4[6]);

            rideInstance.returndriverandseats(rideID-1, {from: pubaddress})
              .then(function(result5){

            var ridedriver = result5[0];
            var availableseats = web3.toDecimal(result5[1]);
            //authenticationInstance
            authenticationInstance.getuserinfo(ridedriver, {from: pubaddress})
            .then(function(result6){
              console.log(result6);

              var name = web3.toUtf8(result6[0]);
              var email = web3.toUtf8(result6[1]);
              var phone = web3.toDecimal(result6[2]);
              console.log('name: '+name);
              console.log('email: '+email);
              console.log('phone: '+phone);
      
            var res = {id: rideID, from: rideFrom, to: rideTo, date: rideDate, time: rideTime, seats: rideSeats, availableseats: availableseats, cost: rideCost, driver: ridedriver, resultnumber: results.length+1, drivername: name, driverphone: phone, driveremail: email}
          
            results.push(res);

            console.log('rideID: '+rideID);
            console.log('from: '+rideFrom);
            console.log('to: '+rideTo);
            console.log('date: '+rideDate);
            console.log('time: '+rideTime);
            console.log('seats: '+rideSeats);
            console.log('cost: '+rideCost);
            console.log('driver: '+ridedriver);
            console.log('availableseats: '+availableseats);

          if (results.length == 0){
           console.log('0 results'); 
           resolve({resultss: 'no results found'});
         }

         console.log('resultslenght '+results.length);
         console.log('searchresults length: '+searchresults.length);
          if (results.length == searchresults.length){
            resolve({resultss: results});
          }

          }) //end getuserinfo
          }) //end driver
          }) //end return ride
      }//for

    
   });   
   return promise;  
  }// returnride ends     

  function redirection(){ 
    var promise = new Promise(function(resolve, reject){
      var currentLocation = browserHistory.getCurrentLocation()
        if ('redirect' in currentLocation.query)
        {
           return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
        }
          console.log('redirecting');
           resolve({redirectiondone: 'completed'});
          return browserHistory.push('/results');
    });   
    return promise; 
  }     
      
    
createsearchid()
    .then(getsearchid)
    .then(countresults)
    .then(returnride)
    .then(redirection)
    .catch(function(error){
      console.log('Eror in Promises while searching for a ride'+error);
       var currentLocation = browserHistory.getCurrentLocation()
        if ('redirect' in currentLocation.query)
        {
           return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
        }
          console.log('redirecting');
          return browserHistory.push('/dashboard')
    })
    
  //end promised chained







/*
		rideInstance.createsearchid({from: pubaddress})
          .then(function(result){
            console.log(result);

          rideInstance.getsearchid({from: pubaddress})
           .then(function(result2){
            console.log(result2);
            var searchid = web3.toDecimal(result2);
            console.log('getsearchid: '+searchid);

       //   })// get searchid
  
		    rideInstance.countresults(address, address2, startDate, searchid, {from: pubaddress})
          .then(function(result3){
            console.log(result3);
            var count = web3.toDecimal(result3[0]);
            var total = web3.toDecimal(result3[2]);
            var searchID = web3.toDecimal(result3[3]);
            console.log('results: '+count);
            console.log('records: '+total);
            console.log('searchid: '+searchID);

           		for (var i=0; i< count; i++){
           			searchresults.push(web3.toDecimal(result3[1][i]));
           		}

           		 for (var j=0; j< count; j++){
           			console.log(searchresults[j]);
           		}

          for (var k=0;k<searchresults.length;k++){

          rideInstance.returnride(searchresults[k]-1, {from: pubaddress})
          .then(function(result4){
            console.log(result4);
            var rideID = web3.toDecimal(result4[0]);
            var rideFrom = web3.toUtf8(result4[1]);
            var rideTo = web3.toUtf8(result4[2]);
            var rideDate = web3.toUtf8(result4[3]);
            var rideTime = web3.toUtf8(result4[4]);
            var rideSeats = web3.toDecimal(result4[5]);
            var rideCost = web3.toDecimal(result4[6]);

            var res = {id: rideID, from: rideFrom, to: rideTo, date: rideDate, time: rideTime, seats: rideSeats, cost: rideCost};
            results.push(res);

            console.log(rideID);
            console.log(rideFrom);
            console.log(rideTo);
            console.log(rideDate);
            console.log(rideTime);
            console.log(rideSeats);
            console.log(rideCost);

*/



//        })
 //       }// returnride ends
   //     }) //countresults
     //   }) //get searchid
       // }) //create searchid 






/*
          .then(function (redirection){  
             var currentLocation = browserHistory.getCurrentLocation()
            if ('redirect' in currentLocation.query)
            {
              return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }
            console.log('rediredting...');
            return browserHistory.push('/results')
          }) // redirection
        

          .then(function (erase){

            console.log('delete array');
              //results =[];
          }) //erase 


        //    })// createsearchid   

          .catch(function(result) {
            // If error, go to signup page.
            console.log(result);
            console.error('Wallet ' + pubaddress + ' does not have an account!')


            return browserHistory.push('/signup')
          })
*/

 
      }) //deployed
  })//deployed2
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

