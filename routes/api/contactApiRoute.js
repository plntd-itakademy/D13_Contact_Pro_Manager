const express = require("express");
const router = express.Router();
const Task = require("../../models/task");

router.route("/tasks").get((req, res) => {
  Task.find()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json(error));
});

router.route("/new").post((req, res) => {
  let task = new Task(req.body);

  task
    .save()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json(error));
});

router
  .route("/:id")
  .get((req, res) => {
    Task.findOne({ _id: req.params.id })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  })
  .put((req, res) => {
    Task.updateOne({ _id: req.params.id }, req.body)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  })
  .delete((req, res) => {
    Task.deleteOne({ _id: req.params.id })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  });

module.exports = router;
