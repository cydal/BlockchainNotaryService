/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './data/chaindata';
const db = level(chainDB);





// Add block to DB with key/value pair
function pushBlock(key, value) {
    return new Promise((resolve, reject) => {
        db.put(key, value, function(err) {
        if (err) reject(err);
        resolve('Block Number' + " " + key + " added.");
        });
    });
}




// Get block from B with blockheight
function getBlock(key) {
    return new Promise((resolve, reject) => {
        db.get(key, function(err, value) {
            if (err) reject(err);
            resolve(value);
        });
    });
}




// Read chain to dictionary
function getChain() {
    var chain = {};

    return new Promise((resolve, reject) => {
        db.createReadStream().on('data', function(data) {
            chain[data.key] = data.value;
        }).on('error', function(err) {
            reject(err);
        }).on('close', function() {
            resolve(chain);
        });
    });
}



// get chain height
function getHeight() {
    return new Promise((resolve, reject) => {
        let i = -1;
        db.createReadStream().on('data', function(data) {
            i++;
            //console.log(data.value);
        }).on('error', function(err) {
            reject(err);
        }).on('close', function() {
            resolve(i);
        });
    });
}


// get chain height
function getByAddress(address) {

    let blocks = [];
    let block;

    return new Promise((resolve, reject) => {
        
        db.createReadStream().on('data', function(data) {
            block = JSON.parse(data.value);
            if (block.body.address === address) {
               blocks.push(block);
            }
            //console.log(data.value);
        }).on('error', function(err) {
            reject(err);
        }).on('close', function() {
            resolve(blocks);
        });
    });
}


// get chain height
function getByHash(hash) {

    let blocks = [];
    let block;

    console.log(hash);

    return new Promise((resolve, reject) => {
        
        db.createReadStream().on('data', function(data) {
            block = JSON.parse(data.value);
            if (block.hash === hash) {
               blocks.push(block);
            }
            //console.log(data.value);
        }).on('error', function(err) {
            reject(err);
        }).on('close', function() {
            resolve(blocks);
        });
    });
}



// get chain height
function getHeight() {
    return new Promise((resolve, reject) => {
        let i = -1;
        db.createReadStream().on('data', function(data) {
            i++;
            //console.log(data.value);
        }).on('error', function(err) {
            reject(err);
        }).on('close', function() {
            resolve(i);
        });
    });
}


module.exports = {
    "addBlock": pushBlock, 
    "getBlock": getBlock, 
    "getChain": getChain, 
    "getHeight": getHeight,
    "getByAddress": getByAddress,
    "getByHash": getByHash
};