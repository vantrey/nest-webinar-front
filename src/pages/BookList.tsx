import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {ErrorContext} from "../ErrorContext";
import './BookList.css';
import {getAxiosInstance} from "../axiosInstnce";

function BookList() {
    const [books, setBooks] = useState([]);
    const { setError } = useContext(ErrorContext);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response: any = await getAxiosInstance().get('/books')
                setBooks(response.data);
            } catch (e: any) {
                setError(e)
            }

        };
        fetchBooks();
    }, []);

    return (
        <div className="book-list">
            <h2>Book List</h2>
            <ul>
                {books.map((book: any) => (
                    <li key={book.id}>
                        <Link to={`/books/${book.id}`}>
                            {book.title} (Age Restriction: {book.ageRestriction})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
