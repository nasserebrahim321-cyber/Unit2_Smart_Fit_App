const mongoose = require('mongoose');
const WorkoutPlan = require('./WorkoutPlan');

const workoutSessionSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startedAt: { type: Date },
    finishedAt: { type: Date },
    WorkoutPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' }
}, { timestamps: true })

const WorkoutSession = mongoose.model('WorkoutSession', workoutSessionSchema);

module.exports = WorkoutSession