README

This is a container of a dAPP (Decentralized Application), using Truffle Box (JavaScript, HTML, CSS, React, Router, Redux).

Requirements:
- Install ganache, before known as testrpc (https://github.com/trufflesuite/ganache-cli)
- Install Metamask extension, create a wallet and setup network to ganache/testrpc (https://metamask.io/)
- Install truffle framework "npm install -g truffle" (https://truffleframework.com/docs/truffle/getting-started/installation)

Running the application
- Start ganache and make sure metamask extension is running
- Go to the contracts folder and compile the solidity contracts "truffle compile"
- Run migrations "truffle migrate
- Start the application "npm run start"


For more information about the application architecture and functionality, please refer to Chapter 5 of the file "Security and Privacy Evaluation of Blockchain Applications.pdf".

A brief explanation of the project structure is presented next:

* Build: Contains the build files of the smart contracts in JSON format.
* Contracts: Contains the source files of the smart contracts written in Solidity language.
* Images: Contains the images used in the application.
* Migrations: Standard files used in Truffle framework to keep track of changes in smart contracts. 
* node_modules: Modules used for the application. The most important modules used for this application can be found on Appendix C of "Security and Privacy Evaluation of Blockchain Applications.pdf".
* Public: Contains the index.html file.
* Scripts: Contains the scripts to run the application.
* src: Contains all the front end files (CSS, JavaScript, React, etc.)

Author: polo_30_88@hotmmail.com



