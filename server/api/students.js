// An instructor can only access their own students' data.
const router = require("express").Router();
const { prisma } = require("../db/common");
// require("dotenv").config();

// Deny access if user is not logged in
router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});

// Get all students
router.get("/", async (req, res, next) => {
  try {
    const students = await prisma.student.findMany();
    res.send(students);
  } catch (error) {
    next(error);
  }
});

// Get a student by id
router.get("/:id", async (req, res, next) => {
  try {
    const student = await prisma.student.findFirstOrThrow({
      where: {
        id: parseInt(req.params.id),
        instructorId: parseInt(req.user.id),
      },
    });
    if (!student) {
      return res.status(404).send("Student not found.");
    }
    res.send(student);
  } catch (error) {
    next(error);
  }
});

// Create a new student
router.post("/", async (req, res, next) => {
  try {
    const student = await prisma.student.create({
      data: {
        name: req.body.name,
        cohort: parseInt(req.body.cohort),
        instructorId: req.user.id,
      },
    });
    res.send(student);
  } catch (error) {
    next(error);
  }
});

// Update a student
router.put("/:id", async (req, res, next) => {
  try {
    const student = await prisma.student.update({
      where: {
        id: parseInt(req.params.id),
        instructorId: req.user.id,
      },
      data: {
        name: req.body.name,
        cohort: parseInt(req.body.cohort),
      },
    });
    res.send(student);
  } catch (error) {
    next(error);
  }
});

// Delete a student by id
router.delete("/:id", async (req, res, next) => {
  try {
    const student = await prisma.student.delete({
      where: {
        id: parseInt(req.params.id),
        // instructorId: req.user.id,
      },
    });
    if (!student) {
      return res.status(404).send("Student not found.");
    }
    res.send(student);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
