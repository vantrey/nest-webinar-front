import React, {useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {ErrorContext} from "../ErrorContext";
import './Form.css';
import {getAxiosInstance} from "../axiosInstnce";

function AddBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [ageRestriction, setAgeRestriction] = useState('');
    const [image, setImage] = useState('');
    const history = useHistory();
    const { setError } = useContext(ErrorContext);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await getAxiosInstance().post(
                '/books',
                { title, author, ageRestriction, image },
            );
            history.push('/books');
        } catch (error: any) {
            setError(error)
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <input type="number" placeholder="Age Restriction" value={ageRestriction} onChange={(e) => setAgeRestriction(e.target.value)} required />
            <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
            <button type="submit">Add Book</button>
        </form>
    );
}

export default AddBook;
