const { Router } = require('express');
const eventController = require('../controllers/eventController');

const router = Router();

router.post('/addNew-event', eventController.postNewEvent);

module.exports = router;