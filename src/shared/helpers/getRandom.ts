import { Chart, ChartData } from "../../app/types";
import { v4 as uuidv4 } from "uuid";

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomChartsData = (charts = 10): Chart[] => {
  if (charts > 500) throw new Error("Max limit charts - 500");

  const result: Chart[] = [];

  for (let i = 0; i <= charts; i += 1) {
    const dataLength = getRandomNumber(10, 30);
    /** дата, с которой нужно начинать отсчёт */
    const firstYear = new Date().getFullYear() - dataLength;

    const data: ChartData[] = [];

    for (let j = 0; j < dataLength; j += 1) {
      data.push({
        year: firstYear + j,
        value: getRandomNumber(1, 50),
      });
    }

    result.push({
      id: uuidv4(),
      createAt: generateRandomDOB(2018),
      data,
      color: getRandomColor(),
      lineWidth: getRandomNumber(1, 5),
    });
  }

  return result;
};

// https://stackoverflow.com/questions/31378526/generate-random-date-between-two-dates-and-times-in-javascript
export const generateRandomDOB = (year: number): string => {
  const random = getRandomDate(
    new Date(`${String(year)}-01-01T00:00:00.271Z`),
    new Date()
  );
  return random.toISOString();
};

const getRandomDate = (from: Date, to: Date) => {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  return new Date(fromTime + Math.random() * (toTime - fromTime));
};

// https://stackoverflow.com/questions/1484506/random-color-generator
export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};
