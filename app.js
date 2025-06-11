import express from "express";
import employees from "./db/employees.js";

console.log("Employees imported:", employees);
console.log("Employees length:", employees.length);

const app = express();

let lastRandomIndex = -1;

app.get("/", (req, res) => {
  res.status(200).send("Hello employees!");
});

app.get("/employees", (req, res) => {
  res.status(200).json(employees);
});



app.get("/employees/random", (req, res) => {
  console.log("GET /employees/random called");
  if (!Array.isArray(employees)) {
    console.error("employees is not an array");
    return res.status(500).json({ message: "Internal Server Error" });
  }
  if (employees.length === 0) {
    console.error("employees array is empty");
    return res.status(404).json({ message: "Employee not found" });
  }

  let randomIndex;

  if (employees.length === 1) {
    randomIndex = 0;
  } else {
    do {
      randomIndex = Math.floor(Math.random() * employees.length);
    } while (randomIndex === lastRandomIndex);
  }



  lastRandomIndex = randomIndex;
  res.status(200).json(employees[randomIndex]);
});

app.get("/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find(emp => emp.id === id);
  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});
export default app;