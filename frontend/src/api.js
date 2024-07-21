import axios from 'axios';

const API_URL = 'http://localhost:8000/api/books/';

export const fetchBooks = (filter = '', sortOrder = 'title') => {
    return axios.get(API_URL, {
        params: {
            title: filter,
            ordering: sortOrder,
        }
    }).then(response => response.data);
};

export const fetchBookById = (id) => {
    return axios.get(`${API_URL}${id}/`).then(response => response.data);
};

export const createBook = (book) => {
    return axios.post(API_URL, book);
};

export const updateBook = (id, book) => {
    return axios.put(`${API_URL}${id}/`, book);
};

export const deleteBook = (id) => {
    return axios.delete(`${API_URL}${id}/`);
};
