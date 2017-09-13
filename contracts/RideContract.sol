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
    uint availableseats;
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

   function returndriverandseats(uint rideID) constant returns (address, uint) {
   // Provide driver address
    return (rides[rideID].driver, rides[rideID].availableseats);
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
    rides[rideID-1].availableseats = seats;

    return (rideID);
   }

   function getavailableseats(uint id) constant returns (uint){
    uint seats = rides[id-1].availableseats;
    return(seats);
   }

   function bookride(uint id, uint seats) payable returns (uint) {
   // Check if id was entered
    if (id == 0x0){
      throw;
    }

    //Validate number of seats
    if (seats > rides[id-1].availableseats){
      throw;
    }

    // Check if driver wants to book its own ride
    if (msg.sender == rides[id-1].driver){
      throw;
    }

    address driver = rides[id-1].driver;
    uint costperperson = rides[id-1].cost;  
    // update the number of available seats
    rides[id-1].availableseats -= seats;
    // add the address of the riders 
    rides[id-1].riders.push(msg.sender);

    Bookride(driver, costperperson, rides[id-1].riders);

    return (rides[id-1].availableseats);
   }

   event Bookride (address to, uint cost, address[] riders);

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
