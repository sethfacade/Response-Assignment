const router = require("express").Router();
// Using a created database model for Student //
const Student = require("./db/student");
// Post route //

router.post("/submit", async (req, res, next) => {
  try {
    const { choiceA, choiceB, choiceC } = req.body;
    const dataToCreate = { choiceA, choiceB, choiceC };
    let temp = false;

    for (let choices in dataToCreate) {
      dataToCreate[choices] = dataToCreate[choices].toLowerCase();
      if (dataToCreate[choices] === "calculus") {
        temp = true;
      }
    }
    if (temp) {
      const data = await Student.create(dataToCreate);
      res.json(data);
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
