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
  }
  uint rideID;
  mapping (uint => Ride) private rides; 


  function createride(bytes32 from, bytes32 to, bytes32 date, bytes32 time, uint seats, uint cost) constant returns (uint, bytes32) {
    // Check if parameters exist.

    if (from == 0x0 || to == 0x0 || date== 0x0 || time == 0x0 || seats == 0x0 || cost == 0x0)
    {
        throw;
    }

    rides[rideID].id = rideID;
    rides[rideID].from =from;
    rides[rideID].to = to;
    rides[rideID].date = date;
    rides[rideID].time = time;
    rides[rideID].seats = seats;
    rides[rideID].cost = cost;
    rideID++;

    return (rides[rideID].id, rides[rideID].from);
   } 

   function returnride(uint rideID) constant returns (uint, bytes32, bytes32, bytes32, bytes32, uint, uint){
    // Check if rideID exists.

    return (rides[rideID].id, rides[rideID].from, rides[rideID].to, rides[rideID].date, rides[rideID].time, rides[rideID].seats, rides[rideID].cost);

   }

     function createride2(bytes32 from, bytes32 to, bytes32 date, bytes32 time, uint seats, uint cost) payable returns (uint, bytes32) {
    // Check if parameters exist.

    if (from == 0x0 || to == 0x0 || date== 0x0 || time == 0x0 || seats == 0x0 || cost == 0x0)
    {
        throw;
    }

    rides[rideID].id = rideID;
    rides[rideID].from =from;
    rides[rideID].to = to;
    rides[rideID].date = date;
    rides[rideID].time = time;
    rides[rideID].seats = seats;
    rides[rideID].cost = cost;
    rideID++;

    return (rides[rideID].id, rides[rideID].from);
   } 

}
