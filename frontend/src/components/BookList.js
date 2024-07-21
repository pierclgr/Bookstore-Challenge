import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api';
import { Link } from 'react-router-dom'; // Importa Link per la navigazione
import './BookList.css';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks()
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const formatPrice = (price) => {
        if (typeof price === 'number') {
            return price.toFixed(2);
        } else if (!isNaN(parseFloat(price))) {
            return parseFloat(price).toFixed(2);
        } else {
            return 'N/A';
        }
    };

    return (
        <div className="book-list-container">
            <h1>Book Inventory</h1>
            <table className="book-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publication Year</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td><Link to={`/book/${book.id}`}>{book.title}</Link></td>
                            <td>{book.author}</td>
                            <td>{book.publication_year}</td>
                            <td>${formatPrice(book.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;

