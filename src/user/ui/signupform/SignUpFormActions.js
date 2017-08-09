import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import { loginUser } from '../loginbutton/LoginButtonActions'
import store from '../../../store'

const contract = require('truffle-contract')

export function signUpUser(name, email, phone) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        console.log(coinbase);
        //coinbase is the ethereum address
        if (error) {
          console.error(error);
        }

        console.log(authentication.deployed());

        
        
      

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance

        /*
          console.log('test function');
          console.log(name,email);
          // Attempt to sign up user.
          authenticationInstance.signup2(name, email, phone {from: coinbase})
          .then(function(result) {
            // If no error, login user.
            console.log('no error');
            console.log(result);
            //console.log(result2);
            return dispatch(loginUser());
          })
          .catch(function(result) {
            // If error...
          console.log('errorrr');
          //console.log(result);
          })
        })
       
      */
        

      
          console.log(name,email);
          console.log('attempting signup');
          // Attempt to sign up user.
          authenticationInstance.signup2(name, email, phone, {from: coinbase})
          .then(function(result) {
            // If no error, login user.
            console.log('will login User');
            console.log(result)

            return dispatch(loginUser())
          })
          .catch(function(result) {
            // If error...
          console.log('errorrr');
          })
        }) 


      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
