const express = require("express");
const fs = require("fs");

const server = express();
const PORT = 5050;
server.use(express.json());

const dbPath = "./db.json";

const getTodos = () => {
  const rawData = fs.readFileSync(dbPath);
  return JSON.parse(rawData).todos;
};

server.get("/todos", (req, res) => {
  const todos = getTodos();
  res.json(todos);
});

server.post("/todos/addtodo", (req, res) => {
  // Read existing data from db.json
  const rawData = fs.readFileSync(dbPath);
  const dbData = JSON.parse(rawData);
  // Append req.body data to existing data
  dbData.todos.push(req.body);
  // Write updated data back to db.json
  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
  // Respond with updated todos
  res.json(dbData.todos);
});



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// fs.appendFileSync(dbPath, JSON.stringify(req.body));
// console.log(req.body);
// res.send("data added in db.json");