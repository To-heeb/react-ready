import { createSlice } from "@reduxjs/toolkit";

let todos = JSON.parse(window.localStorage.getItem('todos')) || [];

const saveToStorage = (todos) => {
    window.localStorage.setItem('todos', JSON.stringify(todos))
}

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: todos,
    },
    reducers: {
        addTodo: (state, action) => {
            todos = [
                ...todos,
                {
                    ...action.payload,
                }
            ]
            saveToStorage(todos);
        }
    }
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
// events are called actions in redux, that is why it is dispatched like laravel events