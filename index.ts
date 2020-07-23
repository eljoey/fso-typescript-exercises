import express from 'express';
import { caclulateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!weight || !height) {
    return res.json({
      rerror: 'malformatted parameters',
    });
  }

  const bmi = caclulateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi,
  });
});

app.get('/exercises', (req, res) => {
  const daily_exercises = req.body.daily_exercises;
  const target = req.body.target;

  // ensure all daily_exercise is a number
  const daily_exercises_formatted = [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  for (let i = 0; i < daily_exercises.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    daily_exercises_formatted.push(Number(daily_exercises[i]));
  }

  const checkDailyExercises = (array: Array<number | string>): boolean => {
    for (let i = 0; i < array.length; i++) {
      console.log(array[i]);
      if (!array[i] && array[i] !== 0) {
        return false;
      }
    }
    return true;
  };
  if (!daily_exercises || !target) {
    return res.json({ error: 'parameters missing' });
  }
  if (!Number(target) || !checkDailyExercises(daily_exercises_formatted)) {
    return res.json({ error: 'malformatted parameters' });
  }

  const exerciseResults = calculateExercises(daily_exercises_formatted, target);

  return res.json(exerciseResults);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
