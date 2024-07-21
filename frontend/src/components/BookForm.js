import React, { useState } from 'react';
import { addBook } from '../api';

const BookForm = ({ onBookAdded }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        addBook({
            title,
            author,
            publication_year: publicationYear,
            price
        })
        .then(() => {
            onBookAdded();  // Notify parent component
            setTitle('');
            setAuthor('');
            setPublicationYear('');
            setPrice('');
        })
        .catch(error => {
            console.error('Error adding book:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Book</h2>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
                Author:
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </label>
            <label>
                Publication Year:
                <input type="number" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} required />
            </label>
            <label>
                Price:
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" required />
            </label>
            <button type="submit">Add Book</button>
        </form>
    );
};

export default BookForm;

