import React, { Component } from 'react'
import RideContract from '../../../../build/contracts/RideContract.json'
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
  var searchresults = new Array;
 

/*

// Promises

  var searchstarted = true;

const willCreateSearchID = new Promise(
    (resolve, reject) => { // fat arrow
        if (searchstarted) {
        console.log('Will create search ID ' +searchstarted);
         const createsearchid = () =>
           rideInstance.createsearchid({from: pubaddress})
           .then(function(result){
             console.log(result);
          }); // close createsearchid
      resolve(createsearchid());
      }
      else {
        const reason = new Error('searchid not created');
        reject (reason);
      }
      }
      );    

const getSearchID = function (){
  rideInstance.getsearchid({from: pubaddress})
  .then(function(result2){
   console.log(result2);
   searchid = web3.toDecimal(result2);
   console.log('getsearchid: '+searchid);
  }); 
  return Promise.resolve(getSearchID());
}

const countResults = function (){
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
      
    });   
   return Promise.resolve(countResults());
}

// call promise
const askSearchID = function () {
  console.log('Before creating searchid');
    willCreateSearchID
        .then(countResults)
        .then(getSearchID)
        .then(fulfilled => console.log(fulfilled)) // fat arrow
        .catch(error => console.log(error.message)); // fat arrow

        console.log('After creating searchid');
};

askSearchID();

*/





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

            rideInstance.returndriver(rideID-1, {from: pubaddress})
              .then(function(result5){

            var ridedriver = result5;

            var res = {id: rideID, from: rideFrom, to: rideTo, date: rideDate, time: rideTime, seats: rideSeats, cost: rideCost, driver:ridedriver, resultnumber: results.length+1}
          
            results.push(res);

            console.log(rideID);
            console.log(rideFrom);
            console.log(rideTo);
            console.log(rideDate);
            console.log(rideTime);
            console.log(rideSeats);
            console.log(rideCost);
            console.log(ridedriver);

          if (results.length == 0){
           console.log('0 results'); 
           resolve({resultss: 'no results found'});
         }

         console.log('resultslenght '+results.length);
         console.log('searchresults length: '+searchresults.length);
          if (results.length == searchresults.length){
            resolve({resultss: results});
          }

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
    .catch(function(result){
      console.log('Eror in Promises while searching for a ride'+result);
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




export class PostResult extends Component {
  constructor( props, context ) {
    super( props, context );

    this.handleSubmit = this.handleSubmit.bind( this );
  }
    handleSubmit( event ) {
        event.preventDefault();
        this.props.appendResult( this.rideidInput.value, this.fromInput.value, this.toInput.value );
        this.rideidInput.value = '';
        this.fromInput.value = '';
        this.toInput.value = '';     
    } 
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                       ref={id => this.rideidInput = id}
                       ref={from => this.fromInput = from}
                       ref={to => this.toInput = to}
            
            </form>
        );
    }
}

export class Result extends Component {
    render() {
        let id = this.props.rideid;
        let from = this.props.from;
        let to = this.props.to;
 
        return (
            <div className="result">
                <span className="result-rideid">{this.props.rideid}</span>&nbsp; 
                <strong className="result-from">{this.props.from}</strong>&nbsp;
                <span className="result-to">{this.props.to}</span>
            </div>
        );
    }
}

export class ResultList extends Component {
    render() {
        return (
            <div>
                { 
                    this.props.results.map( result => 
                        <Result rideid={result.rideid}
                                 from={result.from}
                                 to={result.to}
                                 key={result.id} />
                      )
                }
            </div>
        );
    }
}

export class ResultsBox extends Component {
    constructor( props, context ) {
        super( props, context );
        this.state = {
            results: []
        };

        this.appendResult = this.appendResult.bind( this );
    }
    appendResult( rideid, from, to ) {
        let newResult = {
            id: this.state.results.length + 1,
            rideid: rideid,
            from: from,
            to: to
        }; 
        this.setState({ results: [ ...this.state.results, newResult ] });
    }    

    render() {
        return (
            <div>
                <ResultList results={this.state.results} />
                <PostResult appendResult={this.appendResult} />
            </div>
        );
    }
}



