export function startDatabase() {

  console.log('Start Database');

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const ipfs = new IPFS()
const orbitdb = new OrbitDB(ipfs)

const docstore = orbitdb.docstore('test database')

docstore.put({ _id: 'hello world', doc: 'all the things' })
  .then(() => docstore.put({ _id: 'sup world', doc: 'other things' }))
  .then(() => docstore.get('hello'))
  .then((value) => console.log(value)) 

}

export function helloWorld(){
	console.log('Hello World');
}
