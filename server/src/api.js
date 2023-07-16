import axios from "axios";
const api = axios.create({ baseURL: 'http://localhost:8000' });
export const getBook = () => api.get('/books')
export const getBookById = (id) => api.get(`/books/${id}`)
export const createBook = (newBook) => api.post('/books', newBook);
export const updateBook = (id, updateBook) => api.put(`/books/${id}`, updateBook);
export const deleteBook = (id) => api.delete(`/books/${id}`);
