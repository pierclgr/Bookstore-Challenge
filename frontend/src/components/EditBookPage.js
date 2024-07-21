import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById, updateBook } from '../api';
import './EditBookPage.css'; // Create this CSS file for styling

const EditBookPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: '',
        author: '',
        year: '',
        price: '',
        description: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await fetchBookById(id);
                setBook(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        getBook();
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
            navigate(`/books/${id}`);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
                    <input type="number" name="year" value={book.year} onChange={handleChange} required />
                </label>
                <label>
                    Price:
                    <input type="number" step="0.01" name="price" value={book.price} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={book.description} onChange={handleChange} required />
                </label>
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
};

export default EditBookPage;
