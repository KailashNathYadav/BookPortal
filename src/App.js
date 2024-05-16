import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import "./App.css";

const baseURL = `http://localhost:5000/api/books`;

function App() {
  // state for all books
  const [books, setBooks] = useState([]);
  // state for managing the page number
  const [pageNumber, setPageNumber] = useState(1);
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
    if (search.length > 0) getDataByTitleOrAuthor(search);
    else getData(pageNumber);
  }, [pageNumber]);

  const handleShow = (id) => {
    setShow(true);
    setEditId(id);
  };

  const handleClose = () => {
    setShow(false);
  };

  const getData = () => {
    axios
      .get(`${baseURL}?pageNumber=${pageNumber}`)
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
        getData(pageNumber);
        clearCreate();
      })
      .catch((error) => {
        alert(`Error, please put valid details !!`);
      });
  };

  const clearCreate = () => {
    setTitle("");
    setAuthor("");
    setIsbn("");
    setPublishedDate("");
  };

  const clearEdit = () => {
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
        getData(pageNumber);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleEdit = () => {
    const data = {
      id: editId,
      title: editTitle,
      author: editAuthor,
      isbn: editIsbn,
      publishedDate: editPublishedDate,
    };

    axios
      .put(`${baseURL}/${editId}`, data)
      .then((result) => {
        getData(pageNumber);
        clearEdit();
        handleClose();
      })
      .catch((error) => {
        console.log("Error occur during editing!!!!!!!!!!!");
      });
  };

  const getDataByTitleOrAuthor = (searchInput) => {
    axios
      .get(
        `${baseURL}/search?searchInput=${searchInput}&pageNumber=${pageNumber}`
      )
      .then((result) => {
        setBooks(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      {/* Header of the Book Management Application */}
      <div className="container-fluid navbar navbar-expand-lg bg-primary mb-3">
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
        <div className="row font-weight-bold mb-2">
          <div className="col-3">Book Title</div>
          <div className="col-2">Book Author</div>
          <div className="col-2">Book ISBN</div>
          <div className="col-2">Book Published Date</div>
          <div className="col-2">Actions</div>
        </div>

        <div className="row mb-2">
          <div className="col-3">
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              placeholder="Enter Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              placeholder="Enter ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              placeholder="Enter Publish Date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-2">
            <button
              onClick={handleCreate}
              className="add btn btn-primary w-100"
            >
              Add new book
            </button>
          </div>
        </div>

        {books && books.length > 0 ? (
          books.map((book) => (
            <div className="row mb-2" key={book.id}>
              <div className="col-3">{book.title}</div>
              <div className="col-2">{book.author}</div>
              <div className="col-2">{book.isbn}</div>
              <div className="col-2">{book.publishedDate}</div>
              <div className="col-2 d-flex justify-content-between">
                <button
                  onClick={() => handleDelete(book.id)}
                  className="delete btn btn-danger w-50 mx-1"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleShow(book.id)}
                  className="edit btn btn-primary w-50 mx-1"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="row">
            <div className="col-12 text-center">
              Currently no book data is present at this page please check previous pages!!
            </div>
          </div>
        )}
      </div>

      {/* Popup for editing the particular book that is clicked */}

      <Modal
        show={show}
        onHide={handleClose}
        className="modal container-fluid"
        tabIndex="-1"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Book Details</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose()}
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
                onClick={() => handleClose()}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleEdit()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Pagination to indicate a series of related content exists across multiple pages */}
      <div className="pagination justify-content-center">
        <div className="page-item">
          <div
            className="page-link"
            aria-label="Previous"
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
          >
            <span aria-hidden="true">&laquo;</span>
          </div>
        </div>
        {/* make page according to the total record */}
        
        <div className="page-item">
          <div className="page-link" onClick={() => setPageNumber(1)}>
            1
          </div>
        </div>
        <div className="page-item">
          <div className="page-link" onClick={() => setPageNumber(2)}>
            2
          </div>
        </div>
        <div className="page-item">
          <div className="page-link" onClick={() => setPageNumber(3)}>
            3
          </div>
        </div>
        <div className="page-item">
          <div className="page-link" onClick={() => setPageNumber(4)}>
            4
          </div>
        </div>
        <div className="page-item">
          <div className="page-link" onClick={() => setPageNumber(5)}>
            5
          </div>
        </div>

        <div className="page-item">
          <div
            className="page-link"
            aria-label="Next"
            onClick={() => setPageNumber(Math.min(5, pageNumber + 1))}
          >
            <span aria-hidden="true">&raquo;</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;