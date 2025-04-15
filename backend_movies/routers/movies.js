const moviesController = require('../controllers/movies_controller')
const router = require('express').Router()


router.get('/', moviesController.index)

module.exports = router