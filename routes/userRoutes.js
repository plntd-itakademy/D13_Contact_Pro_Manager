const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/connection", userController.getConnectionForm);
router.post("/connection", userController.logUser);
router.get("/logout", userController.logoutUser);

module.exports = router;
