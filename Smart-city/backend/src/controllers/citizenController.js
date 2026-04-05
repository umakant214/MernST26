const Citizen = require('../models/citizenModel');

// @desc    Get citizen profile
// @route   GET /api/v1/citizen/profile
// @access  Private
const getCitizenProfile = async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.user.id).select('-password');
    if (citizen) {
      res.json(citizen);
    } else {
      res.status(404).json({ message: 'Citizen not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCitizenProfile };
