
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminAppointments from './components/Admin/AdminAppointments';
import AdminSchedule from './components/Admin/AdminSchedule';
import AdminUsers from './components/Admin/AdminUsers';
import AdminDepartments from './components/Admin/AdminDepartments';
import AdminBilling from './components/Admin/AdminBilling';
import AdminBillGenerate from './components/Admin/AdminBillGenerate';
import AdminAnalytics from './components/Admin/AdminAnalytics';
import AdminNotifications from './components/Admin/AdminNotifications';
import PatientRegister from './components/Patient/PatientRegister';
import DoctorDashboard from './components/Doctor/DoctorDashboard';
import DoctorAppointments from './components/Doctor/DoctorAppointments';
import DoctorSchedule from './components/Doctor/DoctorSchedule';
import DoctorPrescriptions from './components/Doctor/DoctorPrescriptions';
import DoctorChat from './components/Doctor/DoctorChat';
import PatientDashboard from './components/Patient/PatientDashboard';
import PatientAppointments from './components/Patient/PatientAppointments';
import PatientBookAppointment from './components/Patient/PatientBookAppointment';
import PatientPrescriptions from './components/Patient/PatientPrescriptions';
import PatientChat from './components/Patient/PatientChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/appointments" element={<AdminAppointments />} />
        <Route path="/admin/schedule" element={<AdminSchedule />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/departments" element={<AdminDepartments />} />
        <Route path="/admin/billing" element={<AdminBilling />} />
        <Route path="/admin/bill-generate" element={<AdminBillGenerate />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        <Route path="/doctor/schedule" element={<DoctorSchedule />} />
        <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
        <Route path="/doctor/chat" element={<DoctorChat />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<PatientAppointments />} />
        <Route path="/patient/book-appointment" element={<PatientBookAppointment />} />
        <Route path="/patient/prescriptions" element={<PatientPrescriptions />} />
        <Route path="/patient/chat" element={<PatientChat />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
