const moviesController = require('../controllers/movies_controller')
const router = require('express').Router()

//index
router.get('/', moviesController.index)
//show
router.get('/:id', moviesController.show)

module.exports = router