const router = require('express').Router();
const Category = require('../models/ExcersiceCategory');


router.get('/', async (req, res) => {
    const all_categories = await Category.find()
    res.render('category/all-categories.ejs', { categories: all_categories })
})


router.get('/new', async (req, res) => {
    res.render('category/create-category.ejs')
})

router.post('/new', async (req, res) => {
    const newCategory = { name: req.body.name }
    await Category.create(newCategory)
})

module.exports = router