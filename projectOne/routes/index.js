const express = require('express')
const router  = express.Router()
const { ensureAuthenticated } = require('../config/oauth')


router.get('/home'  , (req , res) => {
  res.render('home')

})

router.get('/dashboard'  , ensureAuthenticated , ( req , res ) => {
  res.render('dashboard')
})

module.exports = router;