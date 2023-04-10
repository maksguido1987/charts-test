export interface Chart {
  id: number;
  createAt: Date;
  data: ChartData[];
}

export interface ChartData {
  year: number;
  value: number;
}
