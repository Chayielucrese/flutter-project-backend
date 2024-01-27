
const mongoose = require('mongoose')
const { Host, Port, Dbname, Password} = require('./dbparam')


const connect = mongoose.connect(`mongodb://${Host}:${Port}/${Dbname}`)

if(!connect){
    console.log("connection to mongodb failed");
}
    console.log('connection to mongodb successful');    