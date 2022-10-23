import { Cpi } from "./dodream";

export interface IGreenCrew {
  crewId: number;
  id: number;
  title: string;
  startAt: Date;
  course: string;
  distance: string | number;
  leadTime: string;
  maxMember: number;
  level: number;
  curMember: number;
  content: string;
  trafficInfo: string;
  inProgress: number;
  CPI: coordinate[];
}
type coordinate = { x: number; y: number };
export interface SummaryGreenCrew {
  title: string;
  course: string;
  startAt: Date;
  area: string;
}
