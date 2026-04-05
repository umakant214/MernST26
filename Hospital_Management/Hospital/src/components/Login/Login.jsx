import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const [zone, setZone] = useState('admin');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const zones = {
    admin: {
      title: 'Admin Login',
      sub: 'Sign in to access the Admin Control Panel',
      icon: 'bi-person-gear',
      email: 'admin@hopes.hospital',
      password: 'Admin@123',
      btn: 'Sign In as Admin',
      dest: '/admin/dashboard',
      role: 'admin'
    },
    doctor: {
      title: 'Doctor Login',
      sub: 'Access your appointments and patient records',
      icon: 'bi-heart-pulse-fill',
      email: 'anjali.sharma@hopes.hospital',
      password: 'Doctor@123',
      btn: 'Sign In as Doctor',
      dest: '/doctor/dashboard',
      role: 'doctor'
    },
    patient: {
      title: 'Patient Login',
      sub: 'View your appointments, prescriptions & records',
      icon: 'bi-person-heart',
      email: 'priya.rawat@gmail.com',
      password: 'Patient@123',
      btn: 'Sign In as Patient',
      dest: '/patient/dashboard',
      role: 'user'
    },
  };

  const selectZone = (newZone) => {
    setZone(newZone);
    setValue('email', zones[newZone].email);
    setValue('password', zones[newZone].password);
  };

  // Pre-fill initial zone values correctly once
  React.useEffect(() => {
    setValue('email', zones[zone].email);
    setValue('password', zones[zone].password);
  }, []);

  const onSubmit = async (data) => {
    try {
      const user = await login(data.email, data.password);
      if (user.role !== zones[zone].role) {
         toast.warning(`You logged in as ${user.role}, but tried to enter ${zone} zone.`);
      }
      
      // Navigate based on their actual role
      if (user.role === 'admin') navigate('/admin/dashboard');
      else if (user.role === 'doctor') navigate('/doctor/dashboard');
      else navigate('/patient/dashboard');
      
      toast.success('Login Successful!');
    } catch (error) {
       // AuthContext already handles the error toast
    }
  };

  return (
    <div className="login-container">
      {/* LEFT PANEL */}
      <div className="login-left">
        <div className="geo geo1"></div>
        <div className="geo geo2"></div>
        <div className="geo geo3"></div>
        <div className="hospital-icon">
          <i className="bi bi-hospital-fill"></i>
        </div>
        <h1>
          Smart Hospital<br />
          <span>Operations &</span><br />
          Patient Engagement
        </h1>
        <p>A unified digital platform connecting administrators, doctors and patients for seamless healthcare delivery.</p>
        <ul className="feature-list">
          <li><div className="fi"><i className="bi bi-calendar-check-fill"></i></div> Online appointment booking & scheduling</li>
          <li><div className="fi"><i className="bi bi-file-medical-fill"></i></div> Digital prescriptions & consultation records</li>
          <li><div className="fi"><i className="bi bi-chat-dots-fill"></i></div> Real-time doctor–patient messaging</li>
          <li><div className="fi"><i className="bi bi-bar-chart-fill"></i></div> Reports, analytics & billing management</li>
          <li><div className="fi"><i className="bi bi-shield-lock-fill"></i></div> Secure role-based access control</li>
        </ul>
        <div className="badges">
          <div className="zone-badge"><i className="bi bi-person-gear"></i> Admin Zone</div>
          <div className="zone-badge"><i className="bi bi-heart-pulse-fill"></i> Doctor Zone</div>
          <div className="zone-badge"><i className="bi bi-person-heart"></i> Patient Zone</div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div className="zone-tabs">
          <button
            type="button"
            className={`zone-tab ${zone === 'admin' ? 'active' : ''}`}
            onClick={() => selectZone('admin')}
          >
            <i className="bi bi-person-gear"></i> Admin
          </button>
          <button
            type="button"
            className={`zone-tab ${zone === 'doctor' ? 'active' : ''}`}
            onClick={() => selectZone('doctor')}
          >
            <i className="bi bi-heart-pulse-fill"></i> Doctor
          </button>
          <button
            type="button"
            className={`zone-tab ${zone === 'patient' ? 'active' : ''}`}
            onClick={() => selectZone('patient')}
          >
            <i className="bi bi-person-heart"></i> Patient
          </button>
        </div>

        <div className="role-icon">
          <div className="ri">
            <i className={`bi ${zones[zone].icon}`}></i>
          </div>
        </div>

        <div className="login-title">{zones[zone].title}</div>
        <div className="login-sub">{zones[zone].sub}</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <label className="form-label">Email Address</label>
            <div className={`input-icon ${errors.email ? 'is-invalid border-danger' : ''}`}>
              <i className="bi bi-envelope-fill icon"></i>
              <input
                type="email"
                className="form-control"
                placeholder="email@example.com"
                {...register('email')}
              />
            </div>
            {errors.email && <div className="text-danger small mt-1">{errors.email.message}</div>}
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Password</label>
            <div className={`input-icon ${errors.password ? 'is-invalid border-danger' : ''}`}>
              <i className="bi bi-lock-fill icon"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••"
                {...register('password')}
              />
              <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
              </button>
            </div>
            {errors.password && <div className="text-danger small mt-1">{errors.password.message}</div>}
          </div>

          <button type="submit" className="btn-login" disabled={isSubmitting}>
            {isSubmitting ? (
               <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
               <i className="bi bi-box-arrow-in-right me-2"></i>
            )}
            {zones[zone].btn}
          </button>
        </form>

        <div className="divider">or</div>

        <div className="register-row">
          {zone === 'patient' ? (
            <>New patient? <Link to="/patient/register">Register here</Link></>
          ) : (
            <>Don't have an account? <Link to="/patient/register">Register as Patient</Link></>
          )}
        </div>

        <div className="demo-creds mt-3">
          <strong>Demo Credentials:</strong><br />
          Email: <strong>{zones[zone].email}</strong><br />
          Password: <strong>{zones[zone].password}</strong>
        </div>
      </div>
    </div>
  );
};

export default Login;