const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getHome);
router.post("/", userController.logUser);
router.get("/logout", userController.logoutUser);

module.exports = router;
