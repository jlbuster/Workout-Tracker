let db = require('../models')
const router = require("express").Router();


    router.get('/api/workouts', (req, res) => {
        db.Workout.find({})
        .then(workout => {
            res.json(workout)
        })
        .catch(err => {
            res.json(err)
        })
    })

    router.post('/api/workouts', async (req, res) => {
        try{
            const response = await db.Workout.create({type: 'workout'})
            res.json(response)
        }
        catch(err) {
            console.log('error creating new workout', err)
        }
    })

    router.put("/api/workouts/:id", ({body, params}, res) => {

        const workoutId = params.id;
        let savedExercises = [];

        db.Workout.find({_id: workoutId})
            .then(dbWorkout => {

                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                console.log(allExercises)
                updateWorkout(allExercises)
            })
            .catch(err => {
                res.json(err);
            });

        function updateWorkout(exercises){
            db.Workout.findByIdAndUpdate(workoutId, {exercises: exercises}, function(err, doc){
            if(err){
                console.log(err)
            }

            })
        }
    })

    router.get('/api/workouts/range', (req, res) => {
        db.Workout.find({})
        .limit(7)
        .then(workout => {
            res.json(workout)
        })
        .catch(err => {
            res.json(err)
        })
    })

module.exports = router