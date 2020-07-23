interface ExerciseValues {
  exerciseHourValues: Array<number>;
  targetValue: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const processArgs = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
  }

  const target = Number(args[2]);
  const hours = args.slice(3).map((num) => Number(num));

  return {
    targetValue: target,
    exerciseHourValues: hours,
  };
};

const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): Result => {
  const days = exerciseHours.length;
  const hoursTrained = exerciseHours.reduce((acc, cur) => acc + cur);
  const hoursPerDay = hoursTrained / days;
  const trainingSuccess = hoursPerDay >= target ? true : false;

  const daysTrained = (hours: Array<number>): number => {
    let countedDays = 0;
    for (let i = 0; i < hours.length; i++) {
      if (hours[i] !== 0) {
        countedDays++;
      }
    }
    return countedDays;
  };

  const calcRating = (): number => {
    const percentageOfTarget = (hoursPerDay / target) * 100;

    if (percentageOfTarget < 80) {
      return 1;
    } else if (percentageOfTarget >= 80 && percentageOfTarget < 100) {
      return 2;
    } else {
      return 3;
    }
  };

  const getRatingDescription = (): string => {
    const rating = calcRating();

    if (rating === 1) {
      return 'You missed the target badly, stay motivated!';
    } else if (rating === 2) {
      return 'Not bad, but could be better';
    } else {
      return 'Great work! You passed your target!';
    }
  };

  return {
    periodLength: days,
    trainingDays: daysTrained(exerciseHours),
    success: trainingSuccess,
    rating: calcRating(),
    ratingDescription: getRatingDescription(),
    target: target,
    average: hoursPerDay,
  };
};

try {
  const { exerciseHourValues, targetValue } = processArgs(process.argv);
  console.log(calculateExercises(exerciseHourValues, targetValue));
} catch (e) {
  console.log('Oh my there was an error: ', e.message);
}

export { calculateExercises };
