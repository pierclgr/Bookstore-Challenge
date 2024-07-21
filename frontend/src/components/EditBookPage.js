import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById, updateBook } from '../api';
import './EditBookPage.css';

const EditBookPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: '',
        author: '',
        publication_year: '',
        price: '',
        description: '',
    });

    useEffect(() => {
        fetchBookById(id)
            .then(data => setBook(data))
            .catch(error => console.error('Error fetching book details:', error));
    }, [id]);

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBook(id, book);
            navigate(`/book/${id}`);
        } catch (err) {
            console.error('Error updating book details:', err)
        }
    };

    return (
        <div className="edit-book-page">
            <h1>Edit Book</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={book.title} onChange={handleChange} required />
                </label>
                <label>
                    Author:
                    <input type="text" name="author" value={book.author} onChange={handleChange} required />
                </label>
                <label>
                    Year:
                    <input type="number" name="publication_year" value={book.publication_year} onChange={handleChange} required />
                </label>
                <label>
                    Price:
                    <input type="number" step="0.01" name="price" value={book.price} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={book.description || ''} onChange={handleChange} required />
                </label>
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
};

export default EditBookPage;
