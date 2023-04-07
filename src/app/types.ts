export interface Chart {
  id: string;
  createAt: number;
  data: ChartData[];
}

interface ChartData {
  year: string;
  value: number;
}
