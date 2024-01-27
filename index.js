const express = require ('express')
const bodyparser = require('body-parser')
const app = express()
const cors = require("cors")
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json({}))
require('./connection/MongoConnect')
app.use('/api', require('./route'))
const port = 4000 || process.env.port
app.listen('4000', console.log(`server is listening on port ${port}`))