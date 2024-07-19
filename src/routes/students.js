import express from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/students.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/students", ctrlWrapper(getStudents));
router.get("/students/:studentId", ctrlWrapper(getStudentById));

router.post("/students", jsonParser, ctrlWrapper(createStudent));
router.delete("/students/:studentId", ctrlWrapper(deleteStudent));
router.put("/students/:studentId", jsonParser, ctrlWrapper(updateStudent));

export default router;
