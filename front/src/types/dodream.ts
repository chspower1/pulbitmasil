export interface IDodream {
  index: number;
  course_category_nm: string;
  course_name: { [key: string]: CourseName[] };
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
