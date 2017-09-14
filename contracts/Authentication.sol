pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';

contract Authentication is Killable {
  struct User {
    bytes32 name;
    bytes32 email;
    bytes32 phone;
    uint phone2;
  }

  mapping (address => User) private users;

  function getUserInfo (address pubaddress) constant returns (bytes32, bytes32, uint){
    return (users[pubaddress].name, users[pubaddress].email, users[pubaddress].phone2);
  }
  
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

    function login2() constant returns (bytes32, bytes32, bytes32) {
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

    function login3() constant returns (bytes32, bytes32, uint) {
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

    if (users[msg.sender].phone2 == 0x0)
    {
      throw;
    }

    return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone2); 
  }
  function signup(bytes32 name, bytes32 email) payable returns (bytes32, bytes32) {
    // Check if user exists.
    // If yes, return user name.
    // If no, check if name was sent.
    // If yes, create and return user.
    // If no, throw.

    if (name == 0x0 || email == 0x0) //Check if user doesn't input name or email, if yes throw
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


  function signup2(bytes32 name, bytes32 email, bytes32 phone) payable returns (bytes32, bytes32, bytes32) {
    // Check if user exists.
    // If yes, return user name.
    // If no, check if name was sent.
    // If yes, create and return user.
    // If no, throw.

    if (name == 0x0 || email == 0x0 || phone == 0x0) //Check if user doesn't input name or email, if yes throw
    {
        throw;
    }

    if (users[msg.sender].name == 0x0 || users[msg.sender].email == 0x0 || users[msg.sender].phone == 0x0)
    {
        users[msg.sender].name = name;
        users[msg.sender].email = email;
        users[msg.sender].phone = phone;

        return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone);
   }

    return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone);
  }

    function signup3(bytes32 name, bytes32 email, uint phone) payable returns (bytes32, bytes32, uint) {
    // Check if user exists.
    // If yes, return user name.
    // If no, check if name was sent.
    // If yes, create and return user.
    // If no, throw.

    if (name == 0x0 || email == 0x0 || phone == 0x0) //Check if user doesn't input name or email, if yes throw
    {
        throw;
    }

    if (users[msg.sender].name == 0x0 || users[msg.sender].email == 0x0 || users[msg.sender].phone2 == 0x0)
    {
        users[msg.sender].name = name;
        users[msg.sender].email = email;
        users[msg.sender].phone2 = phone;

        return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone2);
   }

    return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone2);
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

    function update2(bytes32 name, bytes32 email, bytes32 phone) payable returns (bytes32, bytes32, bytes32) {
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


    function update3(bytes32 name, bytes32 email, uint phone) payable returns (bytes32, bytes32, uint) {
    // Update user name.

    if (name == 0x0 || email == 0x0 || phone == 0x0)
    {
        throw;
    }

    if (users[msg.sender].name != 0x0 || users[msg.sender].email != 0x0 || users[msg.sender].phone2 != 0x0)
    {
        users[msg.sender].name = name;
        users[msg.sender].email = email;
        users[msg.sender].phone2 = phone;

        return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone2);
    }

    throw;
  }


}
