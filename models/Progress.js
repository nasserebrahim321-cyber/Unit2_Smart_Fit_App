const mongoose = require('mongoose')

const progressSchema = new mongoose.Schema({
    setNumber: { type: Number, required: true, min: 0, max: 7 },
    repNumber: { type: Number, required: true, min: 0, max: 30 },
    weight: { type: Number, required: true, min: 0, max: 1000 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    excercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Excercise' }
}, { timestamps: true })

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;