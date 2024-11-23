import express from 'express';
import Event from '../models/eventSchema.js';

const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find(); 
    res.json(events); 
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Error fetching events', error: err.message });
  }
});


// POST add a new event
router.post('/add', async (req, res) => {
  try {
    const { name, date, location, description, image } = req.body;

    if (!name || !date || !location || !description) {
      return res.status(400).json({
        message: 'All fields (name, date, location, description) are required.',
      });
    }

    const newEvent = new Event({ name, date, location, description, image });
    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ message: 'Error adding event', error: error.message });
  }
});

export default router;
