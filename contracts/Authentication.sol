pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';
// import './Membership.sol';

contract Authentication is Killable{
  struct User {
    bytes32 name;
    bytes32 email;
    uint phone;
  }

  address[] public regmembers;

  mapping (address => User) private users;

  function login() constant returns (bytes32, bytes32, uint) {
    // Check if user exists.
    // If yes, return user.
    // If no, throw.

    if (users[msg.sender].name == 0x0)
    {
        throw;
    }

    if (users[msg.sender].email == 0x0)
    {
      throw;
    }

    if (users[msg.sender].phone == 0x0)
    {
      throw;
    }

    return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone); 
  }


function signup(bytes32 name, bytes32 email, uint phone) returns (bytes32, bytes32, uint) {
    // Validates data provided by the user, if no data is provided contract stops.

    if (name == 0x0 || email == 0x0 || phone == 0x0)
    {
        throw;
    }

     // Check if user has an associated account. If yes, returns user information otherwise creates new account.   

    if (users[msg.sender].name == 0x0 || users[msg.sender].email == 0x0 || users[msg.sender].phone == 0x0)
    {
        users[msg.sender].name = name;
        users[msg.sender].email = email;
        users[msg.sender].phone = phone;
        regmembers.push(msg.sender);
        //super.membership(members);

        return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone);
   }

    return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone);
  }

   function update(bytes32 name, bytes32 email, uint phone) returns (bytes32, bytes32, uint) {
    // Update user name.

    if (name == 0x0 || email == 0x0 || phone == 0x0)
    {
        throw;
    }

    if (users[msg.sender].name != 0x0 || users[msg.sender].email != 0x0 || users[msg.sender].phone != 0x0)
    {
        users[msg.sender].name = name;
        users[msg.sender].email = email;
        users[msg.sender].phone = phone;

        return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone);
    }

    throw;
  }

  function getuserinfo (address pubaddress) onlyNew constant returns (bytes32, bytes32, uint){
      return (users[pubaddress].name, users[pubaddress].email, users[pubaddress].phone);
  }

  function authenticateuser () returns (address){
    return (msg.sender);
  }

  function checkmembership () public constant returns (bool){
   uint iter;

  // Check if user has permissions to receive account information (member of App)
     for (iter = 0; iter < regmembers.length; iter++){
         if (msg.sender == regmembers[iter]){
          return true;
         }
      }
      return false;
  }

    modifier onlyNew() {
    if (!this.checkmembership()) throw;
      _;
  }

}