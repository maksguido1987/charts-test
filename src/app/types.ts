export interface Chart {
  id: number;
  createAt: string;
  data: ChartData[];
  color?: string;
  stroke?: string;
  lineWidth?: number;
}

export interface ChartData {
  year: number;
  value: number;
}
