const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Serve static uploads
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route files
const adminRoutes = require('./src/routes/adminRoutes');
const citizenRoutes = require('./src/routes/citizenRoutes');
const departmentRoutes = require('./src/routes/departmentRoutes');
const complaintRoutes = require('./src/routes/complaintRoutes');
const noticeRoutes = require('./src/routes/noticeRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const messageRoutes = require('./src/routes/messageRoutes');

// Mount routes
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/citizen', citizenRoutes);
app.use('/api/v1/dept', departmentRoutes);
app.use('/api/v1/complaints', complaintRoutes);
app.use('/api/v1/notices', noticeRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/messages', messageRoutes);

const { notFound, errorHandler } = require('./src/middlewares/errorMiddleware');

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Smart City API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
