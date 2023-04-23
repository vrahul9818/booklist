import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/bookcontext";
import  { useContext } from "react";
import "./editbook.css"

const Editbook = () =>{
    const navigate = useNavigate();
    const { selectedBook, setSelectedBook } = useContext(DataContext);
    console.log(selectedBook,"dit");

    const deletecurrent = () =>{
        console.log(selectedBook._id)
        axios
        .delete("http://localhost:8081/book/bookstore/delete", {
          data: { id: selectedBook._id },
        })
        .then((response) => {
          console.log(response.data, "response axios");
          navigate("/dispUserbook");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const editcurrent =()=>{
        console.log(selectedBook)
        navigate("/editcurrbook")
    }
    const backToBookDisp =()=>{
        navigate("/dispUserbook")
    }
    const logout = () => {
      localStorage.setItem("token", "");
      console.log(localStorage.getItem("token"));
      navigate("/")
    }

    return(<>
    <button onClick={backToBookDisp}>Show book list</button>
    <button onClick={logout}>Log Out</button>
    <h1>BOOK'S RECORD</h1>
    <h2>view book info</h2>

    <table>
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>context</th>
                <th>name</th>
              </tr>
            </thead>
            <tbody>
                <tr >
                  <td>{ 1}</td>
                  <td>title</td>
                  <td>{selectedBook.title}</td>
                </tr>
                <tr >
                  <td>{ 2}</td>
                  <td>Author</td>
                  <td>{selectedBook.Author}</td>
                </tr>
                <tr >
                  <td>{ 3}</td>
                  <td>ISBN</td>
                  <td>{selectedBook.isbn}</td>
                </tr>
                <tr >
                  <td>{ 4}</td>
                  <td>Publisher</td>
                  <td>{selectedBook.publisher}</td>
                </tr>
                <tr >
                  <td>{ 5}</td>
                  <td>Publisher Date</td>
                  <td>{selectedBook.date}</td>
                </tr>
                <tr >
                  <td>{ 6}</td>
                  <td>Description</td>
                  <td>{selectedBook.description}</td>
                </tr>
            </tbody>
          </table>
        <div className="editoptions">
            <button onClick={deletecurrent}>Delete</button>
            <button onClick={editcurrent}>edit</button>
        </div>
    
    </>)
}

export default Editbook;