const router = require('express').Router()
const WorkoutPlan = require('../models/WorkoutPlan')
const WorkoutSession = require('../models/WorkoutSession')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/:wID/begin', isSignedIn, async (req, res) => {
    const foundWP = await WorkoutPlan.findById(req.params.wID).populate(['exercises', 'assignedTo'])
    const now = new Date();
    res.render('workoutSession/beginTraining.ejs', { workoutPlan: foundWP, startedAt: now });

})

//create new session in db
router.post('/:wID/complete', isSignedIn, async (req, res) => {
    let { owner, startedAt, finishedAt, WorkoutPlan } = req.body
    WorkoutPlan = req.params.wID;
    finishedAt = new Date();
})

module.exports = router