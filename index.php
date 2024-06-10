<?php
// Connect to the Database 
$servername = "localhost";
$username = "root";
$password = "";
$database = "BooksDB";
// Create a connection
$conn = mysqli_connect($servername, $username, $password, $database);
// Die if connection was not successful
if (!$conn) {
    die("Sorry we failed to connect: " . mysqli_connect_error());
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['idEdit'])) {
        // Update the Book Details
        $id = $_POST["idEdit"];
        $title = $_POST["titleEdit"];
        $author = $_POST["authorEdit"];
        $isbn = $_POST["isbnEdit"];
        $publishedDate = $_POST["publishedDateEdit"];
        $description = $_POST["descriptionEdit"];
        // Sql query to be executed
        if($id)
            $sql = "UPDATE `books` SET `Title` = '$title', `Author` = '$author', `ISBN` = '$isbn', `PublishedDate` = '$publishedDate', `Description` = '$description' WHERE `books`.`Id` = $id";
        else 
            $sql = "INSERT INTO `books` (`Title`, `Author`, `ISBN`, `PublishedDate`,`Description`) VALUES ('$title', '$author', '$isbn', '$publishedDate','$description')";
        $result = mysqli_query($conn, $sql);
    } 
}
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $delete = true;
    $sql = "DELETE FROM `books` WHERE `Id` = $id";
    $result = mysqli_query($conn, $sql);
}
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="//cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css">
    <title>Book Portal</title>
</head>

<body>
    <!-- Create/Edit/Show Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Book Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <form action="/cruds/index.php" method="POST">
                    <div class="modal-body">
                        <input type="hidden" name="idEdit" id="idEdit">
                        <div class="form-group">
                            <label for="title">Book Title</label>
                            <input type="text" class="form-control" id="titleEdit" name="titleEdit">
                        </div>
                        <div class="form-group">
                            <label for="author">Author</label>
                            <input type="text" class="form-control" id="authorEdit" name="authorEdit">
                        </div>
                        <div class="form-group">
                            <label for="isbn">ISBN</label>
                            <input type="text" class="form-control" id="isbnEdit" name="isbnEdit">
                        </div>
                        <div class="form-group">
                            <label for="publishedDate">Published Date</label>
                            <input type="date" class="form-control" id="publishedDateEdit" name="publishedDateEdit">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <input type="text" class="form-control" id="descriptionEdit" name="descriptionEdit">
                        </div>
                    </div>
                    <div class="modal-footer d-block mr-auto">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Book Portal Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Book Portal</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="add" style="cursor:pointer">Add Book</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contact Us</a>
                </li>
            </ul>
        </div>
    </nav>


    <!-- Table for book details -->
    <div class="container my-4">
        <table class="table display ui celled" id="myTable" style="width: 100%;">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Published Date</th>
                    <th scope="col" style='display:none'>Description</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql = "SELECT * FROM `books`";
                $result = mysqli_query($conn, $sql);
                $id = 0;
                while ($row = mysqli_fetch_assoc($result)) {
                    $id = $id + 1;
                    echo
                    "<tr>
                        <th scope='row'>" . $id . "</th>
                        <td id=" . $row['Id'] . " class='edit' style='cursor:pointer'>" . $row['Title'] . "</td>
                        <td>" . $row['Author'] . "</td>
                        <td>" . $row['ISBN'] . "</td>
                        <td>" . $row['PublishedDate'] . "</td>
                        <td style='display:none'>" . $row['description'] . "</td>
                        <td>
                         <button class='edit btn btn-sm btn-primary' id=" . $row['Id'] . ">Edit</button>
                         <button class='delete btn btn-sm btn-danger' id=d" . $row['Id'] . ">Delete</button>
                        </td>
                    </tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
    <hr>

    <!-- jQuery, then Bootstrap JS,then DataTable JS, then custom JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script src="//cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#myTable').DataTable();
        });

        const add = document.getElementById('add');
        add.addEventListener("click",(e)=>{
            $('#editModal').modal('toggle');
        });

        edits = document.getElementsByClassName('edit');
        Array.from(edits).forEach((element) => {
            element.addEventListener("click", (e) => {
                tr = e.target.parentNode.parentNode;
                title = tr.getElementsByTagName("td")[0].innerText;
                author = tr.getElementsByTagName("td")[1].innerText;
                isbn = tr.getElementsByTagName("td")[2].innerText;
                publishedDate = tr.getElementsByTagName("td")[3].innerText;
                description = tr.getElementsByTagName("td")[4].innerText;

                titleEdit.value = title;
                authorEdit.value = author;
                isbnEdit.value = isbn;
                publishedDateEdit.value = publishedDate;
                descriptionEdit.value = description;

                idEdit.value = e.target.id;

                $('#editModal').modal('toggle');
                clearDetails();
            });
        });

        const clearDetails = ()=>{
            titleEdit.value = title;
            authorEdit.value = author;
            isbnEdit.value = isbn;
            publishedDateEdit.value = publishedDate;
            descriptionEdit.value = description;
        }

        deletes = document.getElementsByClassName('delete');
        Array.from(deletes).forEach((element) => {
            element.addEventListener("click", (e) => {
                console.log("delete ");
                id = e.target.id.substr(1);

                if (confirm("Are you sure you want to delete this book?")) {
                    console.log("yes");
                    window.location = `/cruds/index.php?delete=${id}`;
                } else {
                    console.log("no");
                }
            });
        });
    </script>
</body>

</html>