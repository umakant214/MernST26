import User from '../models/User.model.js';
import Doctor from '../models/Doctor.model.js';
import Appointment from '../models/Appointment.model.js';

// @desc    Get dashboard statistics
// @route   GET /api/v1/admin/dashboard-stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
    try {
        const totalDoctors = await Doctor.countDocuments();
        const totalPatients = await User.countDocuments({ role: 'user' });
        const totalAppointments = await Appointment.countDocuments();
        
        // Departments normally would be a separate model, deriving from doctor specialties for now
        const doctors = await Doctor.find();
        const departments = new Set(doctors.map(d => d.specialty));
        const totalDepartments = departments.size;

        // Fetch recent appointments (last 5)
        const recentAppointments = await Appointment.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('userId', 'name')
            .populate({
                path: 'doctorId',
                populate: { path: 'userId', select: 'name' }
            });

        res.json({
            success: true,
            data: {
                totalDoctors,
                totalPatients,
                totalAppointments,
                totalDepartments,
                recentAppointments
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
