import React, { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // Fetch students
  const fetchStudents = () => {
    fetch("http://127.0.0.1:5000/students")
      .then((response) => response.json())
      .then((data) => setStudents(data));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add student
  const addStudent = () => {
    fetch("http://127.0.0.1:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: parseInt(age),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchStudents(); // refresh list
        setName("");
        setAge("");
      });
  };
  const deleteStudent = (id) => {
    fetch(`http://127.0.0.1:5000/students/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        fetchStudents();
      });
  };
  const updateStudent = (id) => {
    const newName = prompt("Enter new name:");
    const newAge = prompt("Enter new age:");

    fetch(`http://127.0.0.1:5000/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        age: parseInt(newAge),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchStudents();
      });
  };
  return (
    <div className="container">
      <h2 className="title">Student Management System</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button onClick={addStudent}>Add Student</button>

      <h3>Student List</h3>

      {students.map((student) => (
        <div className="student-card" key={student.id}>
          <span>
            {student.name} - {student.age}
          </span>

          <div>
            <button onClick={() => updateStudent(student.id)}>Update</button>

            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
