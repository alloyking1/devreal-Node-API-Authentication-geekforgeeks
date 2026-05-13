const express = require("express");
const tempAuth = require("../middleware/tempAuth");
const {
    register,
    login,
    setupMFA,
    verifyMFA,
    verifyMFALogin,
    getMe,
    refreshAccessToken,
    logout,
    logoutAll,
  } = require("../controllers/authController");
const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/mfa/setup", tempAuth, setupMFA);
router.post("/mfa/verify", tempAuth, verifyMFA);
router.post("/mfa/login/verify", verifyMFALogin);
router.get("/me", requireAuth, getMe);
router.post("/refresh", refreshAccessToken);

router.post("/logout", logout);
router.post("/logout-all", requireAuth, logoutAll);

module.exports = router;