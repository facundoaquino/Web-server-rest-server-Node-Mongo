const { search } = require('../controllers/search')

const router = require('express').Router()


router.get('/:colection/:term',search)



module.exports=router