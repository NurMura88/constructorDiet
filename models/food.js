const mongoose  = require('mongoose')


const foodSchema = mongoose.Schema({
  mealTime: String,
  weight: Number ,
  kall: Number ,
  proteins: Number ,
  fats: Number ,
  carbohydrates: Number ,
  title:String
})

const Food = mongoose.model('Food', foodSchema)


module.exports = Food;

