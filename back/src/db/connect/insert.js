// 제출용이 아닌 데이터를 채워놓기 위한 알고리즘입니다.

const maria = require("./maria");

var data = require("../../../../data/dodream/organized_dodream.json");

var x = data.data;

for (let i = 0; i < x.length; i++) {
  // console.log(i);
  for (let j = 0; j < Object.values(x[i].course_name).length; j++) {
    // console.log(j);
    maria.query(
      "INSERT INTO WALK(course_name,course_level,area_gu,reg_date,content,distance,relate_subway,lead_time, detail_course, traffic_info, CPI) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
      [
        Object.values(x[i].course_name)[j][0].course_name,
        Object.values(x[i].course_name)[j][0].course_level,
        Object.values(x[i].course_name)[j][0].area_gu,
        Object.values(x[i].course_name)[j][0].reg_date,
        Object.values(x[i].course_name)[j][0].content,
        Object.values(x[i].course_name)[j][0].distance,
        Object.values(x[i].course_name)[j][0].relate_subway,
        Object.values(x[i].course_name)[j][0].lead_time,
        Object.values(x[i].course_name)[j][0].detail_course,
        Object.values(x[i].course_name)[j][0].traffic_info,
        Object.values(x[i].course_name)[j][0].CPI,
      ],
    );
  }
}
