const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date(),
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: 'Exercise type?',
            },
            name: {
                type: String,
                trim: true,
                required: 'Exercise name?',
            },
            duration: {
                type: Number,
                required: 'Exercise duration (min)?',
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            weight: {
                type: Number,
            },
            distance: {
                type: Number,
            },
        },
    ],
});
const Workouts = mongoose.model('Workout', workoutSchema);
module.exports = Workouts;
