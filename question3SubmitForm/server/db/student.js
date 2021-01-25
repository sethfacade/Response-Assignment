const Sequelize = require("sequelize");
const db = require("./database");

const Student = db.define("student", {
  choiceA: {
    type: Sequelize.STRING,
  },
  choiceB: {
    type: Sequelize.STRING,
  },
  choiceC: {
    type: Sequelize.STRING,
  },
});

module.exports = Student;
