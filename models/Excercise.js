const mongoose = require('mongoose')

const excerciseSchema = new mongoose.Schema({
    excerciseName: { type: String, required: true },
    setsNumber: { type: Number, required: true, min: 0, max: 6 },
    repNumber: { type: Number, required: true, min: 0 },
    guidingGIF: { type: String },
    instructions: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ExcersiceCategory' }
}, { timestamps: true })

const Excercise = mongoose.model('Excercise', excerciseSchema)

module.exports = Excercise;