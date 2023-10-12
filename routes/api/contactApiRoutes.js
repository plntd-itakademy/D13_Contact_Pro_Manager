const express = require("express");
const router = express.Router();
const Contact = require("../../models/contact");

router.route("/").get((req, res) => {
  Contact.find()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json(error));
});

router.route("/new").post((req, res) => {
  const contact = new Contact(req.body);

  contact
    .save()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json(error));
});

router
  .route("/:id")

  .get((req, res) => {
    Contact.findOne({ _id: req.params.id })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  })

  .put((req, res) => {
    Contact.updateOne({ _id: req.params.id }, req.body)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  })

  .delete((req, res) => {
    Contact.deleteOne({ _id: req.params.id })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  });

module.exports = router;
