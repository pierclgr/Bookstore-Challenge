import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetailPage from './components/BookDetailPage';
import AddBookPage from './components/AddBookPage';
import EditBookPage from './components/EditBookPage';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <nav className="navbar">
                    <ul>
                        <li><a href="/">Library</a></li>
                        <li><a href="/add">Add Book</a></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/book/:id" element={<BookDetailPage />} />
                    <Route path="/add" element={<AddBookPage />} />
                    <Route path="/edit/:id" element={<EditBookPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

