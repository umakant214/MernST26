const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./src/models/Question');
const Exam = require('./src/models/Exam');
const Subject = require('./src/models/Subject');

dotenv.config();

const seedFullExam = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB...');

        // 1. Ensure Subject
        let subject = await Subject.findOne();
        if (!subject) {
            subject = await Subject.create({ name: 'Computer Science Fundamental', code: 'CS101', dept: 'Science' });
        }

        // 2. Ensure at least one Exam exists to link questions
        let exam = await Exam.findOne();
        if (!exam) {
            exam = await Exam.create({
                name: 'Baseline Assessment 2026',
                subjectId: subject._id,
                duration: 10,
                totalMarks: 20,
                passMarks: 8,
                date: new Date(),
                time: '10:00 AM',
                batch: '2026-A',
                status: 'published'
            });
            console.log('Created Baseline Exam');
        }

        // 3. 10 Professional Questions
        const questionsData = [
            { examId: exam._id, subjectId: subject._id, type: 'MCQ', marks: 2, text: 'Which storage device has the fastest data access speed?', options: ['Solid State Drive (SSD)', 'Hard Disk Drive (HDD)', 'Optical Disk', 'Memory Card'], correctOption: 0 },
            { examId: exam._id, subjectId: subject._id, type: 'MCQ', marks: 2, text: 'In web development, what does the "C" in CSS stand for?', options: ['Creative', 'Cascading', 'Central', 'Complex'], correctOption: 1 },
            { examId: exam._id, subjectId: subject._id, type: 'MCQ', marks: 2, text: 'What is the binary representation of decimal number 10?', options: ['1001', '1011', '1010', '1100'], correctOption: 2 },
            { examId: exam._id, subjectId: subject._id, type: 'MCQ', marks: 2, text: 'Which protocol is used for secure communication over a network?', options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'], correctOption: 1 },
            { examId: exam._id, subjectId: subject._id, type: 'MCQ', marks: 2, text: 'What is the default port number for HTTP?', options: ['443', '21', '25', '80'], correctOption: 3 },
            { examId: exam._id, subjectId: subject._id, type: 'MCQ', marks: 2, text: 'Which language is known as the "Mother of all languages"?', options: ['Java', 'C Language', 'Python', 'Fortran'], correctOption: 1 },
            { examId: exam._id, subjectId: subject._id, type: 'MCQ', marks: 2, text: 'What does RAM stand for in a computer system?', options: ['Random Access Memory', 'Ready Active Module', 'Rapid Access Memory', 'Read Only Memory'], correctOption: 0 },
            { examId: exam._id, subjectId: subject._id, type: 'MCQ', marks: 2, text: 'Which symbol is used for comments in Python?', options: ['//', '/* */', '#', '<!-- -->'], correctOption: 2 },
            { examId: exam._id, subjectId: subject._id, type: 'MCQ', marks: 2, text: 'What is the primary function of an Operating System?', options: ['Running Games', 'Resource Management', 'Internet Browsing', 'Word Processing'], correctOption: 1 },
            { examId: exam._id, subjectId: subject._id, type: 'MCQ', marks: 2, text: 'Which logic gate output is 1 only when all inputs are 1?', options: ['OR Gate', 'AND Gate', 'NOT Gate', 'NAND Gate'], correctOption: 1 }
        ];

        // Clean and Seed
        await Question.deleteMany({ examId: exam._id });
        await Question.insertMany(questionsData);
        
        console.log('Successfully Seeded 10 Dynamic Questions linked to Exam ID:', exam._id);
        process.exit();
    } catch (err) {
        console.error('Seeding Error:', err.message);
        process.exit(1);
    }
};

seedFullExam();
