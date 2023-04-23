import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/bookcontext";
import { useContext, useState } from "react";

const Editcurrbook = () => {
  const { selectedBook, setSelectedBook } = useContext(DataContext);
  console.log(selectedBook, "editeit");

  const navigate = useNavigate();

  const [title, setTitle] = useState(selectedBook.title);
  const [description, setDescription] = useState(selectedBook.description);
  const [publisher, setPublisher] = useState(selectedBook.publisher);
  const [date, setDate] = useState(selectedBook.published_date);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePublisherChange = (event) => {
    setPublisher(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedBook = {
      ...selectedBook,
      title: title,
      description: description,
      publisher: publisher,
      published_date: date,
    };
console.log(updatedBook);
    axios
      .put("http://localhost:8081/book/bookstore/edit", updatedBook)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
      navigate("/dispUserbook")
  };
  const backToBookDisp =()=>{
    navigate("/dispUserbook")
}
const logout = () => {
  localStorage.setItem("token", "");
  console.log(localStorage.getItem("token"));
  navigate("/")
}
  return (
    <>
      <button onClick={backToBookDisp}>Show book list</button>
      <button onClick={logout}>Log Out</button>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={handleDescriptionChange}></textarea>
      </div>
      <div>
        <label htmlFor="publisher">Publisher:</label>
        <input type="text" id="publisher" value={publisher} onChange={handlePublisherChange} />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={date} onChange={handleDateChange} />
      </div>
      <button type="submit">update Changes</button>
    </form>
    </>
  );
};

export default Editcurrbook;
