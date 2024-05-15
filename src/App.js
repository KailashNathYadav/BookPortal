import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./App.css";

const baseURL = `http://localhost:5000/api/books`;

function App() {
  // state for all books
  const [books, setBooks] = useState([]);
  // state for search input
  const [search, setSearch] = useState([]);
  // state for creating new book
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  // state for edit pop up and edit input
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editIsbn, setEditIsbn] = useState("");
  const [editPublishedDate, setEditPublishedDate] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const handleShow = (id) => {
    setShow(true);
    setEditId(id);
  };

  const handleClose = () => {
    setShow(false);
  };

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

  const handleEdit = () => {
    const data = {
      id:editId,
      title: editTitle,
      author: editAuthor,
      isbn: editIsbn,
      publishedDate: editPublishedDate,
    };

    axios
      .put(`${baseURL}/${editId}`, data)
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
    axios
      .get(`${baseURL}/search?searchInput=${searchInput}`)
      .then((result) => {
        setBooks(result.data);
      })
      .catch((error) => {
        <h1>Currently no book available with this criteria !!!!!!!!!!!</h1>;
      });
  };

  return (
    <div className="container-fluid">
      {/* Header of the Book Management Application */}
      <div className="container-fluid navbar navbar-expand-lg bg-primary mb-5">
        <button onClick={() => getData()} className="mx-2">
          <i className="fa-solid fa-book"></i>
        </button>
        <input
          type="text"
          placeholder="Search Books via Title or Author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mx-1 w-25"
        />
        <button type="submit" onClick={() => getDataByTitleOrAuthor(search)}>
          🔍
        </button>
      </div>

      {/* List of Available details of book in database */}
      <div className="container">
        <Table striped bordered hover className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Book Title</th>
              <th>Book Author</th>
              <th>Book ISBN</th>
              <th>Book Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-100"
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-100"
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter ISBN"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  className="w-100"
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Published Date"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  className="w-100"
                />
              </td>
              <td>
                <button
                  onClick={handleCreate}
                  className="w-100 btn btn-primary"
                >
                  Add new book
                </button>
              </td>
            </tr>
            {books && books.length > 0 ? (
              books.map((book,index) => (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.publishedDate}</td>
                  <td className="action">
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="delete w-50 mx-2 btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleShow(book.id)}
                      className="edit w-40 mx-1 btn btn-primary"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Currently no book data is present !!</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Popup for editing the particular book that is clicked */}

      <Modal
        show={show}
        onHide={handleClose}
        className="modal container-fluid"
        tabIndex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Book Details</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={()=>handleClose()}
              ></button>
            </div>
            <div class="modal-body">
              <label for="title" className="m-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Edit Title"
                value={editTitle}
                id="title"
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-100 m-1"
              />
              <label for="author" className="m-1">
                Author
              </label>
              <input
                type="text"
                placeholder="Edit Author"
                value={editAuthor}
                id="author"
                onChange={(e) => setEditAuthor(e.target.value)}
                className="w-100 m-1"
              />
              <label for="isbn" className="m-1">
                ISBN
              </label>
              <input
                type="text"
                placeholder="Edit ISBN"
                value={editIsbn}
                id="isbn"
                onChange={(e) => setEditIsbn(e.target.value)}
                className="w-100 m-1"
              />
              <label for="date" className="m-1">
                Published Date
              </label>
              <input
                type="text"
                placeholder="Edit Published Date"
                value={editPublishedDate}
                id="date"
                onChange={(e) => setEditPublishedDate(e.target.value)}
                className="w-100 m-1"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                className="btn btn-secondary mx-4"
                data-bs-dismiss="modal"
                onClick={()=>handleClose()}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={()=>handleEdit()}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;