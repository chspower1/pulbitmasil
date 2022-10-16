const maria = require("./maria");

function addHours(numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000 - date.getSeconds() * 1000);

  return date;
}

module.exports = function updatecrew() {
  setInterval(() => {
    maria.query(`SELECT id,startAt FROM GREENCREW`, function (err, rows, fields) {
      for (i in rows) {
        if (rows[i].startAt < addHours(9)) {
          if (new Date().getHours() == 18) {
            maria.query(`INSERT INTO GREENCREW(title, startAt) VALUES("아침 풀빛마실",?)`, [addHours(12)]);
            maria.query("DELETE FROM GREENCREW WHERE id = ?", [rows[i].id]);
          } else if (new Date().getHours() == 12) {
            maria.query(`INSERT INTO GREENCREW(title, startAt) VALUES("저녁 풀빛마실",?)`, [addHours(6)]);
            maria.query("DELETE FROM GREENCREW WHERE id = ?", [rows[i].id]);
          } else if (new Date().getHours() == 6) {
            maria.query(`INSERT INTO GREENCREW(title, startAt) VALUES("점심 풀빛마실",?)`, [addHours(6)]);
            maria.query("DELETE FROM GREENCREW WHERE id = ?", [rows[i].id]);
          }
        }
      }
    });
  }, 1000);
};
