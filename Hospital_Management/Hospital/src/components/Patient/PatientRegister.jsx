import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../services/api';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const schema = yup.object().shape({
  name: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  // Additional fields for future UI/UX, though currently our backend model just requires name, email, password
});

const PatientRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Send payload (Our backend user model requires name, email, password, role)
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'user'
      };

      const res = await api.post('/users/register', payload);
      
      if (res.data.success) {
        toast.success('Registration successful! Please login.');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Try again.');
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
          <i className="bi bi-person-plus-fill"></i>
        </div>
        <h1>
          Join Our<br />
          <span>Healthcare</span><br />
          Platform
        </h1>
        <p>Register as a patient to access world-class healthcare services, book appointments, and manage your health records.</p>
        <ul className="feature-list">
          <li><div className="fi"><i className="bi bi-calendar-check-fill"></i></div> Book appointments with top doctors</li>
          <li><div className="fi"><i className="bi bi-file-medical-fill"></i></div> Access digital prescriptions anytime</li>
          <li><div className="fi"><i className="bi bi-chat-dots-fill"></i></div> Chat directly with your doctor</li>
          <li><div className="fi"><i className="bi bi-shield-lock-fill"></i></div> Your data is safe & encrypted</li>
        </ul>
        <div className="badges">
          <div className="zone-badge"><i className="bi bi-check-circle-fill"></i> Free Registration</div>
          <div className="zone-badge"><i className="bi bi-clock-fill"></i> Quick Process</div>
          <div className="zone-badge"><i className="bi bi-heart-pulse-fill"></i> Instant Access</div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right" style={{ overflowY: 'auto' }}>
        <div className="role-icon">
          <div className="ri">
            <i className="bi bi-person-heart"></i>
          </div>
        </div>

        <div className="login-title">Patient Registration</div>
        <div className="login-sub">Create your account to get started</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group mb-2">
              <label className="form-label">Full Name</label>
              <div className={`input-icon ${errors.name ? 'is-invalid border-danger' : ''}`}>
                <i className="bi bi-person-fill icon"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  {...register('name')}
                />
              </div>
              {errors.name && <div className="text-danger small mt-1">{errors.name.message}</div>}
            </div>

            <div className="form-group mb-2">
              <label className="form-label">Email Address</label>
              <div className={`input-icon ${errors.email ? 'is-invalid border-danger' : ''}`}>
                <i className="bi bi-envelope-fill icon"></i>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@email.com"
                  {...register('email')}
                />
              </div>
              {errors.email && <div className="text-danger small mt-1">{errors.email.message}</div>}
            </div>

            <div className="form-group mb-2">
              <label className="form-label">Password</label>
              <div className={`input-icon ${errors.password ? 'is-invalid border-danger' : ''}`}>
                <i className="bi bi-lock-fill icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Min 6 characters"
                  {...register('password')}
                />
                <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                </button>
              </div>
              {errors.password && <div className="text-danger small mt-1">{errors.password.message}</div>}
            </div>

            <div className="form-group mb-2">
              <label className="form-label">Confirm Password</label>
              <div className={`input-icon ${errors.confirmPassword ? 'is-invalid border-danger' : ''}`}>
                <i className="bi bi-shield-lock-fill icon"></i>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Re-enter password"
                  {...register('confirmPassword')}
                />
                <button type="button" className="toggle-pw" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <i className={`bi ${showConfirmPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                </button>
              </div>
              {errors.confirmPassword && <div className="text-danger small mt-1">{errors.confirmPassword.message}</div>}
            </div>
          </div>

          <button type="submit" className="btn-login mt-4" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <i className="bi bi-person-plus-fill me-2"></i>
            )}
            Create Account
          </button>
        </form>

        <div className="divider">or</div>

        <div className="register-row">
          Already have an account? <Link to="/">Sign In here</Link>
        </div>
      </div>
    </div>
  );
};

export default PatientRegister;
