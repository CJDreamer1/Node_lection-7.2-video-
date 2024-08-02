import * as StudentService from "../services/students.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

async function getStudents(req, res) {
  console.log(req.user);
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const students = await StudentService.getStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    parentId: req.user._id,
  });

  res.send({ status: 200, students });
}
async function getStudentById(req, res, next) {
  const { id } = req.params;

  const student = await StudentService.getStudentById(id, req.user._id);

  if (student === null) {
    return next(createHttpError(404, "Student not found"));
  }

  res.send({ status: 200, data: student });
}

async function createStudent(req, res) {
  const student = {
    name: req.body.name,
    gender: req.body.gender,
    email: req.body.email,
    year: req.body.year,
    parentId: req.user._id,
  };

  const createdStudent = await StudentService.createStudent(student);
  res
    .status(201)
    .send({ status: 201, message: "Student created", data: createdStudent });
}

async function deleteStudent(req, res, next) {
  const { id } = req.params;
  const result = await StudentService.deleteStudent(id);
  if (result === null) {
    return next(createHttpError(404, "Student not found"));
  }
  res.status(204).end();
}

async function updateStudent(req, res, next) {
  const { id } = req.params;

  const student = {
    name: req.body.name,
    gender: req.body.gender,
    email: req.body.email,
    year: req.body.year,
  };

  const result = await StudentService.updateStudent(id, student);

  if (result === null) {
    return next(createHttpError(404, "Student not found"));
  }
  res
    .status(200)
    .send({ status: 200, message: "Student updated", data: result });
}

async function changeStudentDuty(req, res) {
  const { id } = req.params;

  const duty = req.body.duty;

  const result = await StudentService.changeStudentDuty(id, duty);

  console.log({ result });

  res.send("Duty");
}

export {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
  changeStudentDuty,
};
