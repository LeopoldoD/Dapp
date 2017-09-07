//var db;
var db2;	
let rideID = 1;

export function ipfs(option, address, address2, startDate, rideTime, seats) {
 // let web3 = store.getState().web3.web3Instance
// var db;
  //console.log('db value: '+db)
  console.log('option: '+option);
  console.log(address);
  console.log(address2)
  console.log(seats);
  console.log(startDate);
  console.log(rideTime);


const IpfsDaemon = require('ipfs-daemon/src/ipfs-node-daemon')
const OrbitDB = require('orbit-db')

// Start
const createRideDatabase = () => {
  console.log("Starting IPFS daemon...")
  const ipfs = new IpfsDaemon()

  //ipfs.on('error', (err) => console.error(err))

 // ipfs.on('ready', () => {
    const orbit = new OrbitDB(ipfs);
  //  db =orbit.docstore('orbit-db.benchmark');
    db2=orbit.docstore('doc-test');
}

const createNewRide = (db) =>{
// db.events.on('ready', () => {
    db.put({_id: rideID, from: address, to: address2, numberSeats: seats, date: startDate, time: rideTime})
  .then(() => db.get('1'))
  .then((value) => console.log(value)) 
  .catch((e) => console.error(e))
//})
rideID++;
console.log('rideID: '+rideID);
//db.load()
}


const searchRide = (db) => {
db.events.on('ready', () => {
    const all = db.query((doc) => doc.from==address)
    console.log(all);
    return all;
})
db.load();
 console.log('query searching...')
}


if(option =='createnewride'){
	if(db2 == null){
		createRideDatabase();
	}
	console.log('will create a new ride');
	createNewRide(db2);
}

if(option == 'searchride'){
	if(db2 == null){
		console.log('will create new Database');
		console.log('warning: you need to create a new ride first');
		createRideDatabase();
	}
	console.log('will search a ride');
	searchRide(db2);
}

if(option !== 'createnewride' && option !== 'searchride'){
	return alert('Wrong option selected');
}

/*
const profile = ()=>{
  db.events.on('load', () => {
    db.query((doc) => doc._id >1)
 // .then((value) => console.log(value))
  })
} 
 */   

}









export function startDatabase2() {

  console.log('Start Database');

  'use strict'
/*
const IPFS = require('ipfs-daemon/src/ipfs-browser-daemon')
const OrbitDB = require('orbit-db/src/OrbitDB')
*/

/*
const IPFS = require('ipfs-daemon/src/ipfs-node-daemon')
const OrbitDB = require('orbit-db')
*/

/* Working?
const IpfsDaemon = require('ipfs-daemon/src/ipfs-node-daemon')
const OrbitDB = require('orbit-db')



const queryLoop2 = (db2) => {
  db2.put({_id: 'hello world', doc: 'all'})
  .then(() => db2.put({ _id: 'sup world', doc: 'other things' }))
  .then(() => db2.get('hello'))
  .then((value) => console.log(value)) 
  .catch((e) => console.error(e))
}



// Start
console.log("Starting IPFS daemon...")

const ipfs = new IpfsDaemon()

ipfs.on('error', (err) => console.error(err))

ipfs.on('ready', () => {
  const orbit = new OrbitDB(ipfs, 'benchmark')
  const db2 =orbit.docstore('orbit-db.benchmark2')

  queryLoop2(db2)
})
*/

  /*
var ipfsAPI = require('ipfs-api')

// connect to ipfs daemon API server
var ipfs = ipfsAPI('localhost', '6001', {protocol: 'http'}) // leaving out the arguments will default to these values

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const orbitdb = new OrbitDB(ipfs)


const counter = orbitdb.counter('visitors')
counter.inc()
console.log(counter.value)
// 1
counter.inc(4)
console.log(counter.value)
// 5
*/

/*
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const ipfs = new IPFS()
const orbitdb = new OrbitDB(ipfs)
const docstore = orbitdb.docstore('db name')

docstore.put({ _id: 'hello world', doc: 'all the things' })
  .then(() => docstore.put({ _id: 'sup world', doc: 'other things' }))
  .then(() => docstore.get('hello'))
  .then((value) => console.log(value)) 
  // [{ _id: 'hello world', doc: 'all the things'}]
*/




/*
const IPFS = require('ipfs-daemon/src/ipfs-node-daemon')
const OrbitDB = require('orbit-db')

const ipfs = new IPFS()

ipfs.on('error', (e) => console.error(e))
ipfs.on('ready', (e) => {
  const orbitdb = new OrbitDB(ipfs)

  const db = orbitdb.eventlog("feed name")

  db.add("hello world")
    .then(() => {
      const latest = db.iterator({ limit: 5 }).collect()
      console.log(JSON.stringify(latest, null, 2))
    })  
})

*/


}

