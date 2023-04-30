import React from 'react'
import { useSelector } from 'react-redux';
import Todo from './Todo';

function TodoList() {
    // state management
    let todos = useSelector((state) => state.todo.todos);

    return (
        <ul className="todos-list">
            {todos && todos.length > 0 ?
                (
                    todos.map((todo, index) =>
                        <Todo key={index} todo={todo} />
                    )
                ) :
                <li><span>No Todo Item</span></li>}
        </ul>
    )
}

export default TodoList