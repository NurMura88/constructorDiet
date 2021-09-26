const express = require("express");
const router = express.Router();
const Food = require("../models/food");

// mealTime: String,
// weight: Number ,
// kall: Number ,
// proteins: Number ,
// fats: Number ,
// carbohydrates: Number ,
// title:String

router
  .route("/")
  .get(function (req, res, next) {
    res.render("partials/admin");
  })
  .post(async (req, res, next) => {
    const success = `Блюда добавлены`;
    let error = "Не все поля заполнены";
    try {
      //диструктуризация обьекта в переменные
      let { mealTime, title, weight, kall, proteins, fats, carbohydrates } = req.body;
      
      let findTitle = await Food.find({title});

      if(findTitle.length  !== 0) {
        // console.log("Данные не внесены");
        error ='Блюдо уже внесено !'
        return res.status(300).json({ error });
      }

      //проверка на заполенность полей
      if (mealTime, title && weight && kall && proteins && fats && carbohydrates) {
        await Food.create({
          mealTime,
          title,
          weight,
          kall,
          proteins,
          fats,
          carbohydrates,
        });
        return res.status(200).json({ success });
      } else {
        console.log("Данные не внесены");
        return res.status(300).json({ error });
      }
    } catch (error) {
      // alert('Обратитесь к администратору');
      return res.status(500);
    }
    // console.log(req.body);
  });

module.exports = router;
