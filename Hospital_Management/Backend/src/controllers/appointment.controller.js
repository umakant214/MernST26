import Appointment from '../models/Appointment.model.js';
import Doctor from '../models/Doctor.model.js';

// @desc    Book an appointment
// @route   POST /api/v1/appointments
// @access  Private (Patient/User)
export const bookAppointment = async (req, res) => {
    try {
        const { doctorId, date, timeSlot, reasonForVisit } = req.body;

        const doctorExists = await Doctor.findById(doctorId);
        if (!doctorExists) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        // Check if slot is already booked
        const existingAppointment = await Appointment.findOne({ doctorId, date, timeSlot, status: { $ne: 'cancelled' } });
        if (existingAppointment) {
            return res.status(400).json({ success: false, message: 'This slot is already booked' });
        }

        const appointment = await Appointment.create({
            userId: req.user._id,
            doctorId,
            date,
            timeSlot,
            reasonForVisit
        });

        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user appointments
// @route   GET /api/v1/appointments/my-appointments
// @access  Private (Patient/User)
export const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user._id })
            .populate({
                path: 'doctorId',
                populate: { path: 'userId', select: 'name email' }
            })
            .sort('-createdAt');
            
        res.json({ success: true, count: appointments.length, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all appointments (Admin) / Doctor specific appointments
// @route   GET /api/v1/appointments
// @access  Private (Admin/Doctor)
export const getAppointments = async (req, res) => {
    try {
        let query = {};
        
        // If user is doctor, only show their appointments
        if (req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({ userId: req.user._id });
            if (doctor) {
                query.doctorId = doctor._id;
            }
        }

        const appointments = await Appointment.find(query)
            .populate('userId', 'name email')
            .populate({
                path: 'doctorId',
                populate: { path: 'userId', select: 'name' }
            })
            .sort('date');
            
        res.json({ success: true, count: appointments.length, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update appointment status/details
// @route   PUT /api/v1/appointments/:id
// @access  Private (Admin/Doctor)
export const updateAppointment = async (req, res) => {
    try {
        let appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        const { status, diagnosis, prescription } = req.body;

        appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status, diagnosis, prescription },
            { new: true, runValidators: true }
        );

        res.json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Cancel appointment
// @route   DELETE /api/v1/appointments/:id
// @access  Private (Patient/Admin)
export const cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // Allow if user is admin or the user who booked it
        if (appointment.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to cancel this appointment' });
        }

        appointment.status = 'cancelled';
        await appointment.save();

        res.json({ success: true, data: {}, message: 'Appointment cancelled successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Hard Delete appointment
// @route   DELETE /api/v1/appointments/:id/delete
// @access  Private (Admin/Doctor)
export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // Allow if user is admin or doctor
        if (req.user.role !== 'admin' && req.user.role !== 'doctor') {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this appointment' });
        }

        await Appointment.findByIdAndDelete(req.params.id);

        res.json({ success: true, data: {}, message: 'Appointment permanently deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
