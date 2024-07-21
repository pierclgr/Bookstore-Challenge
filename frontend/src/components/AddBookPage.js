import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../api';
import './AddBookPage.css';

const AddBookPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const newBook = {
            title,
            author,
            publication_year: publicationYear,
            price: parseFloat(price),
            description
        };
        createBook(newBook)
            .then(() => {
                navigate('/');
            })
            .catch(error => console.error('Error adding book:', error));
    };

    return (
        <div className="add-book-page">
            <h1>Add New Book</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="publicationYear">Publication Year:</label>
                    <input
                        type="number"
                        id="publicationYear"
                        value={publicationYear}
                        onChange={(e) => setPublicationYear(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        step="0.01"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBookPage;

