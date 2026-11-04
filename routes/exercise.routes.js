const router = require('express').Router()
const Excercise = require('../models/Excercise')
const Category = require('../models/ExcersiceCategory')

router.get('/', async (req, res) => {
    const all_excercises = await Excercise.find().populate('category');
    res.render('excercise/all-excercises.ejs', { excercises: all_excercises })
})

router.get('/new', async (req, res) => {
    const allCategories = await Category.find();
    res.render('excercise/create-exercise.ejs', { categories: allCategories })
})

router.post('/new', async (req, res) => {
    const newExcercise = {
        excerciseName: req.body.excerciseName,
        guidingGIF: req.body.guidingGIF,
        instructions: req.body.instructions,
        category: req.body.category
    }

    await Excercise.create(newExcercise);

    res.redirect('/excer');
})

router.get('/edit/:id', async (req, res) => {
    const foundExcercise = await Excercise.findById(req.params.id);
    const all_categories = await Category.find();
    res.render('excercise/edit-excercise.ejs', { excercise: foundExcercise, categories: all_categories })

})

router.put('/edit/:id', async (req, res) => {
    const updatedExcercise = {
        excerciseName: req.body.excerciseName,
        guidingGIF: req.body.guidingGIF,
        instructions: req.body.instructions,
        category: req.body.category
    }

    await Excercise.findByIdAndUpdate(req.params.id, updatedExcercise)
    res.redirect('/excer')
})

router.delete('/delete/:id', async (req, res) => {
    await Excercise.findByIdAndDelete(req.params.id)
})


module.exports = router