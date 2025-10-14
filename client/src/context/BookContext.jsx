import React, { useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { BookStateContext, BookDispatchContext } from './contexts';


const initialState = { books: [], loading: false, error: null };


function reducer(state, action) {
switch (action.type) {
case 'LOADING':
return { ...state, loading: true };
case 'SET_BOOKS':
return { ...state, books: action.payload, loading: false };
case 'ADD_BOOK':
return { ...state, books: [action.payload, ...state.books] };
case 'UPDATE_BOOK':
return {
...state,
books: state.books.map((b) => (b._id === action.payload._id ? action.payload : b)),
};
case 'DELETE_BOOK':
return { ...state, books: state.books.filter((b) => b._id !== action.payload) };
case 'ERROR':
return { ...state, error: action.payload, loading: false };
default:
throw new Error('Unknown action');
}
}


export const BookProvider = ({ children }) => {
const [state, dispatch] = useReducer(reducer, initialState);


useEffect(() => {
const fetchBooks = async () => {
dispatch({ type: 'LOADING' });
try {
const res = await api.getBooks();
dispatch({ type: 'SET_BOOKS', payload: res.data });
} catch (err) {
dispatch({ type: 'ERROR', payload: err.message });
}
};
fetchBooks();
}, []);


return (
<BookStateContext.Provider value={state}>
<BookDispatchContext.Provider value={dispatch}>{children}</BookDispatchContext.Provider>
</BookStateContext.Provider>
);
};

export default BookProvider;