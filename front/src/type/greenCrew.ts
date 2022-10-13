import { Cpi } from "./dodream";

export interface IGreenCrew {
  title: string;
  date: string;
  course: string;
  distance: string | number;
  leadTime: string;
  maxMember: number;
  level: number;
  curMember: number;
  content: string;
  trafficInfo: string;
  Cpi: Cpi[];
}
