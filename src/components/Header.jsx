import React, { useState } from 'react'
import Title from './Title'
import { useSelector } from 'react-redux';

function Header({ children }) {
    const [completed, setCompleted] = useState("none")

    // state management
    let todos = useSelector((state) => state.todo.todos);

    const clearCompleteTodos = (event) => {
        const count = todos.filter(todo => todo.complete).length
        if (count === 0) return;
        if (window.confirm(`Delete ${count} todos?`)) {
            dispatch(clearTodos())
        }
        setCompleted('none')
    }


    return (
        <div className='todos-header'>
            <Title >Todo List</Title>
            <div>
                <p>You have <span className="todos-count">{todos.length}</span> items</p>
                <button type="button" className="todos-clear" style={{ display: completed }} onClick={(e) => clearCompleteTodos(e)}>Clear Completed</button>
            </div>
        </div>
    )
}

export default Header