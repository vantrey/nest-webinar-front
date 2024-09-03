import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './BookDetails.css';
import {getAxiosInstance} from "../axiosInstnce";
import {ErrorContext} from "../ErrorContext"; // Подключаем CSS для стилизации

interface Book {
    id: number;
    title: string;
    author: string;
    ageRestriction: number;
    ownerId: number;
    image: string;
}

const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [editMode, setEditMode] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [ageRestriction, setAgeRestriction] = useState<number>(0);
    const [image, setImage] = useState<string>('');

    const { setError } = useContext(ErrorContext);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const axiosInstance = getAxiosInstance();
                const response = await axiosInstance.get(`/books/${id}`);
                const bookData = response.data;
                setBook(bookData);
                setTitle(bookData.title);
                setAuthor(bookData.author);
                setAgeRestriction(bookData.ageRestriction);
                setImage(bookData.image || '');
            } catch (error: any) {
                setError(error)
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const handleSave = async () => {
        if (!book) return;

        const updatedFields: Partial<Book> = {};

        if (title !== book.title) updatedFields.title = title;
        if (author !== book.author) updatedFields.author = author;
        if (ageRestriction !== book.ageRestriction) updatedFields.ageRestriction = ageRestriction;
        if (image !== book.image) updatedFields.image = image;

        if (Object.keys(updatedFields).length === 0) {
            setEditMode(false);
            return; // Ничего не изменилось
        }

        try {
            const axiosInstance = getAxiosInstance();
            await axiosInstance.put(`/books/${id}`, updatedFields);
            setBook({ ...book, ...updatedFields });
            setEditMode(false);
        } catch (error: any) {
            setError(error)
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!book) {
        return <p>No book found</p>;
    }

    return (
        <div className="book-details-container">
            <div className="book-details">
                {editMode ? (
                    <div className="book-edit-form">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Author"
                        />
                        <input
                            type="number"
                            value={ageRestriction}
                            onChange={(e) => setAgeRestriction(Number(e.target.value))}
                            placeholder="Age Restriction"
                        />
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Image URL"
                        />
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <img
                            src={book.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Open_book_nae_02.svg/800px-Open_book_nae_02.svg.png'}
                            alt={book.title}
                            className="book-image"
                        />
                        <div className="book-info">
                            <h2>{book.title}</h2>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Age Restriction:</strong> {book.ageRestriction}+</p>
                            <p><strong>Owner ID:</strong> {book.ownerId}</p>
                            <button onClick={() => setEditMode(true)}>Edit</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BookDetails;
