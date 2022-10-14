import { Cpi } from "./dodream";

export interface IGreenCrew {
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
  cpi: coordinate[];
}
type coordinate = [number, number];
