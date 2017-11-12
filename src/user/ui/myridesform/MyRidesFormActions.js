import RideContract from '../../../../build/contracts/RideContract.json'
import store from '../../../store'

const contract = require('truffle-contract')

export var resmyrides = [];
export var resdriving = [];

export var getMyRides = function(callback) { 
  let web3 = store.getState().web3.web3Instance

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
      ride.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var rideInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        ride.deployed().then(function(instance) {
          rideInstance = instance

          rideInstance.getrides({from: coinbase})
          .then(function(result) {
            console.log(result);

            // First get Driving results
            var drivingnumber = web3.toDecimal(result[0]);
            console.log('drivingnumber: '+drivingnumber);
            if (drivingnumber === 0){
              console.log('Finish loading results, no rides driving..');
            }

            if (drivingnumber !== undefined && drivingnumber !== 0) {
              var driving = [];
              for (var i =0; i< drivingnumber; i++){
                driving.push(web3.toDecimal(result[1][i]));
              }
              console.log('driving: '+driving);
            }

            function ride(k){

            rideInstance.returnride(driving[k], {from: coinbase})
             .then(function(result2){
              console.log(result2);
              var rideID = web3.toDecimal(result2[0]);
              var rideFrom = result2[1];
              var rideTo = result2[2];
              var rideDate = web3.toUtf8(result2[3]);
              var rideTime = web3.toUtf8(result2[4]);
              var rideSeats = web3.toDecimal(result2[5]);

            rideInstance.returnride2(rideID, {from: coinbase})
              .then(function(result3){

              var ridedriver = result3[0];
              var availableseats = web3.toDecimal(result3[1]);
              var ridemeetingpoint = result3[2];
              var rideCost = web3.toDecimal(result3[3]);

             var res = {id: rideID, from: rideFrom, to: rideTo, date: rideDate, time: rideTime, seats: rideSeats, availableseats: availableseats, cost: rideCost, driver:ridedriver, resultnumber: resdriving.length+1, meetingpoint: ridemeetingpoint}
          
            resdriving.push(res);

  
          }) //returnride2
          }) //returnride    
          } //function
       
       if(driving!==0 && driving!== undefined){

       driving.forEach(function(listItem, index){
        console.log('listitem: '+listItem);
        console.log('index: '+index);
        ride(index, function(err, response) {
                   console.log('Done');
       });
      });

     } //if


          // Second, get Myrides result
    //    ride.deployed().then(function(instance){
    //     rideInstance = instance
            var myridesnumber = web3.toDecimal(result[2]);
            var mybookingnumber = web3.toDecimal(result[4]);
            console.log('myridesnumber:'+myridesnumber);
            console.log('mybookingnumber: '+mybookingnumber);

            if (myridesnumber === 0){
              console.log('Finish loading results, no my rides found..');
            }

            if (mybookingnumber === 0){
              console.log('Finish loading booking, no bookings found..');
            }

            if (myridesnumber !== undefined && myridesnumber !== 0) {
              var myrides = [];
              for (var counter=0; counter< myridesnumber; counter++){
                myrides.push(web3.toDecimal(result[3][counter]));
              }
              console.log('myrides: '+myrides);
            }

            if (mybookingnumber !== undefined && mybookingnumber !== 0) {
              var mybookings = [];
              for (var counter2=0; counter2< mybookingnumber; counter2++){
                mybookings.push(web3.toDecimal(result[5][counter2]));
              }
              console.log('mybookings: '+mybookings);
            }


      function ride2(k){
        rideInstance.returnbooking(k, {from:coinbase})
            .then(function(result8, error){
              var bookingstatus;
              var bookingrideid = web3.toDecimal(result8[0]);
              if (result8[1] !== undefined){
                if (result8[1] === true){
                  bookingstatus = 'Paid';
                }
                else {
                  bookingstatus = 'Not Paid';
                }
              }  
 
              var bookingseats = web3.toDecimal(result8[2]);
              var bookingcost = web3.toDecimal(result8[3]);
              var bookingid = web3.toDecimal(result8[4]);
              console.log(result8);
              console.log('bookingrideid: '+bookingrideid);
              console.log('bookig status: '+bookingstatus);
              console.log('booking seats: '+bookingseats);
              console.log('booking totalcost: '+bookingcost);
              console.log('booingid: '+ bookingid);

              if (error) {
                console.log('error: '+error);
              }

       rideInstance.returnride(bookingrideid, {from: coinbase})
          .then(function(result4){
            console.log(result4);
            var rideID = web3.toDecimal(result4[0]);
            var rideFrom = result4[1];
            var rideTo = result4[2];
            var rideDate = web3.toUtf8(result4[3]);
            var rideTime = web3.toUtf8(result4[4]);
            var rideSeats = web3.toDecimal(result4[5]);

            rideInstance.returnride2(rideID, {from: coinbase})
              .then(function(result5){

            var ridedriver = result5[0];
            //var availableseats = web3.toDecimal(result5[1]);
            var ridemeetingpoint = result5[2];
            //var rideCost = web3.toDecimal(result5[3]);
            
           rideInstance.getuserinfo(ridedriver, {from: coinbase})
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

            
             var res2 = {id: rideID, from: rideFrom, to: rideTo, date: rideDate, time: rideTime, seats: rideSeats, seatsbooked: bookingseats, status: bookingstatus, paid: bookingcost, driver:ridedriver, resultnumber: resmyrides.length+1, drivername: name, driverphone: phone, driveremail: email, meetingpoint: ridemeetingpoint}
            resmyrides.push(res2);

            if (resmyrides.length === 0){
             console.log('0 results'); 
            }

            console.log('resmyrides lenth '+resmyrides.length);
            console.log('myridesnumber length: '+myridesnumber.length);


        //  })// returnbooking
          }) // getuserinfo
          }) // returnride2
          }) // returnride 
          }) // Event returnbookingid

    } //ride2

      if(mybookings!==0 && mybookings!== undefined){
       mybookings.forEach(function(listItem, index){
        console.log('listitem: '+listItem);
        console.log('index: '+index);
        ride2(listItem, function(err, response) {
                   console.log('Done');
       });
      });
      } //if

          }) //get rides

          .catch(function(result) {
            console.log('Error: '+result);
            // If error...
          })

        }) //deployed
      }) //get coinbase
    } //return 

  } else {
    console.error('Web3 is not initialized.');
  }
  return(resmyrides, resdriving);
}
