async function a() {
  const responce = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  let jsonFromBack = await responce.json();
  photo.src = `/images/${jsonFromBack.key}`;
}
setInterval(a, 1000);

// =========================КОПИРОВАНО=========================================
const minEating = 1000;
const maxEating = 2200;
const breackfastPocent = 30;
const dinnerPocent = 35;
const dinnerNightProcent = 25;
const snackProcent = 10;

const cCalForm = document.querySelector("#cCalForm");

cCalForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let planFood = event.target.planFood.value; // значение БЖУ 25.25.50
  let mealTime = Number(event.target.current.value);

  let kall = Number(event.target.minCCal.value); // значение введенных каллорий

  planFood = planFood.split("/"); // разбиваем БЖУ на массив
  let proteins = Math.round((kall * (planFood[0] / 100)) / 4); //  переводим проценты в количество грамм в день, 75 гр (суточная норма)
  let fats = Math.round((kall * (planFood[1] / 100)) / 9); // считаем жиры 33 гр (суточная норма)

  let carbohydrates = Math.round((kall * (planFood[2] / 100)) / 4); // считаем углеводы 150 гр (суточная норма)

  //Расчет БЖУ для завтрака
  let proteinsB = Math.round(proteins * (breackfastPocent / 100)); //процент протеинов для завтрака
  let fatsB = Math.round(fats * (breackfastPocent / 100)); //процент жиров для завтрака
  let carbohydratesB = Math.round(carbohydrates * (breackfastPocent / 100)); //процент протеинов для завтрака
  // Расчет БЖУ для обеда
  //=======================Пишу я =====================================
  let proteinsD = Math.round(proteins * (dinnerPocent / 100)); //процент протеинов для обеда
  let fatsD = Math.round(fats * (dinnerPocent / 100)); //процент жиров для обеда
  let carbohydratesD = Math.round(carbohydrates * (dinnerPocent / 100)); //процент углеводов для обеда

  // //Расчет БЖУ для ужина
  let proteinsN = Math.round(proteins * (dinnerNightProcent / 100)); //процент протеинов для ужина
  let fatsN = Math.round(fats * (dinnerNightProcent / 100)); //процент жиров для ужина
  let carbohydratesN = Math.round(carbohydrates * (dinnerNightProcent / 100)); //процент углеводов для ужина

  // //Расчет БЖУ для перекуса
  let proteinsS = Math.round(proteins * (snackProcent / 100)); //процент протеинов для перекуса
  let fatsS = Math.round(fats * (snackProcent / 100)); //процент жиров для перекуса
  let carbohydratesS = Math.round(carbohydrates * (snackProcent / 100)); //процент углеводов для перекуса

  console.log("protiki", proteinsB);
  console.log("fats", fatsB);
  console.log("carbohydrates", carbohydratesB);

  const ul = await document.querySelector("#ulList");

  ul.innerHTML = "";

  if (kall >= minEating && kall <= maxEating) {
    const result = await fetch("/constructor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        minimum: kall - 100,
        maximum: kall + 100,
        proteinsB,
        fatsB,
        carbohydratesB,
        proteinsD,
        fatsD,
        carbohydratesD,
        proteinsN,
        fatsN,
        carbohydratesN,
        proteinsS,
        fatsS,
        carbohydratesS,
        mealTime,
      }),
    });

    const res = await result.json();
    console.log(res);

    let keys = Object.values(res);
    console.log(keys);

    keys.forEach((arr) => {
      console.log(arr);

      switch (arr[0].mealTime) {
        case "Завтрак":
          const breackfast = document.createElement("h1");

          breackfast.innerText = `${arr[0].mealTime}`;
          ul.appendChild(breackfast);
          break;
        case "Обед":
          const obed = document.createElement("h1");
          obed.innerText = `${arr[0].mealTime}`;
          ul.appendChild(obed);
          break;
        case "Ужин":
          console.log("work");
          const yzhin = document.createElement("h1");
          yzhin.innerText = `${arr[0].mealTime}`;
          ul.append(yzhin);
          break;
        // ===================================================
        case "Перекус":
          const perekus = document.createElement("h1");
          perekus.innerText = `${arr[0].mealTime}`;
          ul.append(perekus);
          break;
        default:
          break;
      }

      arr.forEach((element) => {
        const li = document.createElement("li");
        const spanCcal = document.createElement("span");
        const spanProt = document.createElement("span");
        const spanFats = document.createElement("span");
        const spanCarbo = document.createElement("span");
        const weight = document.createElement("span");

        li.innerText = `${element.title}`;
        li.id = element._id;
        spanCcal.innerText = `Количество каллорий: ${element.kall}`;
        spanProt.innerText = `Количество протеинов (гр.): ${element.proteins}`;
        spanFats.innerText = `Количество жиров (гр.): ${element.fats}`;
        spanCarbo.innerText = `Количество углеводов (гр.): ${element.carbohydrates}`;
        weight.innerText = `Масса (гр.): ${element.weight}`;

        ul.appendChild(li);
        ul.appendChild(spanCcal);
        ul.appendChild(spanProt);
        ul.appendChild(spanFats);
        ul.appendChild(spanCarbo);
        ul.appendChild(weight);
      });
    });
  } else {
    console.log("Error");
  }
});
