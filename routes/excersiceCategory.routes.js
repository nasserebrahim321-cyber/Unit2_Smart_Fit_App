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
    res.redirect('/excercat');
})

router.get('/edit/:id', async (req, res) => {
    const foundCategory = await Category.findById(req.params.id);
    res.render('category/edit-category.ejs', { category: foundCategory })

})

router.put('/edit/:id', async (req, res) => {
    const updatedCategory = {
        name: req.body.name
    }

    await Category.findByIdAndUpdate(req.params.id, updatedCategory)
    res.redirect('/excercat');
})

router.delete('/delete/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.redirect('/excercat');
})



module.exports = router