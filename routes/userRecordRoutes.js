import express from 'express';
const {
    getUserRecords,
    createUserRecord,
    updateUserRecord,
    deleteUserRecord,
} = require("../controllers/userRecordController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const router = express.Router();
router.get("/", authenticateToken, getUserRecords);
router.post("/", authenticateToken, createUserRecord);
router.put("/:id", authenticateToken, updateUserRecord);
router.delete("/:id", authenticateToken, deleteUserRecord);

export default router;
