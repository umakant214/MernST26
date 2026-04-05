const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

// Models
const Admin = require('./src/models/adminModel');
const Citizen = require('./src/models/citizenModel');
const Department = require('./src/models/departmentModel');
const Complaint = require('./src/models/complaintModel');
const Notice = require('./src/models/noticeModel');

dotenv.config();

const seedData = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await Admin.deleteMany();
    await Citizen.deleteMany();
    await Department.deleteMany();
    await Complaint.deleteMany();
    await Notice.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash('password123', salt);

    // 1. Create Admin
    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@smartcity.com',
      password: 'password123', // Model middleware will hash this automatically if we use Admin.create
    });

    // 2. Create Citizen
    const citizen = await Citizen.create({
      firstName: 'Rahul',
      lastName: 'Kumar',
      mobileNumber: '9876543210',
      email: 'rahul@test.com',
      aadhaarNumber: '1234-5678-9101',
      address: 'Plot 4, Kothrud, Pune',
      ward: 'Ward 12',
      block: 'Block B',
      password: 'password123',
    });

    // 3. Create Department
    const dept = await Department.create({
      name: 'Amit Singh',
      email: 'water@smartcity.com',
      departmentName: 'Water Supply',
      password: 'password123',
    });

    // 4. Create Notice
    const notice = await Notice.create({
      title: 'Summer Water Schedule Update',
      content: 'Due to summer maintenance, water supply in Ward 12 will be restricted between 2 PM - 5 PM on weekdays.',
      issuedBy: admin._id,
      category: 'Alert',
    });

    // 5. Create Complaints
    await Complaint.create([
      {
        citizenId: citizen._id,
        category: 'Water',
        title: 'Low pressure in taps',
        description: 'Facing very low water pressure for the past 3 days in Block B area.',
        location: 'Near Mahatma Phule chowk',
        ward: 'Ward 12',
        status: 'In Progress',
        departmentAssigned: dept._id
      },
      {
        citizenId: citizen._id,
        category: 'Electricity',
        title: 'Street light not working',
        description: 'Street light near block-B entrance is flickering and off since last night.',
        location: 'Entrance Gate, Block B',
        ward: 'Ward 12',
        status: 'Pending'
      }
    ]);

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
