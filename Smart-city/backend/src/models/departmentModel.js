const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'department' },
  departmentName: { type: String, required: true },
}, { timestamps: true });

// Password hash middleware
departmentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password
departmentSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;
