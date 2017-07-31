var Authentication = artifacts.require("./Authentication.sol");

contract('Authentication', function(accounts) {

  it("...should create user david.", function() {
    return Authentication.deployed().then(function(instance) {
      authenticationInstance = instance;

      return authenticationInstance.set("david", {from: accounts[0]});
    }).then(function() {
      return authenticationInstance.get.call();
    }).then(function(storedData) {
      assert.equal(storedData, "david", "The value david was not stored.");
    });
  });

});
