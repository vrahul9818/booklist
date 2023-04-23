import React, { useState, useEffect } from "react";
import axios from "axios";
import "./displatbook.css"
import bookimage from  "../image/book.jpeg"
import { useNavigate } from "react-router-dom";
import { DataContext } from "./context/bookcontext";
import  { useContext } from "react";

const UserBookdisplay = () => {


    const { selectedBook, setSelectedBook } = useContext(DataContext);
    const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const token = localStorage.getItem("token");
  console.log(token ,"token");

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer${token}` }
    };
    console.log(books,config.headers,"headers")

    axios
      .get("http://localhost:8081/book/bookstore", config)
      .then((response) => {
        console.log(response);
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);


  const handleBookClick = (book) => {
   
    setSelectedBook(book);
    console.log(selectedBook,"sb");
    navigate("/editBook");
  };


const logout = () => {
  localStorage.setItem("token", "");
  console.log(localStorage.getItem("token"));
  navigate("/")
}


  return (
    <div className="user-book-display" id="user1">
      <button id="user2" onClick={()=>{navigate("/addbook")}}>+add a new book</button>
      <button onClick={logout}>Log Out</button>
      <h1>User Book Display</h1>
      <div className="book-list">
        {books.map((book) => (
          <div  onClick={() => handleBookClick(book)} key={book._id} className="book-card">
            <img src={bookimage} alt={book.title} className="book-image" />
            <div className="book-details">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-description">{book.description}</p>
              <p className="book-publisher">{book.publisher}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookdisplay;
