import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import { browserHistory } from 'react-router'
import store from '../../../store'
//import ethUtil from 'ethreumjs-util'

const contract = require('truffle-contract')

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user, email, phone) {
  return {
    type: USER_LOGGED_IN,
    payload: user, email, phone
  }
}


 export function verifyIdentity(){
  var ethUtil = require('ethereumjs-util');
  let web3 = store.getState().web3.web3Instance

  //var msg ='authenticate user';
  var coinbase = web3.eth.coinbase;
  console.log(coinbase);
 // console.log(web3.sha3(msg));


  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)
      console.log('provider:');
      console.log(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance


        web3.eth.getCoinbase((error, pubaddress) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

     // Will sign a message to verify identity using private key
     /*
     web3.eth.sign(pubaddress, web3.sha3(msg), function (err, signature){
      if (err) return console.error(err)
        console.log('SIGNED:' + signature)

      var r,s,v,m,pub,adr;
     r = ethUtil.toBuffer(signature.slice(0,66))
     s = ethUtil.toBuffer('0x' + signature.slice(66,130))
     //s = '0x12345678901234567890123456789012345678901234567890123456789012345' //create invalid address
     var test = signature.slice(130,132);
     console.log(test);
     v = ethUtil.bufferToInt(ethUtil.toBuffer('0x' + signature.slice(130,132)))

     m = ethUtil.toBuffer(web3.sha3(msg))
     pub = ethUtil.ecrecover(m, v, r, s)
      adr = '0x' + ethUtil.pubToAddress(pub).toString('hex')
      // Verify public addresses match
      if (adr !== pubaddress) {
        throw alert('Invalid Identity');
     }

     console.log("Ta-da!")
     console.log(adr);
     console.log(pubaddress);
*/

        // end 1st part sign message

        // Second methos using eth-sig-utl
/*
  var sigUtil = require('eth-sig-util')
  var text = "Welcome to Ride Share, please login to the application by signing this message to the blockchain"
  var msg = ethUtil.bufferToHex(new Buffer(text, 'utf8'))
  // var msg = '0x1' // hexEncode(text)
  console.log(msg)
  var from = pubaddress

  console.log('CLICKED, SENDING PERSONAL SIGN REQ')
  var params = [msg, from]
  var method = 'personal_sign'

  web3.currentProvider.sendAsync({
    method,
    params,
    from,
  }, function (err, result) {
    if (err) return console.error(err)
    if (result.error) return console.error(result.error)
    console.log('PERSONAL SIGNED:' + JSON.stringify(result.result))

    console.log('recovering...')
    const msgParams = { data: msg }
    msgParams.sig = result.result
    console.dir({ msgParams })
    const recovered = sigUtil.recoverPersonalSignature(msgParams)
    console.dir({ recovered })

    if (recovered === from ) {
      console.log('SigUtil Successfully verified signer as ' + from)
    } else {
      console.dir(recovered)
      console.log('SigUtil Failed to verify signer when comparing ' + recovered.result + ' to ' + from)
      console.log('Failed, comparing %s to %s', recovered, from)
    }

  })
*/


        authentication.deployed().then(function(instance) {
          authenticationInstance = instance
          console.log('attempting login');

          // authenticated user before login
          
          authenticationInstance.authenticateuser({from: pubaddress})
          .then(function(verify){
            console.log(verify);
            console.log('user authenticated');

          // Attempt to login user.
          authenticationInstance.login3({from: pubaddress})
          .then(function(result) {
            // If no error, login user.
            console.log(result);
            var userName = web3.toUtf8(result[0]);
            var userEmail = web3.toUtf8(result[1]);
            var userPhone = web3.toDecimal(result[2]);
            //var userPhone = web3.toDecimal('0x12d687');
            

            dispatch(userLoggedIn({"name": userName, "email": userEmail, "phone": userPhone}))
       //   })  
          console.log('end authenticate user');
            // Used a manual redirect here as opposed to a wrapper.
            // This way, once logged in a user can still access the home page.
            var currentLocation = browserHistory.getCurrentLocation()

            if ('redirect' in currentLocation.query)
            {
              return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }

            return browserHistory.push('/dashboard')
          }) //login3
     //   }) //authenticateuser
          .catch(function(result) {
            // If error, go to signup page.
            console.log('error: '+result);
            console.error('Wallet ' + pubaddress + ' does not have an account!')

            return browserHistory.push('/signup')
          })
        }) // authenticate user
        .catch(function(result) {
            // If error, go to signup page.
            console.log('error authenticate user: '+result);
            console.error('Wallet ' + pubaddress + ' does not have an account!')

            return browserHistory.push('/signup')
          });
        }) //authentication 
//     }) //signVerify
      }) //getcoinbase

    } //return
  } else {
    console.error('Web3 is not initialized.');
  }
} //loginUser
