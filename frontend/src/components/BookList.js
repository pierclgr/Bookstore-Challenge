import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api';
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState('');
    const [minYear, setMinYear] = useState('');
    const [maxYear, setMaxYear] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const fetchFilteredBooks = async () => {
        try {
            const response = await fetchBooks();
            setBooks(response);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchFilteredBooks();
    }, [filter]);

    const formatPrice = (price) => {
        if (typeof price === 'number') {
            return price.toFixed(2);
        } else if (!isNaN(parseFloat(price))) {
            return parseFloat(price).toFixed(2);
        } else {
            return 'N/A';
        }
    };

    const handleMinYearChange = (e) => {
        setMinYear(e.target.value);
    };

    const handleMaxYearChange = (e) => {
        setMaxYear(e.target.value);
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleFilterSubmit = () => {
        fetchBooks(filter, minYear, maxYear, minPrice, maxPrice)
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    };

    return (
        <div className="book-list-container">
            <h1>Book Inventory</h1>
            <form className="filter-form">
                <label>
                    Title:
                    <input
                        id="title"
                        type="text"
                        name="title"
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    Author:
                    <input
                        id="author"
                        type="text"
                        name="author"
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    Min year:
                    <input
                        id="min_publication_year"
                        type="number"
                        name="min_publication_year"
                        onChange={handleMinYearChange}
                    />
                </label>
                <label>
                    Max year:
                    <input
                        id="max_publication_year"
                        type="number"
                        name="max_publication_year"
                        onChange={handleMaxYearChange}
                    />
                </label>
                <label>
                    Min price:
                    <input
                        id="min_price"
                        type="number"
                        name="min_price"
                        onChange={handleMinPriceChange}
                    />
                </label>
                <label>
                    Max price:
                    <input
                        id="max_price"
                        type="number"
                        name="max_price"
                        onChange={handleMaxPriceChange}
                    />
                </label>
                <button type="button" className="filter-button" onClick={handleFilterSubmit}>Filter</button>
            </form>
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
