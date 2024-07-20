import { Student } from "../models/student.js";

function getStudents() {
  return Student.find();
}

function getStudentById(studentId) {
  return Student.findById(studentId); //Student.findOne({_id: studentId}) метод написання на простому JS бе звикористання Mongo
}

function createStudent(student) {
  return Student.create(student);
}

function deleteStudent(studentId) {
  return Student.findByIdAndDelete(studentId); //Student.findOneAndDelete({_id: studentId})
}

function updateStudent(studentId, student) {
  return Student.findByIdAndUpdate(studentId, student, { new: true }); //Student.findOneAndUpdate({_id: studentId})
  // { new: true } означає що в онсольку виведе новий документ, за замовчуванням повертає той, який має змінити до зміни
}

function changeStudentDuty(studentId, duty) {
  return Student.findByIdAndUpdate(studentId, { onDuty: duty }, { new: true }); // тут вписується {new: true} для того щоб вклазати що результатом ми хочемо бачити об`єкт
}

export {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
  changeStudentDuty,
};
