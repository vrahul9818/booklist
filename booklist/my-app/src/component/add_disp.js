import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add_disp.css"

const Addbook = () => {
  

  const navigate = useNavigate();
  const [book, setBook] = useState({
    book_isbn: '',
    book_title: '',
    book_description: '',
    book_publisher: '',
    book_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(book)
    const token = localStorage.getItem("token");
    console.log(token);

    const config = {
      headers: { Authorization: `Bearer${token}` }
    };
    console.log(config,book);
    axios
      .post("http://localhost:8081/book/bookstore", book, config)
      .then((response) => {
        console.log(response);
        navigate("/dispUserbook");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const displayAllUserBook = ()=>{
    navigate("/dispUserbook")
  }
  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/")

  }

  return (
    <div id='addbook'>
    <button onClick={displayAllUserBook}>display Book</button>
    <button onClick={logout}>Log Out</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor='book_isbn'>Book ISBN:</label>
        <input type="text" name='book_isbn' value={book.book_isbn} onChange={handleChange} />

        <label htmlFor='book_title'>Book Title:</label>
        <input type="text" name='book_title' value={book.book_title} onChange={handleChange} />

        <label htmlFor='book_description'>Book Description:</label>
        <input type="text" name='book_description' value={book.book_description} onChange={handleChange} />

        <label htmlFor='book_publisher'>Book Publisher:</label>
        <input type="text" name='book_publisher' value={book.book_publisher} onChange={handleChange} />

        <label htmlFor='book_date'>Book Date:</label>
        <input type="date" name='book_date' value={book.book_date} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
      </div>
  );
};

export default Addbook;
