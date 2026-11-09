const router = require('express').Router()
const WorkoutPlan = require('../models/WorkoutPlan')
const Excercise = require('../models/Excercise')
const isSignedIn = require('../middleware/is-signed-in');

router.get('/', isSignedIn, async (req, res) => {
    const all_Workout_plan = await WorkoutPlan.find().populate(['exercises', 'assignedTo']);
    res.render('workoutPlan/all-workout-plan.ejs', { workoutPlans: all_Workout_plan });
})

router.get('/new', isSignedIn, async (req, res) => {
    const all_excercises = await Excercise.find().populate('category');
    const all_exercises_sorted = all_excercises.sort((a, b) => {
        return a.category.name.localeCompare(b.category.name);
    });

    const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    res.render('workoutPlan/create-workout-plan.ejs', { days: days, excercises: all_exercises_sorted })
})

router.post('/new', isSignedIn, async (req, res) => {
    const { planName, exercises, days } = req.body;
    const assignedTo_ = req.session.user._id;
    const workoutPlan_ = { planName: planName, exercises: exercises, assignedTo: assignedTo_, daysToExcercise: days }
    await WorkoutPlan.create(workoutPlan_);
    res.redirect('/workplan')
})

router.delete('/:id/delete', isSignedIn, async (req, res) => {
    const deletedWP = await WorkoutPlan.findByIdAndDelete(req.params.id);
    res.redirect('/workplan')
})

router.get('/:id/edit', isSignedIn, async (req, res) => {
    const foundWP = await WorkoutPlan.findById(req.params.id).populate(['exercises', 'assignedTo']);
    const all_excercises = await Excercise.find().populate('category');
    const all_exercises_sorted = all_excercises.sort((a, b) => {
        return a.category.name.localeCompare(b.category.name);
    });
    const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    res.render('workoutPlan/edit-workout-plan.ejs', { workoutPlan: foundWP, days: days, excercises: all_exercises_sorted })
})

router.put('/:id/edit', isSignedIn, async (req, res) => {
    const { planName, exercises, days } = req.body;

    await WorkoutPlan.findByIdAndUpdate(req.params.id, {
        planName: planName,
        exercises: exercises,
        daysToExcercise: days
    })
    res.redirect('/workplan')
})

module.exports = router