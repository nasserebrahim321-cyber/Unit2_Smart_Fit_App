const mongoose = require('mongoose')

const excerciseSchema = new mongoose.Schema({
    excerciseName: { type: String, required: true },
    guidingGIF: { type: String },
    instructions: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ExcersiceCategory' }
}, { timestamps: true })

const Excercise = mongoose.model('Excercise', excerciseSchema);

module.exports = Excercise;