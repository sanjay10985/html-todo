const express = require("express");
const bodyParser = require("body-parser");
const path = require("path")
const fs = require("fs")



const app = express();
app.use(bodyParser.json());

const indexPath = path.join(__dirname,'index.json');



app.get("/todos",(req,res) =>{
  fs.readFile(indexPath,"utf8",(err,file) =>{
    if(err) throw err;
    res.send(JSON.parse(file));
  })
})


app.post("/todos",(req,res) =>{
  var todos = [];
  const newTodo = {
    id: Math.floor(Math.random() * 10000),
    todo: req.body.todo,
  }
  fs.readFile(indexPath,"utf8",(err,file) =>{
    if(err) throw err;
    todos = JSON.parse(file);
    todos.push(newTodo);
    console.log(todos);
    fs.writeFile(indexPath,JSON.stringify(todos),(err) =>{
      if(err) throw err;
      console.log("it's written in the file");
      res.send(newTodo);
    })
  })
})

const todoCreate = (todos,id) =>{
  newTodos = []
  todos.forEach(todo => {
    if(todo.id !== id){
      newTodos.push(todo);
}});
return newTodos;
}

app.delete("/todos/:id",(req,res) =>{
  const readFile = fs.readFile(indexPath,"utf8",(err,file) =>{
    if(err) throw err;
  const todos = JSON.parse(file);
  const newTodos = todoCreate(todos,parseInt(req.params.id));
  fs.writeFile(indexPath,JSON.stringify(newTodos),(err) =>{
    if(err) throw err.message;
    console.log("it's written in the file");
    res.send(newTodos);
  })
  })
  
})

// use global array to store the todo

// var todos = [];

// app.get("/todos", (req, res) => {
//   res.send(todos);
// })

// // using body to post the data

// app.post("/todos", (req, res) => {
//   const todo = {
//     todo : req.body.todo,
//   };
//   console.log(todo);
//   todos.push(todo);
//   res.send(todo);
// })

app.get("/",(req,res) =>{
  res.sendFile(path.join(__dirname,"index.html"));
})
// use header to post the data

// app.post("/todos/", (req, res) => {
//   const todo = req.headers.todo;
//   console.log(todo);
//   todos.push(todo);
//   res.send(todo);
// })


// use params to post the data

// app.post("/todos/:todo", (req, res) => {
//   const todo = req.params.todo;
//   console.log(todo);
//   todos.push(todo);
//   res.send(todos);
// })

app.listen(3000);
