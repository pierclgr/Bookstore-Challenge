import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deleteBook } from '../api';
import { fetchBookById } from '../api';
import './BookDetailPage.css';
import ConfirmationDialog from './ConfirmationDialog';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const imageEndpoint = 'https://api.openai.com/v1/images/generations'; 
const textEndpoint = 'https://api.openai.com/v1/chat/completions';

async function getChatGPTResponse(prompt) {
    try {
        const response = await fetch(textEndpoint, {
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

const BookDetailPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [bookCover, setBookCover] = useState(null);

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
            .then(data => {
                setBook(data);
                generateBookCover(data);
            })
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

    const generateBookCover = async (bookData) => {
        var textPrompt = "Generate a prompt to generate an image representing the following book. Please use your prior knowlege about the opera and the information given here. Also take the main and most important characters and include them in the description. Make it not so long but include details that reflect the theme of the opera. Also specify to not inlcude text in the generated image."
        textPrompt += `Title: ${bookData.title}\nAuthor: ${bookData.author}\nYear: ${bookData.publication_year}\n`
        if (bookData.description !== "" && bookData.description !== null) {
            textPrompt += `Description: ${bookData.description}.`
        }
        var imageDescription = await getChatGPTResponse(textPrompt);
        console.log(imageDescription);

        try {
            const response = await fetch(imageEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: imageDescription,
                    n: 1,
                    size: '512x512'
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            const imageUrl = data.data[0].url;
            console.log('Generated Image URL:', imageUrl);
            
            setBookCover(imageUrl);
            document.getElementById("cover_id").textContent = "";
        } catch (error) {
            console.error('Error generating book cover:', error);
            document.getElementById("cover_id").textContent = `Error generating book cover: ${error}`;
        }
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
            {bookCover && (
                <div className="book-cover">
                    <img src={bookCover} alt={`Cover for ${book.title}`} />
                </div>
            )}
            <p id="cover_id">Creating image...</p>
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
