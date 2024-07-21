import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchBookById } from '../api';
import './BookDetailPage.css';

const BookDetailPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookById(id)
            .then(data => setBook(data))
            .catch(error => console.error('Error fetching book details:', error));
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

    if (!book) {
        return <div>Book not found!</div>;
    }

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
