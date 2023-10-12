const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.get("/new", contactController.getNewContact);
router.post("/new", contactController.postNewContact);

router.get("/edit/:id", contactController.getEditContact);
router.post("/edit/:id", contactController.postEditContact);

router.get("/:id", contactController.viewContact);

router.get("/delete/:id", contactController.deleteContact);

module.exports = router;
