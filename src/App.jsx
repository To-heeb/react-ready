import { useState } from 'react'
import './App.css'
import Title from './components/Title';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, updateTodo, clearTodos } from './slices/todoSlice';
import { v4 as uuid } from 'uuid';

function App() {
  const [input, setInput] = useState("")
  const [completed, setCompleted] = useState("none")


  // state management
  let todos = useSelector((state) => state.todo.todos);

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

  const handleCheck = (e, todo) => {
    if (e.target.checked) {
      dispatch(updateTodo({
        id: todo.id,
        label: todo.label,
        complete: true,
      }))
    } else {
      dispatch(updateTodo({
        id: todo.id,
        label: todo.label,
        complete: false,
      }))
    }

    const count = todos.filter(todo => todo.complete).length
    console.log(count)
    count == 0 ? setCompleted('none') : setCompleted('block');
  }

  const handleEdit = (todo) => {

    let label = prompt('Update "' + todo.label + '" to')
    console.log(label);
    if (label !== null && label !== '') {
      dispatch(updateTodo({
        id: todo.id,
        label: label.trim(),
        complete: todo.complete,
      }))
    } else if (label === '') {
      alert("Please enter a label")
      return;
    }

  }

  const handleDelete = (todo) => {
    if (window.confirm(`Delete ${todo.label}?`)) {
      dispatch(deleteTodo(todo))
    }
  }


  const clearCompleteTodos = (event) => {
    const count = todos.filter(todo => todo.complete).length
    if (count === 0) return;
    if (window.confirm(`Delete ${count} todos?`)) {
      dispatch(clearTodos())
    }
    setCompleted('none')
  }


  return (
    <div className='todos'>
      <div className='todos-header'>
        <Title >Todo List</Title>
        <div>
          <p>You have <span className="todos-count">{todos.length}</span> items</p>
          <button type="button" className="todos-clear" style={{ display: completed }} onClick={(e) => clearCompleteTodos(e)}>Clear Completed</button>
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
        <input type="submit" className='add' style={{ marginTop: "10px" }} value="Add" />
      </form>
      {/* checked={todo.complete ? ' checked' : ''} */}
      <ul className="todos-list">
        {todos && todos.length > 0 ?
          (
            todos.map((todo, index) =>
              <li key={index} className={(todo.complete) ? 'todos-complete' : ''} >
                <input
                  type="checkbox"
                  defaultChecked={todo.complete}
                  onChange={(e) => handleCheck(e, todo)}
                />
                <span>{todo.label}</span>
                <button type="button" className='edit' onClick={() => handleEdit(todo)}></button>
                <button type="button" onClick={() => handleDelete(todo)}></button>
              </li>
            )
          ) :
          <li><span>No Todo Item</span></li>}
      </ul>
    </div>
  )
}

export default App
