import Doctor from '../models/Doctor.model.js';
import User from '../models/User.model.js';

// @desc    Add a new doctor (Admin only)
// @route   POST /api/v1/doctors
// @access  Private/Admin
export const addDoctor = async (req, res) => {
    try {
        const { userId, specialty, qualifications, experience, feesPerCunsultation, availability } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.role !== 'doctor') {
            user.role = 'doctor';
            await user.save();
        }

        const doctorExists = await Doctor.findOne({ userId });
        if (doctorExists) {
            return res.status(400).json({ success: false, message: 'Doctor profile already exists for this user' });
        }

        const doctor = await Doctor.create({
            userId,
            specialty,
            qualifications,
            experience,
            feesPerCunsultation,
            availability
        });

        res.status(201).json({ success: true, data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all doctors
// @route   GET /api/v1/doctors
// @access  Public
export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('userId', 'name email profileImage');
        res.json({ success: true, count: doctors.length, data: doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single doctor by ID
// @route   GET /api/v1/doctors/:id
// @access  Public
export const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email profileImage');
        
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        res.json({ success: true, data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update doctor profile
// @route   PUT /api/v1/doctors/:id
// @access  Private/Admin or self
export const updateDoctor = async (req, res) => {
    try {
        let doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        // Make sure user is admin or the doctor themselves
        if (req.user.role !== 'admin' && doctor.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this doctor' });
        }

        doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json({ success: true, data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get dashboard statistics for a doctor
// @route   GET /api/v1/doctors/dashboard-stats
// @access  Private/Doctor
export const getDoctorDashboardStats = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.user._id });
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor profile not found' });
        }

        // Get Appointment model dynamically to avoid circular dependencies if any, but we can import it
        const Appointment = (await import('../models/Appointment.model.js')).default;
        
        // Today's boundaries
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todaysAppointmentsCount = await Appointment.countDocuments({
            doctorId: doctor._id,
            date: { $gte: today, $lt: tomorrow }
        });

        // We can just estimate total unique patients the doctor has seen (naive way)
        const totalAppointments = await Appointment.find({ doctorId: doctor._id }).select('userId');
        const uniquePatients = new Set(totalAppointments.map(a => a.userId.toString())).size;

        const prescriptionsCount = await Appointment.countDocuments({
            doctorId: doctor._id,
            prescription: { $exists: true, $ne: '' }
        });

        // Today's appointments list
        const todaysAppointments = await Appointment.find({
            doctorId: doctor._id,
            date: { $gte: today, $lt: tomorrow }
        })
        .populate('userId', 'name profileImage')
        .sort({ timeSlot: 1 });

        res.json({
            success: true,
            data: {
                todaysAppointmentsCount,
                totalPatients: uniquePatients,
                prescriptionsCount,
                unreadMessages: 0, // Placeholder
                todaysAppointments
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
