import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlice';

function Todo({ todo, index }) {
    const [isEditing, setIsEditing] = useState(false)
    const [completed, setCompleted] = useState(false)

    const dispatch = useDispatch()
    // state management
    let todos = useSelector((state) => state.todo.todos);
    let todoContent;

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
        if (todo.label == "") return;

        setIsEditing(false);
    }

    const handleChange = (e) => {

        dispatch(updateTodo({
            id: todo.id,
            label: e.target.value.trim(),
            complete: todo.complete,
        }))
    }

    const handleDelete = (todo) => {
        if (window.confirm(`Delete ${todo.label}?`)) {
            dispatch(deleteTodo(todo))
        }
    }

    if (isEditing) {
        todoContent = (
            <>
                <input
                    type="checkbox"
                    defaultChecked={false}
                    onChange={(e) => handleCheck(e, todo)}
                />
                <span><input value={todo.label} onChange={(e) => { handleChange(e) }} /></span>
                <button type="button" className='edit' onClick={() => handleEdit(todo)}></button>
            </>
        );
    } else {
        todoContent = (
            <>
                <input
                    type="checkbox"
                    defaultChecked={todo.complete}
                    onChange={(e) => handleCheck(e, todo)}
                />
                <span>{todo.label}</span>
                <button type="button" className='edit' onClick={() => setIsEditing(true)}></button>
                <button type="button" onClick={() => handleDelete(todo)}></button>
            </>
        );
    }

    return (
        <li key={index} className={(todo.complete) ? 'todos-complete' : ''} >
            {todoContent}
        </li>
    )
}

export default Todo