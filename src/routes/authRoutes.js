const express = require("express");
const tempAuth = require("../middleware/tempAuth");
const {
    register,
    login,
    setupMFA,
    verifyMFA,
  } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/mfa/setup", tempAuth, setupMFA);
router.post("/mfa/verify", tempAuth, verifyMFA);

module.exports = router;