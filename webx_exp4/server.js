const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String
});

const Student = mongoose.model('Student', studentSchema);

// ROUTES

// Get all students
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Get a student by ID
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (err) {
    res.status(400).send('Invalid ID');
  }
});

// Add a new student
app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
});

// Update a student by ID
app.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (err) {
    res.status(400).send('Invalid ID');
  }
});

// Delete a student by ID
app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).send('Student not found');
    res.send('Student deleted successfully');
  } catch (err) {
    res.status(400).send('Invalid ID');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});
