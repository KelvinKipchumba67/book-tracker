import axios from 'axios';


const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});


export const getBooks = (params) => api.get('/books', { params });
export const addBook = (data) => api.post('/books', data);
export const updateBook = (id, data) => api.put(`/books/${id}`, data);
export const deleteBook = (id) => api.delete(`/books/${id}`);


export default api;