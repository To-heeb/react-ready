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
            state.todos = todos
        },
        deleteTodo: (state, action) => {
            todos = todos.filter((todo) => todo.id !== action.payload.id)
            saveToStorage(todos);
            state.todos = todos
        },
        updateTodo: (state, action) => {
            todos = todos.map(todo => {
                if (todo.id === action.payload.id) {
                    //console.log(action.payload)
                    return {
                        ...action.payload,
                    }
                }
                return todo
            });
            saveToStorage(todos);
            state.todos = todos
        },
        clearTodos: (state, action) => {
            todos = todos.filter((todo) => !todo.complete)
            saveToStorage(todos);
            state.todos = todos
        },
    }
});

export const { addTodo, deleteTodo, updateTodo, clearTodos } = todoSlice.actions;
export default todoSlice.reducer;
// events are called actions in redux, that is why it is dispatched like laravel events