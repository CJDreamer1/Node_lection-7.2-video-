import createHttpError from "http-errors";
import { Student } from "../models/student.js";

async function getStudents(req, res, next) {
  const students = await Student.find(); //метод .find потрібен, щоб викликати всі елементи колекції
  res.send(students);
  next(error);
}

async function getStudentById(req, res) {
  const { studentId } = req.params;
  const user = await Student.findById(studentId);
  console.log({ user });
  if (user === null) {
    // const error = new Error("Student not found"); це приклад створення кастомної помилки
    // error.status = 404;
    // return next(error);
    return next(createHttpError(404, "Student not found"));
  }
  res.send({ status: 200, data: user });
  next(error);
}

export { getStudents, getStudentById };
