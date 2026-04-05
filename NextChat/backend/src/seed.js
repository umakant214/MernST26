const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const users = [
  {
    name: "Super Admin",
    email: "admin@nexchat.com",
    password: "adminpassword",
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "jane@nexchat.com",
    password: "password123",
  },
  {
    name: "Mike Khan",
    email: "mike@nexchat.com",
    password: "password123",
  },
  {
    name: "Riya Patel",
    email: "riya@nexchat.com",
    password: "password123",
  },
  {
    name: "Guest User",
    email: "guest@nexchat.com",
    password: "password123",
  }
];

const seedData = async () => {
    try {
        await User.deleteMany();
        console.log("All existing users cleared.");

        // Using a loop with create() to ensure pre-save hooks (bcrypt) are triggered
        for (let u of users) {
            await User.create(u);
        }

        console.log("Database Seeded Successfully! You can now login with these credentials.");
        process.exit();
    } catch (error) {
        console.error(`Error with seeding: ${error.message}`);
        process.exit(1);
    }
};

seedData();
