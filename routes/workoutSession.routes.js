const router = require('express').Router();
const WorkoutPlan = require('../models/WorkoutPlan')
const WorkoutSession = require('../models/WorkoutSession')
const Progress = require('../models/Progress')
const Excercise = require('../models/Excercise')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/:wID/begin', isSignedIn, async (req, res) => {
    const foundWP = await WorkoutPlan.findById(req.params.wID).populate(['exercises', 'assignedTo'])
    const now = new Date();
    const excercisesFromWP = foundWP.exercises.map((ex) => {
        return { isComplete: true, excercise: ex }
    })

    res.render('workoutSession/beginTraining.ejs', { workoutPlan: foundWP, exercises: excercisesFromWP, startedAt: now });

})

//create new session in db
router.post('/:wID/complete', isSignedIn, async (req, res) => {
    let { owner, startedAt, finishedAt, WorkoutPlan } = req.body;
    WorkoutPlan = req.params.wID;
    owner = req.session._id;
    finishedAt = new Date();

    const setNumber = req.body.setNumber;
    // const newProgressList = []
    // for (let i in exerciseCheck) {
    //     if (exerciseCheck[i]) {
    //         newProgressList.push({
    //             setNumber: setNumber[i],
    //             repNumber: repNumber[i],
    //             weight: weight[i],
    //             owner: owner,
    //             excercise: exerciseCheck[i]
    //         })
    //     }
    // }

    console.log(setNumber);


    const newWorkoutSession = { owner: owner, startedAt: startedAt, finishedAt: finishedAt, WorkoutPlan: WorkoutPlan }
    await WorkoutSession.create(newWorkoutSession)

    res.redirect('/workplan');


})


module.exports = router