const mongoose = require("mongoose")

const excersiceCategorySchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true })

const ExcersiceCategory = mongoose.model('ExcersiceCategory', excersiceCategorySchema)

module.exports = ExcersiceCategory;