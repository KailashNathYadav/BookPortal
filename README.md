Simple Book Management API:
Develop a RESTful API using C# with ASP.NET Core that allows users to manage a collection of books.
The API will provide capabilities to add, retrieve, update, and delete book entries.
For Testing use: Postman

CRUDS(Create,Read,Update,Delete,Search) operation:

Create:
Method: Post
URI: https://localhost:7070/api/books/

Input 1: 

{
    "Author":"James Clear",
    "Title":"Atomic Habits",
    "ISBN":"adaffeafdasfasfafas",
    "PublishedDate":"1999-08-09"
}

Output 1: 200 Ok

Input 2: 

{
    "Author":"Dr. Joseph Murphy",
    "Title":"Power of Subconsious Mind",
    "ISBN":"adaffeafda124sadsdf4dsfs",
    "PublishedDate":"1980-04-09"
}

Output 2: 200 Ok

Input 3: 

{
    "Author":"Robert Kiyosaki",
    "Title":"Rich Dad Poor Dad",
    "ISBN":"123322@#@##@!fafas",
    "PublishedDate":"2001-05-09"
}

Output 3: 200 Ok

Read:
Method: Get
URI: https://localhost:7070/api/books/
Output: Arrays of 3 books

URI: https://localhost:7070/api/books/{id}
Output: Detail of specified book

Update: Put
URI: https://localhost:7070/api/books/{id}

Input: body>JSON

{
    "Author":"James Clear",
    "Title":"Atomic Habits",
    "ISBN":"adaffeafdasfasfafas",
    "PublishedDate":"1999-08-09"
}

Output: 200 Ok

Delete:
Method: Delete
URI: https://localhost:7070/api/books/{id}
Output: 200 Ok if found else 404 NotFound

Search:
Method: Get
URI: http://localhost:5000/api/books/search?searchInput=Jane Austen
Output: List of book if found else show there is no book with this author or title

