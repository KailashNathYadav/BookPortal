import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import axios from "axios";
import './App.css';

export const baseURL = `http://localhost:5000/api/books`;

function App() {
  let [books, setBooks] = useState([])

  useEffect(()=>{
    getData();
  },[])

  const getData = () => {
    axios.get(baseURL)
    .then((response) => {
      setBooks(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleCreate = ({title,author,isbn,publishedDate}) => {
    axios.post(baseURL,{
      title,
      author,
      isbn,
      publishedDate
    }).then((result)=>{
      getData();
      clearCreate();
    }).catch((error)=>{
      alert(`Data is not saved please try again!!!!!!!!!`);
    })
  }

  const clearCreate = () => {
    console.log('reset all the create field');
  }

  const handleDelete = (id) => {
    axios.delete(`${baseURL}/${id}`).then((result)=>{
      getData();
    }).catch((error)=>{
      alert(error);
    });
  }

  const handleEdit = (id) => {
    alert(id);
  }

  return (
    <div className="App">
      {/* Header of the Book Management Application */}
      <div className='header'>
      <button onClick={()=>getData()}>Book Portal</button>
      <input type="text" placeholder='search' />
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
            <Table.Cell><input type="text" placeholder='title'/></Table.Cell>
            <Table.Cell><input type="text" placeholder='author'/></Table.Cell>
            <Table.Cell><input type="text" placeholder='isbn'/></Table.Cell>
            <Table.Cell><input type="text" placeholder='published date'/></Table.Cell>
            <Table.Cell><button onClick={()=>handleCreate()}>Add new book</button></Table.Cell>
          </Table.Row>
            { books && books.length > 0 ? 
             books.map((book) => (
              <Table.Row className='row' key={book.id}>
                <Table.Cell>{book.title}</Table.Cell>
                <Table.Cell>{book.author}</Table.Cell>
                <Table.Cell>{book.isbn}</Table.Cell>
                <Table.Cell>{book.publishedDate}</Table.Cell>
                <Table.Cell className='action'>
                  <button onClick={()=>handleDelete(book.id)}>Delete</button>
                  <button onClick={()=>handleEdit(book.id)}>Edit</button>
                </Table.Cell>
              </Table.Row>
            )):`Current no book data is present!!!!!!!!!!!!!!!!!!!`}
        </Table.Body>
      </Table>

      {/* Footer of Book Management Application */}
    </div>
  );
}

export default App;