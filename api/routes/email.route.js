import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { sendEmailForAdoption } from '../controllers/email.controller.js';

const router = express.Router();

router.post('/sendEmail', verifyToken, sendEmailForAdoption);

export default router;