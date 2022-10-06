// 제출용이 아닌 데이터를 채워놓기 위한 알고리즘입니다.

const maria = require("./maria");

var data = require("../../../../data/trash_can/json/trash_count.json");

var x = data.data;

for (i = 0; i < x.length; i++) {
  maria.query("INSERT INTO TRASHCOUNT(borough, category, count) VALUES(?,?,?)", [
    x[i].borough,
    x[i].category,
    x[i].count,
  ]);
  console.log(i);
}
