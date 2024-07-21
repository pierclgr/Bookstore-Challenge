import React, { useState } from 'react';
import { fetchBooks } from '../api';
import {useNavigate} from 'react-router-dom';
import './MagicSuggestionPage.css';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const endpoint = 'https://api.openai.com/v1/chat/completions';

async function getChatGPTResponse(prompt) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error performing search:', error);
        return null;
    }
}

function formatBooks(books) {
    return books.map(book => {
        const formatField = (label, value) => {
            if (!value) return ''; 
            if (label === 'Price') return `${label}: $${value}`;
            return `${label}: ${value}`;
        };

        const formattedFields = [
            formatField('ID', book.id),
            formatField('Title', book.title),
            formatField('Author', book.author),
            formatField('Year', book.publication_year),
            formatField('Price', book.price),
            formatField('Description', book.description)
        ].filter(field => field)
        .join('\n');

        return formattedFields;
    }).join('\n\n');
}

const MagicSuggestionPage = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (query === "" || query === null) {
            setError("Please specify what you're looking for")
        } else {
            try {
                setLoading(true);
                setError(null);
    
                const books = await fetchBooks();
                if (books && books.length > 0) {
                    const formattedBooks = formatBooks(books);
                    var prompt = `We have the following books available:\n${formattedBooks}\n\n`
                    prompt += `A user is requesting a suggestion about a book and has indicated the following needs:\n${query}\n\n`;
                    prompt += "Please, using the list of books provided and their details, the needs indicated by the user and the prior knowlege you specifically have on each book, give me a book that can satisfy the user."
                    prompt += "Only answer giving me the ID of the book, taken directly by the list of books."
                    
                    const bookId = await getChatGPTResponse(prompt);
                    navigate("/book/"+bookId);
                } else {
                    setError('No books available in the library.');
                }
            } catch (err) {
                setError('Error performing search: ' + err);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="magic-suggestion-page">
            <h1>Magic Suggestion</h1>
            <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe what you're looking for..."
                rows="6"
                cols="50"
                required
            />
            <button onClick={handleSearch} type="submit">Suggest me</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default MagicSuggestionPage;
