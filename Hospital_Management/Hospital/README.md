# Hospital Management System - React

This is a React application converted from an HTML-based Hospital Management System. The application uses React Router for navigation, Bootstrap for styling, and is organized into separate components for each module with consolidated CSS.

## Features

- **Login System**: Role-based login for Admin, Doctor, and Patient
- **Dashboard**: Complete dashboards for each role with full UI implementation
- **Navigation**: Sidebar and top navigation with React Router Links
- **Responsive Design**: Bootstrap-based responsive UI matching original HTML design
- **Modular Components**: Each page is a separate React component
- **Consolidated CSS**: All styles consolidated into App.css for better maintainability

## Project Structure

```
src/
├── components/
│   ├── Login/
│   │   └── Login.jsx
│   ├── Shared/
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Header.jsx
│   ├── Admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminAppointments.jsx
│   │   ├── AdminSchedule.jsx
│   │   ├── AdminUsers.jsx
│   │   ├── AdminDepartments.jsx
│   │   └── AdminBilling.jsx
│   ├── Doctor/
│   │   ├── DoctorDashboard.jsx
│   │   ├── DoctorAppointments.jsx
│   │   ├── DoctorSchedule.jsx
│   │   ├── DoctorPrescriptions.jsx
│   │   └── DoctorChat.jsx
│   └── Patient/
│       ├── PatientDashboard.jsx
│       ├── PatientAppointments.jsx
│       ├── PatientBookAppointment.jsx
│       ├── PatientPrescriptions.jsx
│       └── PatientChat.jsx
├── App.jsx
├── App.css
└── main.jsx
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

To build the application for production:
```bash
npm run build
```

## Routes

- `/` - Login page
- `/admin/dashboard` - Admin Dashboard
- `/admin/appointments` - Admin Appointments
- `/admin/schedule` - Admin Schedule
- `/admin/users` - User Management
- `/admin/departments` - Departments
- `/admin/billing` - Billing
- `/doctor/dashboard` - Doctor Dashboard
- `/doctor/appointments` - Doctor Appointments
- `/doctor/schedule` - Doctor Schedule
- `/doctor/prescriptions` - Doctor Prescriptions
- `/doctor/chat` - Doctor Chat
- `/patient/dashboard` - Patient Dashboard
- `/patient/appointments` - Patient Appointments
- `/patient/book-appointment` - Book Appointment
- `/patient/prescriptions` - Patient Prescriptions
- `/patient/chat` - Patient Chat

## Technologies Used

- React 19
- React Router DOM
- Bootstrap 5
- Bootstrap Icons
- Vite
- Google Fonts (Outfit, DM Sans)

## Conversion Notes

This application was converted from a static HTML/CSS/JS project to a modern React application with the following improvements:

- Component-based architecture
- Client-side routing with React Router
- State management with React hooks
- Consolidated CSS in App.css for maintainability
- Pixel-perfect UI replication from original HTML
- Modular structure for easy expansion
- Responsive design preserved from original

## Demo Credentials

- **Admin**: admin@hopes.hospital / Admin@123
- **Doctor**: doctor@hopes.hospital / Doctor@123
- **Patient**: patient@hopes.hospital / Patient@123

## Development Notes

- All CSS has been consolidated into `App.css` with organized sections
- UI is identical to the original HTML design
- Navigation uses React Router Links for proper routing
- Components are modular and reusable
- Bootstrap custom properties are used for consistent theming
