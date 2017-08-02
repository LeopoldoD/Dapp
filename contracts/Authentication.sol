pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';

contract Authentication is Killable {
  struct User {
    bytes32 name;
    bytes32 email;
  }

  mapping (address => User) private users;

  uint private id; // Stores user id temporarily

  function login() constant returns (bytes32, bytes32) {
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

    return (users[msg.sender].name, users[msg.sender].email); 
  }

  function signup(bytes32 name, bytes32 email) payable returns (bytes32, bytes32) {
    // Check if user exists.
    // If yes, return user name.
    // If no, check if name was sent.
    // If yes, create and return user.
    // If no, throw.

    if (name == 0x0 || email ==0x0) //Check if user doesn't input name or email, if yes throw
    {
        throw;
    }

    if (users[msg.sender].name == 0x0 || users[msg.sender].email == 0x0)
    {
        users[msg.sender].name = name;
        users[msg.sender].email = email;

        return (users[msg.sender].name, users[msg.sender].email);
   }

    return (users[msg.sender].name, users[msg.sender].email);
  }

  function signup2(bytes32 name, bytes32 email) payable returns (bytes32, bytes32) {

        users[msg.sender].name = name;
        users[msg.sender].email = email;

      return (users[msg.sender].name, users[msg.sender].email);
  }


  function update(bytes32 name, bytes32 email) payable returns (bytes32, bytes32) {
    // Update user name.

    if (name == 0x0 || email == 0x0)
    {
        throw;
    }

    if (users[msg.sender].name != 0x0 || users[msg.sender].email != 0x0)
    {
        users[msg.sender].name = name;
        users[msg.sender].email = email;

        return (users[msg.sender].name, users[msg.sender].email);
    }

    throw;
  }

  function getData() constant returns (bytes32) {
      bytes32 a = "abcd";
      return (a);
    }

    function getData2(bytes32 myvar, bytes32 myvar2) payable returns (bytes32, bytes32, bytes32, bytes32) {
      bytes32 b = "abcd";
      bytes32 c = "wxyz";
      bytes32 d = myvar;
      bytes32 e = myvar2;
      return (b, c, d, e);
    } 


}
