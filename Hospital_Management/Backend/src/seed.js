import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.model.js';
import Doctor from './models/Doctor.model.js';
import Appointment from './models/Appointment.model.js';
import Message from './models/Message.model.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_management';

// ============================================
//  🏥 HOSPITAL MANAGEMENT SYSTEM — SEED DATA
// ============================================

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB Connected for seeding...');

        // ─── Clear existing data ───
        await User.deleteMany({});
        await Doctor.deleteMany({});
        await Appointment.deleteMany({});
        await Message.deleteMany({});
        console.log('🗑️  Old data cleared');

        // ═══════════════════════════════════
        //  👤 USERS — Create one-by-one for password hashing
        // ═══════════════════════════════════

        const usersData = [
            // Admin
            { name: 'Admin User', email: 'admin@hopes.hospital', password: 'Admin@123', role: 'admin' },

            // Doctors (6)
            { name: 'Dr. Anjali Sharma', email: 'anjali.sharma@hopes.hospital', password: 'Doctor@123', role: 'doctor' },
            { name: 'Dr. Sanjay Kapoor', email: 'sanjay.kapoor@hopes.hospital', password: 'Doctor@123', role: 'doctor' },
            { name: 'Dr. Rajesh Gupta', email: 'rajesh.gupta@hopes.hospital', password: 'Doctor@123', role: 'doctor' },
            { name: 'Dr. Neha Singh', email: 'neha.singh@hopes.hospital', password: 'Doctor@123', role: 'doctor' },
            { name: 'Dr. Vikram Patel', email: 'vikram.patel@hopes.hospital', password: 'Doctor@123', role: 'doctor' },
            { name: 'Dr. Priya Verma', email: 'priya.verma@hopes.hospital', password: 'Doctor@123', role: 'doctor' },

            // Patients (8)
            { name: 'Priya Rawat', email: 'priya.rawat@gmail.com', password: 'Patient@123', role: 'user' },
            { name: 'Rahul Mehta', email: 'rahul.mehta@gmail.com', password: 'Patient@123', role: 'user' },
            { name: 'Sunita Kumari', email: 'sunita.kumari@gmail.com', password: 'Patient@123', role: 'user' },
            { name: 'Amit Kumar', email: 'amit.kumar@gmail.com', password: 'Patient@123', role: 'user' },
            { name: 'Deepa Patel', email: 'deepa.patel@gmail.com', password: 'Patient@123', role: 'user' },
            { name: 'Vikram Kumar', email: 'vikram.kumar@gmail.com', password: 'Patient@123', role: 'user' },
            { name: 'Meera Joshi', email: 'meera.joshi@gmail.com', password: 'Patient@123', role: 'user' },
            { name: 'Arjun Reddy', email: 'arjun.reddy@gmail.com', password: 'Patient@123', role: 'user' }
        ];

        // Create users one by one so pre-save password hash runs
        const users = [];
        for (const userData of usersData) {
            const user = new User(userData);
            await user.save();
            users.push(user);
        }

        console.log(`👤 ${users.length} Users created`);

        const admin = users[0];
        const doctorUsers = users.slice(1, 7);
        const patientUsers = users.slice(7);

        // ═══════════════════════════════════
        //  🩺 DOCTOR PROFILES
        // ═══════════════════════════════════

        const doctorProfiles = await Doctor.insertMany([
            {
                userId: doctorUsers[0]._id,
                specialty: 'Cardiology',
                qualifications: ['MBBS', 'MD - Cardiology', 'DM - Interventional Cardiology'],
                experience: 15,
                feesPerCunsultation: 1500,
                availability: [
                    { day: 'Monday', startTime: '09:00', endTime: '13:00' },
                    { day: 'Wednesday', startTime: '09:00', endTime: '13:00' },
                    { day: 'Friday', startTime: '10:00', endTime: '14:00' },
                    { day: 'Saturday', startTime: '09:00', endTime: '12:00' }
                ]
            },
            {
                userId: doctorUsers[1]._id,
                specialty: 'Neurology',
                qualifications: ['MBBS', 'MD - Neurology', 'Fellowship in Epilepsy'],
                experience: 12,
                feesPerCunsultation: 1800,
                availability: [
                    { day: 'Monday', startTime: '13:00', endTime: '17:00' },
                    { day: 'Tuesday', startTime: '09:00', endTime: '14:00' },
                    { day: 'Thursday', startTime: '09:00', endTime: '14:00' },
                    { day: 'Saturday', startTime: '10:00', endTime: '13:00' }
                ]
            },
            {
                userId: doctorUsers[2]._id,
                specialty: 'Orthopedics',
                qualifications: ['MBBS', 'MS - Orthopedics', 'Fellowship in Joint Replacement'],
                experience: 18,
                feesPerCunsultation: 1200,
                availability: [
                    { day: 'Tuesday', startTime: '09:00', endTime: '13:00' },
                    { day: 'Wednesday', startTime: '14:00', endTime: '18:00' },
                    { day: 'Friday', startTime: '09:00', endTime: '13:00' }
                ]
            },
            {
                userId: doctorUsers[3]._id,
                specialty: 'Dermatology',
                qualifications: ['MBBS', 'MD - Dermatology', 'Diploma in Cosmetology'],
                experience: 8,
                feesPerCunsultation: 1000,
                availability: [
                    { day: 'Monday', startTime: '10:00', endTime: '14:00' },
                    { day: 'Wednesday', startTime: '10:00', endTime: '14:00' },
                    { day: 'Thursday', startTime: '14:00', endTime: '18:00' },
                    { day: 'Saturday', startTime: '09:00', endTime: '12:00' }
                ]
            },
            {
                userId: doctorUsers[4]._id,
                specialty: 'Pediatrics',
                qualifications: ['MBBS', 'MD - Pediatrics', 'DCH'],
                experience: 10,
                feesPerCunsultation: 800,
                availability: [
                    { day: 'Monday', startTime: '09:00', endTime: '13:00' },
                    { day: 'Tuesday', startTime: '14:00', endTime: '18:00' },
                    { day: 'Thursday', startTime: '09:00', endTime: '13:00' },
                    { day: 'Friday', startTime: '14:00', endTime: '18:00' }
                ]
            },
            {
                userId: doctorUsers[5]._id,
                specialty: 'Gynecology',
                qualifications: ['MBBS', 'MS - OBG', 'Fellowship in Fertility'],
                experience: 14,
                feesPerCunsultation: 1300,
                availability: [
                    { day: 'Monday', startTime: '14:00', endTime: '18:00' },
                    { day: 'Wednesday', startTime: '09:00', endTime: '13:00' },
                    { day: 'Friday', startTime: '09:00', endTime: '13:00' },
                    { day: 'Saturday', startTime: '10:00', endTime: '13:00' }
                ]
            }
        ]);

        console.log(`🩺 ${doctorProfiles.length} Doctor profiles created`);

        // ═══════════════════════════════════
        //  📅 APPOINTMENTS (12)
        // ═══════════════════════════════════

        const appointments = await Appointment.insertMany([
            {
                userId: patientUsers[0]._id,
                doctorId: doctorProfiles[0]._id,
                date: new Date('2026-04-07'),
                timeSlot: '10:00 - 10:30',
                status: 'approved',
                reasonForVisit: 'Regular cardiology checkup and ECG review'
            },
            {
                userId: patientUsers[1]._id,
                doctorId: doctorProfiles[1]._id,
                date: new Date('2026-04-07'),
                timeSlot: '11:00 - 11:30',
                status: 'pending',
                reasonForVisit: 'Frequent headaches and dizziness'
            },
            {
                userId: patientUsers[2]._id,
                doctorId: doctorProfiles[2]._id,
                date: new Date('2026-04-03'),
                timeSlot: '09:00 - 09:30',
                status: 'completed',
                reasonForVisit: 'Knee pain and swelling since 2 weeks',
                diagnosis: 'Mild osteoarthritis in right knee',
                prescription: 'Tab. Diclofenac 50mg twice daily, Calcium + Vitamin D3 once daily, Physiotherapy 3 times/week'
            },
            {
                userId: patientUsers[3]._id,
                doctorId: doctorProfiles[3]._id,
                date: new Date('2026-04-02'),
                timeSlot: '14:00 - 14:30',
                status: 'cancelled',
                reasonForVisit: 'Skin rash on arms and legs'
            },
            {
                userId: patientUsers[4]._id,
                doctorId: doctorProfiles[0]._id,
                date: new Date('2026-04-08'),
                timeSlot: '14:00 - 14:30',
                status: 'approved',
                reasonForVisit: 'ECG review and blood pressure management'
            },
            {
                userId: patientUsers[5]._id,
                doctorId: doctorProfiles[4]._id,
                date: new Date('2026-04-09'),
                timeSlot: '09:30 - 10:00',
                status: 'pending',
                reasonForVisit: 'Child vaccination and growth checkup'
            },
            {
                userId: patientUsers[6]._id,
                doctorId: doctorProfiles[5]._id,
                date: new Date('2026-04-10'),
                timeSlot: '10:00 - 10:30',
                status: 'approved',
                reasonForVisit: 'Routine gynecology checkup'
            },
            {
                userId: patientUsers[7]._id,
                doctorId: doctorProfiles[1]._id,
                date: new Date('2026-04-01'),
                timeSlot: '13:00 - 13:30',
                status: 'completed',
                reasonForVisit: 'Follow-up for migraine treatment',
                diagnosis: 'Chronic migraine with aura. Frequency reduced.',
                prescription: 'Tab. Sumatriptan 50mg as needed, Tab. Propranolol 40mg once daily'
            },
            {
                userId: patientUsers[0]._id,
                doctorId: doctorProfiles[2]._id,
                date: new Date('2026-04-11'),
                timeSlot: '09:00 - 09:30',
                status: 'pending',
                reasonForVisit: 'Lower back pain since 1 month'
            },
            {
                userId: patientUsers[1]._id,
                doctorId: doctorProfiles[3]._id,
                date: new Date('2026-04-12'),
                timeSlot: '10:00 - 10:30',
                status: 'approved',
                reasonForVisit: 'Acne treatment follow-up'
            },
            {
                userId: patientUsers[2]._id,
                doctorId: doctorProfiles[4]._id,
                date: new Date('2026-03-28'),
                timeSlot: '14:00 - 14:30',
                status: 'completed',
                reasonForVisit: 'Child fever and cough for 3 days',
                diagnosis: 'Viral upper respiratory tract infection',
                prescription: 'Syp. Paracetamol 5ml thrice daily, Syp. Ambroxol 2.5ml twice daily'
            },
            {
                userId: patientUsers[3]._id,
                doctorId: doctorProfiles[5]._id,
                date: new Date('2026-04-14'),
                timeSlot: '11:00 - 11:30',
                status: 'pending',
                reasonForVisit: 'Prenatal checkup - first trimester'
            }
        ]);

        console.log(`📅 ${appointments.length} Appointments created`);

        // ═══════════════════════════════════
        //  💬 MESSAGES (6)
        // ═══════════════════════════════════

        const messages = await Message.insertMany([
            {
                firstName: 'Priya', lastName: 'Rawat',
                email: 'priya.rawat@gmail.com', phone: '9876543210',
                message: 'I need to reschedule my appointment with Dr. Sharma. Can someone help?',
                status: 'unread'
            },
            {
                firstName: 'Rahul', lastName: 'Mehta',
                email: 'rahul.mehta@gmail.com', phone: '9876543211',
                message: 'How can I get my medical reports online? Is there a portal for that?',
                status: 'unread'
            },
            {
                firstName: 'Sunita', lastName: 'Kumari',
                email: 'sunita.kumari@gmail.com', phone: '9876543212',
                message: 'Thank you for the excellent treatment by Dr. Gupta. The knee pain has reduced significantly!',
                status: 'read'
            },
            {
                firstName: 'Amit', lastName: 'Kumar',
                email: 'amit.kumar@gmail.com', phone: '9876543213',
                message: 'I would like to know the visiting hours for the hospital. Also, is there parking available?',
                status: 'read'
            },
            {
                firstName: 'Meera', lastName: 'Joshi',
                email: 'meera.joshi@gmail.com', phone: '9876543214',
                message: 'Can I book a video consultation with Dr. Priya Verma? I am unable to visit in person.',
                status: 'unread'
            },
            {
                firstName: 'Arjun', lastName: 'Reddy',
                email: 'arjun.reddy@gmail.com', phone: '9876543215',
                message: 'My prescription has expired. Can Dr. Kapoor renew it without an in-person visit?',
                status: 'replied'
            }
        ]);

        console.log(`💬 ${messages.length} Messages created`);

        // ═══════════════════════════════════
        //  📊 SUMMARY
        // ═══════════════════════════════════

        console.log('\n===================================================');
        console.log('  HOSPITAL MANAGEMENT SYSTEM — SEED COMPLETE');
        console.log('===================================================');
        console.log(`  Users:        ${users.length}`);
        console.log(`     Admin:     1`);
        console.log(`     Doctors:   ${doctorUsers.length}`);
        console.log(`     Patients:  ${patientUsers.length}`);
        console.log(`  Doctors:      ${doctorProfiles.length}`);
        console.log(`  Appointments: ${appointments.length}`);
        console.log(`  Messages:     ${messages.length}`);
        console.log('===================================================');
        console.log('\n  LOGIN CREDENTIALS:');
        console.log('---------------------------------------------------');
        console.log('  Admin:   admin@hopes.hospital       / Admin@123');
        console.log('  Doctor:  anjali.sharma@hopes.hospital / Doctor@123');
        console.log('  Doctor:  sanjay.kapoor@hopes.hospital / Doctor@123');
        console.log('  Patient: priya.rawat@gmail.com      / Patient@123');
        console.log('  Patient: rahul.mehta@gmail.com      / Patient@123');
        console.log('  (All doctors: Doctor@123, All patients: Patient@123)');
        console.log('---------------------------------------------------\n');

        process.exit(0);

    } catch (error) {
        console.error('Seed Error:', error.message);
        process.exit(1);
    }
};

seedDatabase();
