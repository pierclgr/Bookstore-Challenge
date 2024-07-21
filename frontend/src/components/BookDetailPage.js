import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchBookById } from '../api';
import './BookDetailPage.css';

const BookDetailPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const formatPrice = (price) => {
        if (typeof price === 'number') {
            return price.toFixed(2);
        } else if (!isNaN(parseFloat(price))) {
            return parseFloat(price).toFixed(2);
        } else {
            return 'N/A';
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!book) return <p>Book not found</p>;

    return (
        <div className="book-detail-page">
            <h1>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publication Year:</strong> {book.publication_year}</p>
            <p><strong>Price:</strong> ${formatPrice(book.price)}</p>
            <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
            <button onClick={handleBackClick}>Back to Library</button>
            <Link to={`/edit/${id}`}>
                <button className="edit-button">Edit</button>
            </Link>
        </div>
    );
};

export default BookDetailPage;
