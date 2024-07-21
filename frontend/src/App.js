import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetailPage from './components/BookDetailPage';
import AddBookPage from './components/AddBookPage'; // Importa il nuovo componente
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <nav className="navbar">
                    <ul>
                        <li><a href="/">Library</a></li> {/* Rinomina Home in Library */}
                        <li><a href="/add-book">Add Book</a></li> {/* Aggiungi link alla pagina di aggiunta */}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/book/:id" element={<BookDetailPage />} />
                    <Route path="/add-book" element={<AddBookPage />} /> {/* Aggiungi la route */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;

