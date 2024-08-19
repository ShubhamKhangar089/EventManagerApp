const express = require('express');
const { createEvent, updateEvent, deleteEvent, registerForEvent, cancelRegistration, getEvent } = require('../controllers/EventControllers');
const Auth = require('../middlewares/AuthMiddleware');


const eventRouter = express.Router();

eventRouter.get('/get', getEvent)

eventRouter.post('/create', Auth(['Admin']),  createEvent)

eventRouter.put('/update/:id', Auth(['Admin']),  updateEvent)

eventRouter.delete('/delete/:id', Auth(['Admin']), deleteEvent)

eventRouter.post('/register/:id',Auth(['Admin', 'User']), registerForEvent)

eventRouter.post('/cancel/:id',Auth(['Admin', 'User']), cancelRegistration)


module.exports = eventRouter;
