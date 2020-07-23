interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): Result => {
  const days = exerciseHours.length
  const hoursTrained = exerciseHours.reduce((acc, cur) => acc + cur)
  const hoursPerDay = hoursTrained / days
  const trainingSuccess = hoursPerDay >= target ? true : false

  const daysTrained = (hours: Array<number>): number => {
    let countedDays = 0
    for (let i = 0; i < hours.length; i++) {
      if (hours[i] !== 0) {
        countedDays++
      }
    }
    return countedDays
  }

  const calcRating = (): number => {
    const percentageOfTarget = (hoursPerDay / target) * 100

    if (percentageOfTarget < 80) {
      return 1
    } else if (percentageOfTarget >= 80 && percentageOfTarget < 100) {
      return 2
    } else {
      return 3
    }
  }

  const getRatingDescription = (): string => {
    let rating = calcRating()

    if (rating === 1) {
      return 'You missed the target badly, stay motivated!'
    } else if (rating === 2) {
      return 'Not bad, but could be better'
    } else {
      return 'Great work! You passed your target!'
    }
  }

  return {
    periodLength: days,
    trainingDays: daysTrained(exerciseHours),
    success: trainingSuccess,
    rating: calcRating(),
    ratingDescription: getRatingDescription(),
    target: target,
    average: hoursPerDay,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
