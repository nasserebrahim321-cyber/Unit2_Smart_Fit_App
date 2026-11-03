const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
    planName: { type: String, required: true },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Excercise' }],
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    daysToExcercise: [{ type: String, enum: ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'] }]
}, { timestamps: true })

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;