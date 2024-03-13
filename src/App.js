import React, {useState, useEffect} from 'react';
import './App.css';
import Form from'./components/Form';
import ToDoList from './components/TodoList';

function App() {

  

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("All")
  const [filterTodos, setFilterTodos] = useState([])

  useEffect(() =>{
    getLocalTodos()
  }, [])

  
  useEffect(() => {
    filterHandler();
    saveLocalTodos(localStorage.setItem('todos', JSON.stringify(todos)))
  }, [todos, status]);

  const filterHandler = () => {
    switch (status){
      case "completed":
        setFilterTodos(todos.filter((todo) => todo.completed === true))
        break;
      case "uncompleted":
        setFilterTodos(todos.filter((todo) => todo.completed === false))
        break;
    default:
      setFilterTodos(todos);
      break;
    }
  }

  const saveLocalTodos = () =>{
      localStorage.setItem("todos", JSON.stringify(todos))
  }

  const getLocalTodos = () =>{
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]))
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"))
      setTodos(todoLocal)
    } 
  }

  return (
    <div classname="App">
      <header>
        <h1>To Do List</h1>
      </header>
      <Form
      inputText = {inputText} 
      todos = {todos} 
      setTodos = {setTodos} 
      setInputText = {setInputText}
      setStatus = {setStatus}
      />
      <ToDoList
      setTodos = {setTodos}
      todos= {todos} 
      filterTodos={filterTodos}
      />
    </div>
  )
}

export default App;
