const router = require("express").Router();
const Student = require("./db/student");
// Since I am using Sequelize ORM, direct SQL injection into input fields would not work //
// Post route //
router.post("/submit", async (req, res, next) => {
  try {
    const { choiceA, choiceB, choiceC } = req.body;
    const dataToCreate = { choiceA, choiceB, choiceC };
    let validation = false;

    for (let choices in dataToCreate) {
      dataToCreate[choices] = dataToCreate[choices].toLowerCase();
      if (dataToCreate[choices] === "calculus") {
        validation = true;
      }
    }
    if (validation) {
      await Student.create(dataToCreate);
      res.status(201).send("You have succesful submitted your courses");
    } else {
      return res
        .status(406)
        .send("You need to have calculus in one of your inputs");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
