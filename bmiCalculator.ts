// underweight < 18.5 kg/m2
// normal 18.5 to 25
// overweight 25 to 30
// obese > 30

type Height = number
type Weight = number

const caclulateBmi = (height: Height, weight: Weight): string => {
  const bmiHeight = height / 100
  const bmi = weight / (bmiHeight ^ 2)

  if (bmi <= 18.5) {
    return 'Underweight'
  } else if (bmi > 18.5 && bmi <= 25) {
    return 'Normal (healthy weight)'
  } else if (bmi > 25 && bmi <= 30) {
    return 'Overweight'
  } else if (bmi > 30) {
    return 'Obese'
  }
}

console.log(caclulateBmi(180, 74))
