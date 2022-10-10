const { Router } = require('express');
const tripController = require('../controllers/tripController');

const router = Router();

router.post('/addNew-trip', tripController.postNewTrip);
router.get('/my-trips/:tripId', tripController.getTripSummary);

module.exports = router;