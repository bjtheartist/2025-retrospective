export interface AnnualData {
  year: string;
  value: number; // e.g., Investment in Billions or Deal Count
  label?: string;
}

export interface Startup {
  name: string;
  description: string;
  funding: string;
}

export interface SectorData {
  id: string;
  type?: 'analysis' | 'editorial';
  title: string;
  shortTitle: string;
  overview: string;
  stats?: {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
    trendValue: string;
  }[];
  chartData?: AnnualData[];
  chartLabel?: string;
  startups?: Startup[];
  insights?: string;
  futureTrend?: string;
  image: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}