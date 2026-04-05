const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Models
const User = require('./src/models/User');
const Course = require('./src/models/Course');
const Subject = require('./src/models/Subject');
const Exam = require('./src/models/Exam');
const Question = require('./src/models/Question');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
    try {
        // Clear Existing
        await User.deleteMany();
        await Course.deleteMany();
        await Subject.deleteMany();
        await Exam.deleteMany();
        await Question.deleteMany();

        console.log('--- Database Cleared ---');

        // 1. Create Users
        const usersToCreate = [
            { name: 'System Administrator', email: 'amanweb80@gmail.com', password: '12345678', role: 'admin' },
            { name: 'Dr. Ramesh Sharma', email: 'faculty@examcontrol.ai', password: 'password123', role: 'faculty', dept: 'Computer Science' },
            { name: 'Rahul Kumar', email: 'student@examcontrol.ai', password: 'password123', role: 'student', rollNo: 'CS2021001' }
        ];
        
        const users = [];
        for (const u of usersToCreate) {
            const user = await User.create(u);
            users.push(user);
        }

        const adminId = users[0]._id;
        const facultyId = users[1]._id;
        const studentId = users[2]._id;

        // 2. Create Courses
        const courses = await Course.create([
            { name: 'B.Tech — Computer Science', code: 'BTECH-CSE', dept: 'Computer Science', duration: '4 Years', sems: 8, icon: '💻' },
            { name: 'M.Sc — Mathematics', code: 'MSC-MATH', dept: 'Mathematics', duration: '2 Years', sems: 4, icon: '📐' }
        ]);

        // 3. Create Subjects
        const subjects = await Subject.create([
            { name: 'Data Structures & Algorithms', code: 'CS301', courseId: courses[0]._id, sem: '5', credits: 4, facultyId },
            { name: 'Object Oriented Programming', code: 'CS201', courseId: courses[0]._id, sem: '3', credits: 4, facultyId },
            { name: 'Real Analysis', code: 'MA101', courseId: courses[1]._id, sem: '1', credits: 5, facultyId }
        ]);

        // 4. Create Exams
        const exams = await Exam.create([
            { 
                name: 'DSA Mid-term Exam', 
                subjectId: subjects[0]._id, 
                type: 'Mid-term Exam', 
                date: new Date('2026-05-10'), 
                time: '10:00', 
                duration: 90, 
                totalMarks: 50, 
                passMarks: 18, 
                facultyId,
                status: 'scheduled',
                proctoring: { faceAuth: true, liveMonitoring: true, tabSwitch: true, multiFace: false }
            },
            { 
                name: 'Java Programming Quiz', 
                subjectId: subjects[1]._id, 
                type: 'Quiz', 
                date: new Date(), 
                time: '11:00', 
                duration: 30, 
                totalMarks: 20, 
                passMarks: 8, 
                facultyId,
                status: 'live',
                proctoring: { faceAuth: false, liveMonitoring: false, tabSwitch: true, multiFace: false }
            }
        ]);

        // 5. Create Questions
        const questions = await Question.create([
            { examId: exams[0]._id, text: 'What is the time complexity of Merge Sort?', type: 'MCQ', marks: 2, diff: 'Medium', tag: 'Sorting', options: ['O(n)', 'O(n^2)', 'O(n log n)', 'O(log n)'], correctOption: 2 },
            { examId: exams[0]._id, text: 'A stack follows LIFO principle.', type: 'TF', marks: 1, diff: 'Easy', tag: 'Data Structures', tfAnswer: true },
            { examId: exams[1]._id, text: 'Explain the concept of Abstraction in Java.', type: 'SA', marks: 5, diff: 'Medium', tag: 'OOP', modelAnswer: 'Abstraction is the process of hiding implementation details...' }
        ]);

        // 6. Create a Simulation Submission (for Student Rahul)
        const Submission = require('./src/models/Submission');
        await Submission.deleteMany();

        await Submission.create({
            studentId,
            examId: exams[1]._id,
            answers: [
                { questionId: questions[2]._id, answerText: 'Abstraction is hiding details...', marksObtained: 4 }
            ],
            totalMarksObtained: 4,
            status: 'submitted',
            proctoringFlags: [
                { type: 'Tab Switch', score: 0.95, timestamp: new Date() },
                { type: 'Face Mismatch', score: 0.88, timestamp: new Date() }
            ]
        });


        console.log('--- Seed Data (Users, Courses, Subjects, Exams, Questions, Submissions) Imported Successfully! ---');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
