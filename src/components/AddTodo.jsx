import React, { useState } from 'react'
import { addTodo } from '../slices/todoSlice';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';

function AddTodo() {
    const [input, setInput] = useState("");

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

    return (
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
    )
}

export default AddTodo