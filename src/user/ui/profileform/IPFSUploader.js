//import React, { Component } from 'react'

var ipfsAPI = require('ipfs-api')

// connect to ipfs daemon API server
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) // leaving out the arguments will default to these values

class IPFSUploader{

  constructor(_node) {
    this.node = _node || new IPFS();    
  }



  uploadBlob(blob) {
    var reader = new FileReader();
    var result = new Promise((resolve, reject) => {
      reader.onload = async () => { 
        var result = await this.node.files.add([Buffer.from(reader.result)]); 
        resolve(result[0].hash);
      }
    });
    reader.readAsArrayBuffer(blob);
    return result;
  }

  loadImage(img, hash) {
    this.node.files.cat(hash).then( (stream) => {
       var buf = [];
       var blob;       
       stream.on('data', (file) => {
           var data =  Array.prototype.slice.call(file)
           buf = buf.concat(data)         
       });
       stream.on('end', (file) => {           
           if (typeof blob !== 'undefined') {   
               window.URL.revokeObjectURL(blob);
           }
           buf = this.node.types.Buffer(buf);
           blob = new Blob([buf], {type:"image/jpg"})
           img.src = window.URL.createObjectURL(blob); 
           img.srcset = '';
   });
    });
  }

};

export default IPFSUploader
