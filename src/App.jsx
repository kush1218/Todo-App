import { useState, useEffect } from "react"
import TodoInput from "./TodoInput"
import TodoList from "./assets/TodoList"

function App() {

  const [todos, setTodos] = useState([
  ])
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos:
      newList }))
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodos(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
    return todoIndex !== index})
    persistData(newTodoList)
    setTodos(newTodoList)

  }

  function handleEditTodo(index) {
    const valueToEdit = todos[index]
    setTodoValue(valueToEdit)
    handleDeleteTodos(index)
  }

  function handleReorderTodos() {
    // Shuffle the array of todos
    const shuffledTodos = [...todos].sort(() => Math.random() - 0.5);
    setTodos(shuffledTodos);
    persistData(shuffledTodos); // Update localStorage with the reordered list
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, [])

  return (
    <>
      <TodoInput 
        todoValue={todoValue} 
        setTodoValue={setTodoValue} 
        handleAddTodos={handleAddTodos} 
      />
      <TodoList 
        handleEditTodo={handleEditTodo} 
        handleDeleteTodos={handleDeleteTodos} 
        todos={todos} 
      />
      
      {/* Reorder Button */}
      <button onClick={handleReorderTodos}>Reorder List</button>
    </>
  );
}
  

export default App
