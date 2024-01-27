const express = require('express')
const usercontroller = require('./controllers/usercontroller')
const musiccontroller = require('./controllers/musicapicontroller')
const router = express.Router()


router.post('/createuser',  usercontroller.adduser)
router.post('/login',  usercontroller.login)
router.route("/musicsearch").post(musiccontroller.musicApiSearch)
module.exports= router