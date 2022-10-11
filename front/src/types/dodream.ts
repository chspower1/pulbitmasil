export interface IDodream {
  index: number;
  course_category_nm: string;
  course_name: string;
  area_gu: string;
  content: string;
  course_level: number;
  detail_course: string;
  distance: string | number;
  lead_time: string | number;
  reg_date: number;
  relate_subway: string;
  traffic_info: string;
}

export interface CourseName {
  area_gu: string;
  detail_course: string;
  distance: string;
  lead_time: string;
  relate_subway: string;
  course_level: string;
  content: string;
  traffic_info: string;
  reg_date: number;
  CPI: Cpi[];
}

export interface Cpi {
  cpi_name: string;
  x: string;
  y: string;
}
