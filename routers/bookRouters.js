import express from "express";
import {createBook,getAllBooks,getBookById, updateBook,deleteBook} from "../controllers/bookController";

const router = express.Router();

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;