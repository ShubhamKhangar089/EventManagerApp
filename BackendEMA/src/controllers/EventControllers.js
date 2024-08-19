const asyncHandler = require('express-async-handler');
const EventModel = require('../models/EventModel');

// get events
const getEvent = asyncHandler(async (req, res) => {
    const event = await EventModel.find();
    res.status(200).json({event: event});
  });

// Create event
// Create Event
const createEvent = asyncHandler(async (req, res) => {
  const { name, date, time, location, description, participantLimit } = req.body;

  // Validate required fields
  if (!name || !date || !time || !location || !description || !participantLimit) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }

  // Create the event
  const event = new EventModel({name,date,time,location,description,participantLimit,});

  try {
    const createdEvent = await event.save();
    // Emit WebSocket notification
    // const io = getSocketIo(); // Get the Socket.io instance
    // io.emit('newEventNotification', {
    //   message: `A new event "${createdEvent.name}" has been created!`,
    //   event: createdEvent,
    // });

    // io.emit('newEvent', createdEvent);
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500);
    throw new Error('Event creation failed');
  }
});

// Update event
const updateEvent = asyncHandler(async (req, res) => {
  const { name, date, time, location, description, participantLimit } = req.body;
  const event = await EventModel.findById(req.params.id);

  if (event) {
    event.name = name || event.name;
    event.date = date || event.date;
    event.time = time || event.time;
    event.location = location || event.location;
    event.description = description || event.description;
    event.participantLimit = participantLimit || event.participantLimit;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// Delete event
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await EventModel.findById(req.params.id);

  if (event) {
    await event.remove();
    res.json({ message: 'Event removed' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// Register for event
const registerForEvent = asyncHandler(async (req, res) => {
  const event = await EventModel.findById(req.params.id);
  const user = req.user;

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  if (event.participants.length < event.participantLimit) {
    event.participants.push(user.id);
    console.log("user ID:", user.id);
    
    await event.save();
    res.json({ message: 'Successfully registered for event' , event : event});
  } else {
    event.waitlist.push(user._id);
    await event.save();
    res.json({ message: 'Event is full. You have been added to the waitlist' });
  }
});

// Cancel registration
const cancelRegistration = asyncHandler(async (req, res) => {
  const event = await EventModel.findById(req.params.id);
  const user = req.user;

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  event.participants.pull(user._id);
  if (event.waitlist.length > 0) {
    const nextInLine = event.waitlist.shift();
    event.participants.push(nextInLine);
  }

  await event.save();
  res.json({ message: 'Registration cancelled' });
});

module.exports = {getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  cancelRegistration,
};
