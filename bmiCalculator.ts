// underweight < 18.5 kg/m2
// normal 18.5 to 25
// overweight 25 to 30
// obese > 30

interface BmiValues {
  height: number
  weight: number
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const caclulateBmi = (height: number, weight: number): string => {
  const bmiHeight = (height / 100) ** 2
  const bmi = weight / bmiHeight

  if (bmi <= 18.5) {
    return 'Underweight'
  } else if (bmi > 18.5 && bmi <= 25) {
    return 'Normal (healthy weight)'
  } else if (bmi > 25 && bmi <= 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(caclulateBmi(height, weight))
} catch (e) {
  console.log('Oh my there was an error: ', e.message)
}

export { caclulateBmi }
