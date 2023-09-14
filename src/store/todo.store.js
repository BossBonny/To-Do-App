import { Todo } from '../todos/models/todo.model.js';


export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('initStore ');
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );

    state.todos = todos;
    state.filter = filter;
}


const saveStateLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state))
}

const getTodos = ( filter = Filters.All ) => {
    switch(filter) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);

        default: 
            throw new Error(`Option ${filter} is not valid`);
    }
}

const addTodo = ( description ) => {
    if( !description ) throw new Error('Description is required');

    state.todos.push( new Todo(description));

    saveStateLocalStorage();
}

const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateLocalStorage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);

    saveStateLocalStorage();
}

const deleteCompleted = (todoId) => {
    state.todos = state.todos.filter( todo => !todo.done );

    saveStateLocalStorage();
}

const setFilter = ( newfilter = Filters.All ) => {
    state.filter = newfilter;

    saveStateLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore,
    loadStore,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter
}