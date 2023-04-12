export interface Chart {
  id: string;
  createAt: string | Date;
  data: ChartData[];
  color?: string;
  lineWidth?: number;
}

export interface ChartData {
  year: number;
  value: number;
}
