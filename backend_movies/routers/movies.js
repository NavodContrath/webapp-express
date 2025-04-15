const moviesController = require('../controllers/movies_controller')
const router = require('express').Router()

//index
router.get('/', moviesController.index)
//show
router.get('/:id', moviesController.show)
//storeReview
router.post('/:id/review', moviesController.storeReview)

module.exports = router