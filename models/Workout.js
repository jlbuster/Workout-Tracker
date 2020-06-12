const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date()
  },
  exercises: [
      {
          type: {
              type: String, 
              trim: true,
              required: 'Please enter an exercise type'
          },
          name: {
              type: String,
              trim: true,
              required: 'Please enter the name of the exercise'
          },
          duration: {
              type: Number,
              required: 'Please enter the duration'
          },
          weight: {
              type: Number
          },
          reps: {
              type: Number
          },
          sets: {
              type: Number
          },
          distance: {
              type: Number
          }
      }
  ]
},
{
    toJSON: { virtuals: true }
}
)

workoutSchema.virtual('totalDuration').get(function() {
    
    return this.exercises.reduce(
        (total, exercise) => total + exercise.duration,
        0
    ) 

})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout