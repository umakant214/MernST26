import express from 'express';
import {
    bookAppointment,
    getMyAppointments,
    getAppointments,
    updateAppointment,
    cancelAppointment,
    deleteAppointment
} from '../controllers/appointment.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All appointment routes require authentication
router.use(protect);

router.route('/')
    .post(bookAppointment)
    .get(getAppointments); // Admin or Doctor (controlled in controller)

router.get('/my-appointments', getMyAppointments);

router.route('/:id')
    .put(updateAppointment) // Admin or Doctor updates status/prescription
    .delete(cancelAppointment); // User or Admin cancels

router.delete('/:id/delete', deleteAppointment); // Hard delete by Admin or Doctor

export default router;
