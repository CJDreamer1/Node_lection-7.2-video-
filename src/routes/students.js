import express from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
  changeStudentDuty,
} from "../controllers/students.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { studentSchema } from "../validations/students.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/students", ctrlWrapper(getStudents));
router.get("/students/:id", isValidId, ctrlWrapper(getStudentById));

router.post(
  "/students",
  jsonParser,
  validateBody(studentSchema),
  ctrlWrapper(createStudent)
);
router.delete("/students/:id", isValidId, ctrlWrapper(deleteStudent));
router.put("/students/:id", isValidId, jsonParser, ctrlWrapper(updateStudent));
router.patch(
  "/students/:id/duty",
  isValidId,
  jsonParser,
  ctrlWrapper(changeStudentDuty)
);

export default router;
