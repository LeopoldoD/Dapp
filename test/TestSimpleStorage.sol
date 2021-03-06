pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStorage.sol";
import "../contracts/Authentication.sol";

contract TestSimpleStorage {

  function testItStoresAValue() {
    SimpleStorage simpleStorage = SimpleStorage(DeployedAddresses.SimpleStorage());

    simpleStorage.set(89);

    uint expected = 89;

    Assert.equal(simpleStorage.get(), expected, "It should store the value 89.");
  }

}

contract TestAuthentication {

  function testItStoresAName() {
    Authentication authentication = Authentication(DeployedAddresses.Authentication));

    authentication.set("david");

    string expected = "david";

    Assert.equal(authentication.get(), expected, "It should store the value david.");
  }

}
