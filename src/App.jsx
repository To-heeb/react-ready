import { useState } from 'react'
import './App.css'
import Title from './components/Title';
import { useDispatch } from 'react-redux';
import { addTodo } from './slices/todoSlice';
import { v4 as uuid } from 'uuid';

function App() {
  const [input, setInput] = useState("")
  const [storage, setStorage] = useState([])

  // state management
  let todos = storage;

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length == 0) return false;

    dispatch(addTodo({
      id: uuid(),
      label: input.trim(),
      complete: false
    }));

    setInput('');
  }

  const saveToStorage = (todos) => {
    setStorage(todos)
    //localStorage.setItem('todos', JSON.stringify(todos))
  }

  const updateTodo = (input) => {
    const id = parseInt(event.target.parentNode.getAttribute('data-id'), 10);
    const complete = event.target.checked;
    todos = todos.map((todo, index) => {
      if (index === id) {
        console.log(todo);
        return {
          ...todo,
          complete
        }
      }
      return todo
    });
    console.log(todos)
    saveToStorage(todos);
  }

  const deleteTodo = (curr_todo) => {
    if (window.confirm(`Delete ${curr_todo.label}?`)) {
      todos = todos.filter((todo, index) => todo.id !== curr_todo.id)
      saveToStorage(todos);
    }
  }


  const clearCompleteTodos = (event) => {
    const count = todos.filter(todo => todo.complete).length
    if (count === 0) return;
    if (window.confirm(`Delete ${count} todos?`)) {
      todos = todos.filter(todo => !todo.complete)
      saveToStorage(todos);
    }
  }


  return (
    <div className='todos'>
      <div className='todos-header'>
        <Title >Todo List</Title>
        <div>
          <p>You have <span className="todos-count"></span> items</p>
          <button type="button" className="todos-clear" style={{ display: "none" }}>Clear Completed</button>
        </div>
      </div>
      <form className="todos-form" name="todos" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="What's next?"
          name="todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      {/* checked={todo.complete ? ' checked' : ''} */}
      <ul className="todos-list">
        {
          todos.map((todo, index) =>
            <li key={index} >
              <input type="checkbox" />
              <span>{todo.label}</span>
              <button type="button" onClick={() => deleteTodo(todo)}></button>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default App
