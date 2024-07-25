// src/routes/router.js

import { Router } from 'express';
import { Participants } from '../models/participants.js';


const router = Router();

// Common function to handle saving user details
const saveUserDetails = async (req, res, Participants) => {
    try {
      const user = new Participants(req.body);
      const savedUser = await user.save();
      console.log('User details saved successfully:', savedUser);
      res.json(savedUser);
    } catch (error) {
      console.error('Error saving user details:', error);
      res.status(500).json({ error: error.message });
    }
  };


// Endpoint for user details from bookform
router.post('/', async (req, res) => {
  await saveUserDetails(req, res, Participants);
});


export default router;






