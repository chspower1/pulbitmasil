const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const maria = require("../connect/maria");

const compileSQL = function (folderName, fileName) {
  const filePath = [__dirname, folderName, fileName].join("\\") + ".sql";
  const template = fs.readFileSync(path.join(filePath), { encoding: "utf-8" });
  const preCompiledModel = Handlebars.compile(template);

  return preCompiledModel;
};

const execute = async function (folderName, fileName, context) {
  const preCompiledModel = compileSQL(folderName, fileName);
  const compiledModel = preCompiledModel(context);

  try {
    const res = await maria.promise().query(compiledModel);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { compileSQL };

// execute("/", "test", {
//   table_name: "REVIEW",
//   columns: ["*"],
// });

// const template = fs.readFileSync(path.join(__dirname, "./test.sql"), { encoding: "utf-8" });
// const compiledTemplate = Handlebars.compile(template);
// const context = {
//   table_name: "REVIEW",
//   columns: ["*"],
// };
// const result = compiledTemplate(context);
// console.log(result);

// const a = maria.query(result);
// console.log(a);

// maria.query(result, (err, rows) => {
//   const data = JSON.parse(JSON.stringify(rows));
//   // console.log(data);

// });
