const express = require("express");
const router = express.Router();
const Food = require("../models/food");
console.log(Food)

router.get("/", function (req, res, next) {
  res.render("partials/constructor");
});


// ================================================КОПИРОВАНО===================================
router.post("/", async (req, res) => {
  // Диапазон погрешности
  const procentFatalMax = 1.10; // максимальная погрешность
  const procentFatalMin = 0.85; // минимальная погрешность
  
 
  if (req.body) {
    // Минимальная и максимальная каллорийность для завтрака
    console.log(req.body)
    const { minimum, maximum } = req.body;
    const kallBreakfastMax = maximum * 0.3;
    const kallBreakfastMin = minimum * 0.3;
    // БЖУ для завтрака
    const proteinsB = req.body.proteinsB;
    const fatsB = req.body.fatsB;
    const carbohydratesB = req.body.carbohydratesB;

    const mealTime = req.body.mealTime
    console.log(mealTime);
   
    // =======================Пишу я====================================
    // Минимальная и максимальная каллорийность для обеда
    const kallDinnerMax = maximum * 0.35;
    const kallDinnerMin = minimum * 0.35;
// БЖУ для обеда
const proteinsD = req.body.proteinsD;
const fatsD = req.body.fatsD;
const carbohydratesD = req.body.carbohydratesD;

 // Минимальная и максимальная каллорийность для ужина
 const kallNightDinnerMax = maximum * 0.25;
 const kallNightDinnerMin = minimum * 0.25;
// БЖУ для ужина
const proteinsN = req.body.proteinsN;
const fatsN = req.body.fatsN;
const carbohydratesN = req.body.carbohydratesN;

// Минимальная и максимальная каллорийность для перекуса
const kallSnackMax = maximum * 0.1;
const kallSnackMin = minimum * 0.1;
// БЖУ для перекуса
const proteinsS = req.body.proteinsS;
const fatsS = req.body.fatsS;
const carbohydratesS = req.body.carbohydratesS;


    
    

    // console.log('=========protiki',proteinsB)

    console.log('=========min',kallBreakfastMin)
    console.log('=========max',kallBreakfastMax)
if (mealTime === 3) {
    const breakfast = await Food.find({
      mealTime: "Завтрак",
      kall: { $gte: kallBreakfastMin, $lte: kallBreakfastMax },
      proteins: { $gte: Math.round(proteinsB * procentFatalMin),$lte: Math.round(proteinsB * procentFatalMax)},
    });
  //  console.log( 'завтрак==============================' ,breakfast);




  //  console.log( 'obed==============================' ,obed);
  //  console.log('=========min',kallBreakfastMin)
  //  console.log('=========max',kallBreakfastMax)

    const obed = await Food.find({ mealTime: "Обед",
    kall: { $gte: kallDinnerMin, $lte: kallDinnerMax },
    // proteins: { $gte: Math.round(proteinsD * procentFatalMin),$lte: Math.round(proteinsD * procentFatalMax)},
   });
   console.log( '==============================,yzhin' );
   console.log('=========min',kallNightDinnerMin)
   console.log('=========max',kallNightDinnerMax)
   console.log('=========protici',proteinsN)

    const yzhin = await Food.find({ mealTime: "Ужин",
    kall: { $gte: kallNightDinnerMin, $lte: kallNightDinnerMax },
    proteins: { $gte: Math.round(proteinsN * procentFatalMin),$lte: Math.round(proteinsN * procentFatalMax)},
   });
   console.log(yzhin);
   return res.json({ breakfast, obed, yzhin});

  }
   // ====================== Добавил полдник =================================================

   
    const perecus = await Food.find({ mealTime: "Перекус",
    kall: { $gte: kallSnackMin, $lte: kallSnackMax },
    proteins: { $gte: Math.round(proteinsS * procentFatalMin),$lte: Math.round(proteinsS * procentFatalMax)},
   });
   
  //  console.log( 'perecus==============================' ,perecus);
    // return res.json({ breakfast, obed, yzhin, perecus });

    
  } else {
    return res.redirect("/constructor");
  }
});













module.exports = router;
