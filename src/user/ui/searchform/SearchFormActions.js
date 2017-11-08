import RideContract from '../../../../build/contracts/RideContract.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract')

export var results = [];

export function searchRide(address, address2, startDate) {

  console.log('Print search ride results');
  console.log('From: '+address);
  console.log('To: '+address2);
  console.log('Date: '+startDate);

  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the RideContract object.
      const ride = contract(RideContract)
      ride.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Ride.
      var rideInstance

        web3.eth.getCoinbase((error, pubaddress) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

   		ride.deployed().then(function(instance) {
          rideInstance = instance
 	        
           console.log('attempting results');

        	var searchid;
          var searchresults = [];

      ride.deployed().then(function(instance){
        rideInstance = instance
    

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

              if (count === 0){
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
      console.log('before loop');


      function ride2(k){
       rideInstance.returnride(searchresults[k], {from: pubaddress})
          .then(function(result4){
            console.log(result4);
            var rideID = web3.toDecimal(result4[0]);
            var rideFrom = result4[1];
            var rideTo = result4[2];
            var rideDate = web3.toUtf8(result4[3]);
            var rideTime = web3.toUtf8(result4[4]);
            var rideSeats = web3.toDecimal(result4[5]);

            rideInstance.returnride2(rideID, {from: pubaddress})
              .then(function(result5){

            var ridedriver = result5[0];
            var availableseats = web3.toDecimal(result5[1]);
            var ridemeetingpoint = result5[2];
            var rideCost = web3.toDecimal(result5[3]);
            console.log(result5);
            
           rideInstance.getuserinfo(ridedriver, {from: pubaddress})
            .then(function(result6, error){
              console.log(result6);

              var name = web3.toUtf8(result6[0]);
              var email = web3.toUtf8(result6[1]);
              var phone = web3.toDecimal(result6[2]);
              console.log('name: '+name);
              console.log('email: '+email);
              console.log('phone: '+phone);

      
            if (error){
                alert('User is not a member, please create an account');
              } 
     
            var res = {id: rideID, from: rideFrom, to: rideTo, date: rideDate, time: rideTime, seats: rideSeats, availableseats: availableseats, cost: rideCost, driver: ridedriver, resultnumber: results.length+1, drivername: name, driverphone: phone, driveremail: email, meetingpoint: ridemeetingpoint}
          
            results.push(res);


            if (results.length === 0){
               console.log('0 results'); 
               resolve({resultss: 'no results found'});
            }

            console.log('resultslenght '+results.length);
            console.log('searchresults length: '+searchresults.length);
            if (results.length === searchresults.length){
              resolve({resultss: results});
            }

          })
          })
          })  
    }

       searchresults.forEach(function(listItem, index){
        console.log('listitem: '+listItem);
        console.log('index: '+index);
        ride2(index, function(err, response) {
       });
      });

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
    .catch(function(error){
      console.log('error in get searchid');
    })
    .then(countresults)
    .catch(function(error){
      console.log('error in countresults');
    })
    .then(returnride)
    .catch(function(error){
      console.log('error in returnride');
    })
    .then(redirection)
    .catch(function(error){
      console.log('Eror in Promises while searching for a ride');
       var currentLocation = browserHistory.getCurrentLocation()
        if ('redirect' in currentLocation.query)
        {
           return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
        }
          console.log('redirecting');
          return browserHistory.push('/dashboard')
    })
    

 
  }) //deployed
  })//deployed2
   	})// get coinbase

    } //return
  } else {
    console.error('Web3 is not initialized.');
  }
  
}	

