const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
router.get("/me", protect, (req, res) => {
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        user: req.user,
    });
});

// router.post("/", protect, authorize("admin"), createUser);
// router.get("/", protect, authorize("admin"), getUsers);
// router.put("/:id", protect, authorize("admin"), updateUser);
// router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;