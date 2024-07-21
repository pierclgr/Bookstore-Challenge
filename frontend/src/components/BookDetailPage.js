import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deleteBook } from '../api';
import { fetchBookById } from '../api';
import './BookDetailPage.css';
import ConfirmationDialog from './ConfirmationDialog';

const BookDetailPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleDelete = () => {
        setDialogOpen(true);
    };

    const handleConfirm = () => {
        deleteBook(id);
        setDialogOpen(false);
        handleBackClick();
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

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
        navigate("/");
    };

    if (!book) {
        return <div>Book not found!</div>;
    }

    return (
        <div className="book-detail-page">
            <ConfirmationDialog
                isOpen={isDialogOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
                message="Are you sure you want to delete this item?"
            />
            <h1>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publication Year:</strong> {book.publication_year}</p>
            <p><strong>Price:</strong> ${formatPrice(book.price)}</p>
            <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
            <button onClick={handleBackClick}>Back to Library</button>
            <Link to={`/edit/${id}`}>
                <button className="edit-button">Edit</button>
            </Link>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default BookDetailPage;
