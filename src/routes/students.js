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
import { auth } from "../middlewares/auth.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/students", auth, ctrlWrapper(getStudents));
router.get("/students/:id", auth, isValidId, ctrlWrapper(getStudentById));

router.post(
  "/students",
  auth,
  jsonParser,
  validateBody(studentSchema),
  ctrlWrapper(createStudent)
);
router.delete("/students/:id", auth, isValidId, ctrlWrapper(deleteStudent));
router.put(
  "/students/:id",
  isValidId,
  auth,
  jsonParser,
  ctrlWrapper(updateStudent)
);
router.patch(
  "/students/:id/duty",
  auth,
  isValidId,
  jsonParser,
  ctrlWrapper(changeStudentDuty)
);

export default router;
