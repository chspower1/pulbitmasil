export interface IDodream {
  index: number;
  course_category_nm: string;
  course_name: string;
  area_gu: string;
  content: string;
  course_level: number;
  detail_course: string;
  distance: string;
  lead_time: number;
  reg_date: number;
  relate_subway: string;
  traffic_info: string;
  cpi: Cpi[];
}
export interface Cpi {
  cpi: number;
  x: number;
  y: number;
}
