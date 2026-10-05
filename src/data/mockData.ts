
export type ScreenName =
  | 'login'
  | 'dashboard'
  | 'plots'
  | 'plotDetails'
  | 'recommendation'
  | 'recommendationWhy'
  | 'irrigation'
  | 'irrigationSuccess'
  | 'history'
  | 'help'
  | 'chat';

export type Tab = 'home' | 'plots' | 'history' | 'help';

export interface Plot {
  id: string;
  name: string;
  area: number;
  soilType: string;
  variety: string;
  plantingDate: string;
  stage: string;
  stageDay: number;
  moisture: number;
  status: 'not-required' | 'soon' | 'required';
  moistureHistory: number[];
}

export interface IrrigationRecord {
  id: string;
  date: string;
  plotName: string;
  duration: number;
  waterUsed: number;
}

export interface Alert {
  id: string;
  plotName: string;
  message: string;
  type: 'required' | 'soon' | 'info';
  time: string;
}

export const plots: Plot[] = [
  {
    id: '01',
    name: 'Plot 01 - North Field',
    area: 2.0,
    soilType: 'Black soil',
    variety: 'Co 86032',
    plantingDate: '15 Jan 2026',
    stage: 'Tillering',
    stageDay: 95,
    moisture: 68,
    status: 'not-required',
    moistureHistory: [72, 70, 69, 71, 68, 66, 68],
  },
  {
    id: '02',
    name: 'Plot 02 - East Field',
    area: 1.5,
    soilType: 'Red soil',
    variety: 'Co 419',
    plantingDate: '20 Jan 2026',
    stage: 'Grand Growth',
    stageDay: 110,
    moisture: 45,
    status: 'soon',
    moistureHistory: [55, 52, 50, 48, 47, 46, 45],
  },
  {
    id: '03',
    name: 'Plot 03 - South Field',
    area: 3.0,
    soilType: 'Loamy soil',
    variety: 'Co 86032',
    plantingDate: '10 Jan 2026',
    stage: 'Grand Growth',
    stageDay: 125,
    moisture: 72,
    status: 'not-required',
    moistureHistory: [75, 74, 73, 74, 72, 71, 72],
  },
  {
    id: '04',
    name: 'Plot 04 - West Field',
    area: 2.5,
    soilType: 'Black soil',
    variety: 'Co 419',
    plantingDate: '05 Jan 2026',
    stage: 'Grand Growth',
    stageDay: 120,
    moisture: 32,
    status: 'required',
    moistureHistory: [50, 48, 44, 40, 38, 35, 32],
  },
];

export const irrigationHistory: IrrigationRecord[] = [
  { id: '1', date: '28 Sep 2026', plotName: 'Plot 01', duration: 30, waterUsed: 3000 },
  { id: '2', date: '25 Sep 2026', plotName: 'Plot 03', duration: 40, waterUsed: 4000 },
  { id: '3', date: '22 Sep 2026', plotName: 'Plot 02', duration: 35, waterUsed: 3500 },
  { id: '4', date: '18 Sep 2026', plotName: 'Plot 01', duration: 30, waterUsed: 3000 },
  { id: '5', date: '15 Sep 2026', plotName: 'Plot 04', duration: 45, waterUsed: 4500 },
  { id: '6', date: '12 Sep 2026', plotName: 'Plot 03', duration: 40, waterUsed: 4000 },
  { id: '7', date: '08 Sep 2026', plotName: 'Plot 02', duration: 35, waterUsed: 3500 },
];

export const weeklyWaterUsage = [
  { day: 'Mon', value: 3000 },
  { day: 'Tue', value: 0 },
  { day: 'Wed', value: 4000 },
  { day: 'Thu', value: 3500 },
  { day: 'Fri', value: 0 },
  { day: 'Sat', value: 4500 },
  { day: 'Sun', value: 3000 },
];

export const alerts: Alert[] = [
  { id: '1', plotName: 'Plot 04', message: 'Irrigation Required', type: 'required', time: '2 min ago' },
  { id: '2', plotName: 'Plot 02', message: 'Irrigation Soon', type: 'soon', time: '1 hour ago' },
  { id: '3', plotName: 'Plot 01', message: 'Moisture level healthy', type: 'info', time: '3 hours ago' },
];

export interface ChatMessage {
  id: string;
  sender: 'farmer' | 'agronomist';
  text: string;
}

export const chatMessages: ChatMessage[] = [
  { id: '1', sender: 'agronomist', text: 'Hello Ramesh! How can I help you with your sugarcane crop today?' },
  { id: '2', sender: 'farmer', text: 'My Plot 04 leaves are turning yellow at the tips. What should I do?' },
  { id: '3', sender: 'agronomist', text: 'Yellow tips can indicate water stress or nutrient deficiency. Since your soil moisture is low (32%), I recommend irrigating immediately. Consult an agronomist before applying fertiliser.' },
];

export const faqs = [
  { q: 'How does the AI decide when to irrigate?', a: 'The AI checks your soil moisture, weather forecast, crop growth stage, and days since last irrigation to recommend the best time and amount of water.' },
  { q: 'What moisture level is considered low?', a: 'Below 40% is considered low (red), 40-55% is moderate (amber), and above 55% is healthy (green).' },
  { q: 'Can I get alerts on my phone?', a: 'SMS delivery is not connected in this prototype. Field alerts are available on the dashboard.' },
  { q: 'How accurate are the recommendations?', a: 'Recommendations and confidence values are illustrative. Accuracy requires validation against real sensor readings and agronomic reference data before commissioning.' },
  { q: 'What should I do during the Grand Growth stage?', a: 'Sugarcane needs the most water during Grand Growth (90-150 days). Irrigate every 7-10 days and ensure moisture stays above 50%.' },
];

