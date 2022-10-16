const fs = require("fs");
fs.readFile("./data/2019.json", "utf-8", function (err, data) {
  if (err) throw err;
  const json = JSON.parse(data);
  const keys = Object.keys(JSON.stringify(json));
  const year19 = 0;
  keys.map(key => json[key]);
});
