export enum Sex {
  Male = "m",
  Female = "f",
}

const foodNames: string[] = [
  "Kellogg's Tresor",
  "Weihenstephan Haltbare Milch",
  "Mühle Frikadellen",
  "Volvic Tee",
  "Neuburger lockerer Sahnepudding",
  "Lagnese Viennetta",
  "Schöller 10ForTwo",
  "Ristorante Pizza Salame",
  "Schweppes Ginger Ale",
  "Mini Babybel",
];
const foodCalories: number[] = [137, 64, 271, 40, 297, 125, 482, 835, 37, 59];
const foodServings: number[] = [4, 8, 4, 12, 1, 6, 2, 2, 25, 20];

export function calcDateOnDiet(
  currentWeightKg: number,
  targetWeightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex,
): number {
  const weightGainKg = targetWeightKg - currentWeightKg;
  if (weightGainKg < 0) {
    throw new Error(`This diet is for gaining weight, not losing it!`);
  }
  if (ageY < 16 || heightM < 1.5) {
    throw new Error(`You do not qualify for this kind of diet.`);
  }
  let dailyCaloriesOnDiet = 0;
  for (const index in foodNames) {
    const calories = foodCalories[index] || 0;
    const servings = foodServings[index] || 0;
    dailyCaloriesOnDiet += calories * servings;
  }
  let dailyCaloriesBasicMetabolicRate = calculateBMR(currentWeightKg, heightM, ageY, sex);
  const dailyExcessCalories =
    dailyCaloriesOnDiet - dailyCaloriesBasicMetabolicRate;
  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }
  return Math.ceil((9000 * weightGainKg) / dailyExcessCalories);
}

function calculateBMR(weight: number, height: number, age: number, sex: Sex): number {
  if (sex === Sex.Male) {
    return Math.ceil(66.47 + 13.7 * weight + 5.003 * height * 100.0 - 6.75 * age);
  } else {
    return Math.ceil(655.1 + 9.563 * weight + 1.85 * height * 100.0 - 4.676 * age);
  }
}
