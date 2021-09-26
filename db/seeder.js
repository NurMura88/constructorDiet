const mongoose = require('mongoose')
const Food = require('../models/food')
const chalk = require('chalk')
const { urlMongo } = require("../bin/www");



let array = [{ mealTime: 'Завтрак', weight: 150, kall: 300, proteins: 12, fats: 2, carbohydrates: 5, title: 'Греча с молоком' },
{ mealTime: 'Завтрак', weight: 200, kall: 400, proteins: 10, fats: 4, carbohydrates: 8, title: 'Котлетка с порешкой' },
{ mealTime: 'Завтрак', weight: 30, kall: 50, proteins: 3, fats: 0, carbohydrates: 9, title: 'Набор орешков' },
{ mealTime: 'Завтрак', weight: 100, kall: 200, proteins: 6, fats: 30, carbohydrates: 5, title: 'Сосиски и рис' },
{ mealTime: 'Обед', weight: 300, kall: 500, proteins: 10, fats: 15, carbohydrates: 4, title: 'Борстч' },
{ mealTime: 'Обед', weight: 500, kall: 600, proteins: 14, fats: 30, carbohydrates: 10, title: 'Стейк и макарошки' },
{ mealTime: 'Обед', weight: 270, kall: 400, proteins: 17, fats: 8, carbohydrates: 18, title: 'Тушеная капуста' },
{ mealTime: 'Обед', weight: 300, kall: 200, proteins: 27, fats: 1, carbohydrates: 17, title: 'Салатик' },
{ mealTime: 'Обед', weight: 310, kall: 450, proteins: 15, fats: 5, carbohydrates: 11, title: 'Макарошки с сыром' },
{ mealTime: 'Ужин', weight: 100, kall: 200, proteins: 14, fats: 30, carbohydrates: 10, title: 'Яишенка' },
{ mealTime: 'Ужин', weight: 150, kall: 250, proteins: 11, fats: 4, carbohydrates: 6, title: 'Омлет' },
{ mealTime: 'Ужин', weight: 70, kall: 30, proteins: 1, fats: 1, carbohydrates: 10, title: 'Рыбка' },
{ mealTime: 'Ужин', weight: 100, kall: 400, proteins: 13, fats: 20, carbohydrates: 10, title: 'Шаурма' },
{ mealTime: 'Полдник', weight: 50, kall: 50, proteins: 10, fats: 0, carbohydrates: 15, title: 'Сок' },
{ mealTime: 'Полдник', weight: 70, kall: 100, proteins: 6, fats: 7, carbohydrates: 4, title: 'Пирожок с капустой' },
{ mealTime: 'Полдник', weight: 30, kall: 150, proteins: 17, fats: 1, carbohydrates: 6, title: 'Вареное яичко' },
{ mealTime: 'Перекус', weight: 60, kall: 80, proteins: 3, fats: 15, carbohydrates: 10, title: 'Чипсики' },
{ mealTime: 'Перекус', weight: 50, kall: 100, proteins: 4, fats: 11, carbohydrates: 4, title: 'Бутерброд с колбаской' },
{ mealTime: 'Перекус', weight: 10, kall: 50, proteins: 3, fats: 5, carbohydrates: 8, title: 'Конфетка' },


]
function seed(array) {
  mongoose.connect("mongodb+srv://admin:admin@cluster0.pbna6.mongodb.net/Pohudei?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
  console.log(chalk.red('Сервер стартанул, все норм'))
  Food.insertMany(array)

}

seed(array)


