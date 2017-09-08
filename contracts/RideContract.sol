pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';

contract RideContract is Killable{
  struct Ride {
    uint id;
    bytes32 from;
    bytes32 to;
    bytes32 date;
    bytes32 time;
    uint seats;
    uint cost;
    address driver;
    address [] riders;
  }

  uint searchid;
  uint rideID;
  uint[] rideinstances;

  mapping (uint => Ride) private rides; 

   function returnride(uint rideID) constant returns (uint, bytes32, bytes32, bytes32, bytes32, uint, uint) {
   // Provide ride information
    return (rides[rideID].id, rides[rideID].from, rides[rideID].to, rides[rideID].date, rides[rideID].time, rides[rideID].seats, rides[rideID].cost);

   }

   function returndriver(uint rideID) constant returns (address) {
   // Provide driver address
    return (rides[rideID].driver);
   }


   function getContract() constant returns (address) {
    return this;
    }

    function createnewride(bytes32 from, bytes32 to, bytes32 date, bytes32 time, uint seats, uint cost) payable returns (uint) {
    // Check if parameters exist.

    if (from == 0x0 || to == 0x0 || date== 0x0 || time == 0x0 || seats == 0x0 || cost == 0x0)
    {
        throw;
    }
    
    rideID++;
    rides[rideID-1].id = rideID;
    rides[rideID-1].from =from;
    rides[rideID-1].to = to;
    rides[rideID-1].date = date;
    rides[rideID-1].time = time;
    rides[rideID-1].seats = seats;
    rides[rideID-1].cost = cost;
    rideinstances.push(rideID);
    rides[rideID-1].driver = msg.sender;

    return (rideID);
   }

   function getlength() constant returns (uint){
    uint total;
    total = rideID;
    return (total);
   }

   function getrideinstances() constant returns (uint){
    uint iter;
        for (iter = 0; iter < rideinstances.length; iter++){
            return (rideinstances[iter]);
        }
   }

   function createsearchid() payable {
    searchid++;
   }

   function getsearchid() constant returns (uint) {
    return searchid;
   }

   function countresults(bytes32 from, bytes32 to, bytes32 date, uint id) constant returns (uint, uint[], uint, uint) {
    uint[] memory results = new uint[](10);
    uint total;
    uint iter;
    uint count;
    uint tempid;

    total = rideID;

        for (iter = 0; iter < rideinstances.length; iter++){
         if (rides[iter].from == from && rides[iter].to == to && rides[iter].date == date){
               tempid = rides[iter].id;
               results[count] = tempid;
               count++;
         }
        }
     return (count, results, total, id);
    }
  
}
