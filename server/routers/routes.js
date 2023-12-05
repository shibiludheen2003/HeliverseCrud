// routes/authRoutes.js
import express, { Router, response } from 'express';
import userDataSchema from "../schemas/users.js"
import crypto, { verify } from "crypto"
import jwt  from 'jsonwebtoken';
const router = express.Router();

const JWT_SECRET_KEY = crypto.randomBytes(32).toString('hex');
console.log('Generated JWT secret key:', JWT_SECRET_KEY);







router.post('/create-user',async (req, res) => {
    try {
      
      const response = await userDataSchema.insertMany(req.body);
  
    
      if (response && response.length > 0) {
        res.status(201).json({
          success: true,
          message: 'User(s) created successfully',
          data: response,
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Invalid request. No users created.',
        });
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  });


  router.get('/data-from-database',async (req, res) => {
    try {
      
      const response = await userDataSchema.find();
       console.log(response)
      if (response && response.length > 0) {
        res.status(200).json({
          success: true,
          message: 'Data fetched successfully',
          data: response,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'No data found',
        });
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  });
  
  router.delete('/delete-user/:id', async (req, res) => {
    try {
      
      const userId = req.params.id;
  
      
      const deletedUser = await userDataSchema.findByIdAndDelete(userId);
  
      if (deletedUser) {
        res.status(200).json({
          success: true,
          message: 'User deleted successfully',
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  });
  router.get('/get-user/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await userDataSchema.findById(userId);
      res.json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal server err',
      });
    }
  });
  router.put('/update-user/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = await userDataSchema.findByIdAndUpdate(userId, req.body, { new: true });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user by ID:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  });

 
 

export default router;
