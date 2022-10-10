// 제출용이 아닌 데이터를 채워놓기 위한 알고리즘입니다.

const maria = require("./maria");

var data = require("../../../../data/dodream/organized_dodream_");

var x = data.data;

for (i = 0; i < x.length; i++) {
  maria.query(
    "INSERT INTO WALK(course_level, course_name, cpi_idx, distance, relate_subway, area_gu, lead_time, detail_course, course_category_nm, x, y) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    [
      x[i].course_level,
      x[i].course_name,
      x[i].cpi_idx,
      x[i].distance,
      x[i].relate_subway,
      x[i].area_gu,
      x[i].lead_time,
      x[i].detail_course,
      x[i].course_category_nm,
      x[i].x,
      x[i].y,
    ],
  );
  console.log(i);
}
