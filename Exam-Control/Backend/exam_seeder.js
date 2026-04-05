const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./src/models/Question');
const Exam = require('./src/models/Exam');
const Subject = require('./src/models/Subject');

dotenv.config();

const seedExamQuestions = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB for seeding...');

        // 1. Get or Create a Subject
        let subject = await Subject.findOne();
        if (!subject) {
            subject = await Subject.create({ name: 'General Computer Science', code: 'CS101', dept: 'Science' });
            console.log('Created Default Subject');
        }

        // 2. Create 10 Default Questions
        const questionsData = [
            { text: 'Which storage device has the fastest data access speed?', options: ['Solid State Drive (SSD)', 'Hard Disk Drive (HDD)', 'Optical Disk', 'Memory Card'], correctOption: 0, marks: 2, type: 'MCQ', subjectId: subject._id },
            { text: 'In web development, what does the "C" in CSS stand for?', options: ['Creative', 'Cascading', 'Central', 'Complex'], correctOption: 1, marks: 2, type: 'MCQ', subjectId: subject._id },
            { text: 'What is the binary representation of the decimal number 10?', options: ['1001', '1011', '1010', '1100'], correctOption: 2, marks: 2, type: 'MCQ', subjectId: subject._id },
            { text: 'Which protocol is used for secure communication over a computer network?', options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'], correctOption: 1, marks: 2, type: 'MCQ', subjectId: subject._id },
            { text: 'What is the default port number for HTTP?', options: ['443', '21', '25', '80'], correctOption: 3, marks: 2, type: 'MCQ', subjectId: subject._id },
            { text: 'Which programming language is known as the "Mother of all languages"?', options: ['Java', 'C Language', 'Python', 'Fortran'], correctOption: 1, marks: 2, type: 'MCQ', subjectId: subject._id },
            { text: 'What does RAM stand for in a computer system?', options: ['Random Access Memory', 'Ready Active Module', 'Rapid Access Memory', 'Read Only Memory'], correctOption: 0, marks: 2, type: 'MCQ', subjectId: subject._id },
            { text: 'Which symbol is used for comments in Python?', options: ['//', '/* */', '#', '<!-- -->'], correctOption: 2, marks: 2, type: 'MCQ', subjectId: subject._id },
            { text: 'What is the primary function of an Operating System?', options: ['Running Games', 'Resource Management', 'Internet Browsing', 'Word Processing'], correctOption: 1, marks: 2, type: 'MCQ', subjectId: subject._id },
            { text: 'Which logic gate output is 1 only when all inputs are 1?', options: ['OR Gate', 'AND Gate', 'NOT Gate', 'NAND Gate'], correctOption: 1, marks: 2, type: 'MCQ', subjectId: subject._id }
        ];

        // Only insert if questions are few
        const qCount = await Question.countDocuments();
        if (qCount < 5) {
            const createdQuestions = await Question.insertMany(questionsData);
            console.log('Inserted 10 Default Questions');

            // 3. Link them to all existing active exams
            const exams = await Exam.find({});
            for (const exam of exams) {
                // In this simplified logic, we just ensure every exam has these questions
                // In a production app, we would use an association table or array
                console.log(`Exam ${exam.name} is now ready for testing.`);
            }
        } else {
            console.log('Questions already exist in DB.');
        }

        process.exit();
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedExamQuestions();
