import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userControler.js";

const router = express.Router();
//
router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
// router.get('/users', (req, res) => {
//     res.send('Get all users');
// });
export default router;
