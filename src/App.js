import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import "./App.css";

const baseURL = `http://localhost:5000/api/books`;

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState([]);
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editIsbn, setEditIsbn] = useState("");
  const [editPublishedDate, setEditPublishedDate] = useState("");

  let elementEdited;

  useEffect(() => {
    getData();
  }, []);

  const handleShow = (id) => {
    setShow(true);
    handleEdit(id);
    
    elementEdited = document.getElementsByClassName(id);
    elementEdited[0].classList.add('edited');
  };

  const handleClose = () => {
    setShow(false);
    elementEdited[0].classList.remove('edited');
  }

  const getData = () => {
    axios
      .get(baseURL)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreate = () => {
    const data = {
      title: title,
      author: author,
      isbn: isbn,
      publishedDate: publishedDate,
    };
    axios
      .post(baseURL, data)
      .then((result) => {
        getData();
        clearCreate();
      })
      .catch((error) => {
        alert(`Error, please put valid details !!`);
      });
  };

  const clearCreate = () => {
    console.log("reset all the create field");
    setTitle("");
    setAuthor("");
    setIsbn("");
    setPublishedDate("");
  };

  const clearEdit = () => {
    console.log("reset all edit field");
    setEditId("");
    setEditTitle("");
    setEditAuthor("");
    setEditIsbn("");
    setEditPublishedDate("");
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseURL}/${id}`)
      .then((result) => {
        getData();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleEdit = (id) => {
    const data = {
      id: editId,
      title: editTitle,
      author: editAuthor,
      isbn: editIsbn,
      publishedDate: editPublishedDate,
    };

    axios
      .put(`${baseURL}/${id}`, data)
      .then((result) => {
        getData();
        clearEdit();
        handleClose();
      })
      .catch((error) => {
        console.log("Error occur during editing!!!!!!!!!!!");
      });
  };

  const getDataByTitleOrAuthor = (searchInput) => {
    axios.get(`${baseURL}/search?searchInput=${searchInput}`)
         .then((result)=>{
          setBooks(result.data);
         }).catch((error)=>{
          <h1>Currently no book available with this criteria !!!!!!!!!!!</h1>
         })
  };

  return (
    <div className="web-app">
      {/* Header of the Book Management Application */}
      <div className="header">
        <button onClick={() => getData()}>Book Portal</button>
        <input
          type="text"
          placeholder="search books by title or author"
          style={{ width: "15%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" onClick={() => getDataByTitleOrAuthor(search)}>
          🔍
        </button>
      </div>

      {/* List of Available details of book in database */}
      <div className="container">
        <table striped bordered hover>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Book Author</th>
              <th>Book ISBN</th>
              <th>Book Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="enter author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="enter isbn"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="enter published date"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                />
              </td>
              <td>
                <button onClick={handleCreate} className='add'>Add new book</button>
              </td>
            </tr>
            {books && books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.publishedDate}</td>
                  <td className="action">
                    <button onClick={() => handleDelete(book.id)} className="delete">
                      Delete
                    </button>
                    <button onClick={() => handleShow(book.id)} className={`edit ${book.id}`}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  Currently no book data is present !!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup for editing the particular book that is clicked */}
      <Modal show={show} onHide={handleClose} className="modal">
        <input
          type="text"
          placeholder="edit title"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="edit author"
          value={editAuthor}
          onChange={(e) => setEditAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="edit isbn"
          value={editIsbn}
          onChange={(e) => setEditIsbn(e.target.value)}
        />
        <input
          type="text"
          placeholder="edit published date"
          value={editPublishedDate}
          onChange={(e) => setEditPublishedDate(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default App;
