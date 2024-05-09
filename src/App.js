import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./App.css";

export const baseURL = `http://localhost:5000/api/books`;

function App() {
  const [search,setSearch] = useState([]);
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  const [editId,setEditId] = useState('');
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editIsbn, setEditIsbn] = useState("");
  const [editPublishedDate, setEditPublishedDate] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
  };

  const clearEdit = () => {
    console.log('reset all edit field');
  }

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
    
    const handleUpdate = (id) => {
      handleShow();
      handleEdit(id);
    }

    const handleEdit = (id) => {
      // alert(id);
      const data = {
        id: editId,
        title: editTitle,
        author: editAuthor,
        isbn: editIsbn,
        publishedDate: editPublishedDate,
      };
      axios.put(`${baseURL}/${id}`,data)
      .then((result)=>{
        getData();
        clearEdit();
        handleClose();
    }).catch((error)=>{
      alert('It is not update: Error occured!!')
    })

  };

  const getDataByTitleOrAuthor = (search) => {
    // handle second time search
    setBooks(books.filter((book) => book.title.includes(search) || book.author.includes(search)));
  }

  return (
    <div className="App">
      {/* Header of the Book Management Application */}
      <div className="header">
        <button onClick={() => getData()}>Book Portal</button>
        <input type="text" 
        placeholder="search books by title or author"
        style={{width:"15%"}}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" onClick={()=>getDataByTitleOrAuthor(search)} >🔍</button>
      </div>

      {/* List of Available details of book in database */}
      <Table singleLine>
        <Table.Header>
          <Table.Row className="row">
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>ISBN</Table.HeaderCell>
            <Table.HeaderCell>Published Date</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row className="row">
            <Table.Cell>
              <input
                type="text"
                placeholder="enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Table.Cell>
            <Table.Cell>
              <input
                type="text"
                placeholder="enter author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Table.Cell>
            <Table.Cell>
              <input
                type="text"
                placeholder="enter isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
            </Table.Cell>
            <Table.Cell>
              <input
                type="text"
                placeholder="enter published date"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
              />
            </Table.Cell>
            <Table.Cell>
              <button onClick={() => handleCreate()}>Add new book</button>
            </Table.Cell>
          </Table.Row>
          {books && books.length > 0
            ? books.map((book) => (
                <Table.Row className="row" key={book.id}>
                  <Table.Cell>{book.title}</Table.Cell>
                  <Table.Cell>{book.author}</Table.Cell>
                  <Table.Cell>{book.isbn}</Table.Cell>
                  <Table.Cell>{book.publishedDate}</Table.Cell>
                  <Table.Cell className="action">
                    <button onClick={() => handleDelete(book.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleUpdate(book.id)}>Edit</button>
                  </Table.Cell>
                </Table.Row>
              ))
            : `Current no book data is present!!!!!!!!!!!!!!!!!!!`}
        </Table.Body>
      </Table>

      {/* Model Popup for editing the particular book that is clicked */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify/Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer of Book Management Application */}
    </div>
  );
}

export default App;
