import { calcDateOnDiet, Sex } from "./tanzverbot-diet";

test("Tanzverbot Diet", () => {
  expect(calcDateOnDiet(74, 100, 1.86, 38, Sex.Male)).toBeGreaterThan(0);
});


test("Tanzverbot Diet für weibliche Person mit Zielgewicht", () => {
  expect(calcDateOnDiet(55, 65, 1.65, 25, Sex.Female)).toBeGreaterThan(0);
});

test("Error kleineres Gewicht als start Gewicht", () => {
  expect(() => calcDateOnDiet(80, 70, 1.8, 30, Sex.Male)).toThrow("This diet is for gaining weight");
});
