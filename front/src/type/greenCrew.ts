import { Cpi } from "./dodream";

export interface IGreenCrew {
  id: number;
  title: string;
  startAt: string;
  course: string;
  distance: string | number;
  leadTime: string;
  maxMember: number;
  level: number;
  curMember: number;
  content: string;
  trafficInfo: string;
  CPI: coordinate[];
}
type coordinate = { x: number; y: number };
