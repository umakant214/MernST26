import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    qualifications: {
        type: [String],
        required: true
    },
    experience: {
        type: Number, // in years
        required: true
    },
    feesPerCunsultation: {
        type: Number,
        required: true
    },
    availability: [
        {
            day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
            startTime: { type: String }, // e.g., "09:00"
            endTime: { type: String }    // e.g., "17:00"
        }
    ]
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
