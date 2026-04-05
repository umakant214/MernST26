const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const Citizen = require('../models/citizenModel');
const Department = require('../models/departmentModel');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// ====================== ADMIN AUTH ======================
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const adminExists = await Admin.findOne({ email });

    if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

    const admin = await Admin.create({ name, email, password });
    if (admin) {
      res.status(201).json({
        _id: admin._id, name: admin.name, email: admin.email, role: admin.role,
        token: generateToken(admin._id, admin.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id, name: admin.name, email: admin.email, role: admin.role,
        token: generateToken(admin._id, admin.role),
      });
    } else { res.status(401).json({ message: 'Invalid email or password' }); }
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// ====================== CITIZEN AUTH ======================
const registerCitizen = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, email, aadhaarNumber, address, ward, block, password } = req.body;
    
    const emailExists = await Citizen.findOne({ email });
    if (emailExists) return res.status(400).json({ message: 'Citizen with this email already exists' });

    const mobileExists = await Citizen.findOne({ mobileNumber });
    if (mobileExists) return res.status(400).json({ message: 'Citizen with this mobile number already exists' });

    const aadhaarExists = await Citizen.findOne({ aadhaarNumber });
    if (aadhaarExists) return res.status(400).json({ message: 'Citizen with this Aadhaar number already exists' });

    const citizen = await Citizen.create({ firstName, lastName, mobileNumber, email, aadhaarNumber, address, ward, block, password });
    if (citizen) {
      res.status(201).json({
        _id: citizen._id,
        firstName: citizen.firstName,
        lastName: citizen.lastName,
        email: citizen.email,
        mobileNumber: citizen.mobileNumber,
        ward: citizen.ward,
        block: citizen.block,
        role: citizen.role,
        token: generateToken(citizen._id, citizen.role),
      });
    } else { res.status(400).json({ message: 'Invalid citizen data' }); }
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const loginCitizen = async (req, res) => {
  try {
    const { email, password } = req.body;
    // user could send mobile number or email in the 'email' payload field
    const citizen = await Citizen.findOne({ 
      $or: [{ email: email }, { mobileNumber: email }] 
    });

    if (citizen && (await citizen.matchPassword(password))) {
      res.json({
        _id: citizen._id,
        firstName: citizen.firstName,
        lastName: citizen.lastName,
        email: citizen.email,
        mobileNumber: citizen.mobileNumber,
        ward: citizen.ward,
        block: citizen.block,
        role: citizen.role,
        token: generateToken(citizen._id, citizen.role),
      });
    } else { res.status(401).json({ message: 'Invalid email/mobile or password' }); }
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// ====================== DEPARTMENT AUTH ======================
const registerDepartment = async (req, res) => {
  try {
    const { name, email, password, departmentName } = req.body;
    const departmentExists = await Department.findOne({ email });

    if (departmentExists) return res.status(400).json({ message: 'Department user already exists' });

    const department = await Department.create({ name, email, password, departmentName });
    if (department) {
      res.status(201).json({
        _id: department._id, name: department.name, email: department.email,
        departmentName: department.departmentName, role: department.role,
        token: generateToken(department._id, department.role),
      });
    } else { res.status(400).json({ message: 'Invalid department data' }); }
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const loginDepartment = async (req, res) => {
  try {
    const { email, password } = req.body;
    const department = await Department.findOne({ email });

    if (department && (await department.matchPassword(password))) {
      res.json({
        _id: department._id, name: department.name, email: department.email,
        departmentName: department.departmentName, role: department.role,
        token: generateToken(department._id, department.role),
      });
    } else { res.status(401).json({ message: 'Invalid email or password' }); }
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateCitizenPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const citizen = await Citizen.findById(req.user.id);

    if (citizen && (await citizen.matchPassword(currentPassword))) {
      citizen.password = newPassword;
      await citizen.save();
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(401).json({ message: 'Invalid current password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAdmin, loginAdmin,
  registerCitizen, loginCitizen, updateCitizenPassword,
  registerDepartment, loginDepartment
};
