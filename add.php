<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>

<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST["title"];
    $author = $_POST["author"];
    $isbn = $_POST["isbn"];
    $publishedDate = $_POST["publishedDate"];
    $description = $_POST["description"];
    $sql = "INSERT INTO `books` (`Title`, `Author`, `ISBN`, `PublishedDate`, `Description`) VALUES ('$title', '$author', '$isbn', '$publishedDate','$description')";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        header("Location: index.php");
    } else {
        echo "Failed to add book";
    }
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <title>Add Book</title>
</head>
<body>
    <div class="container my-4">
        <h2>Add a Book</h2>
        <form action="add.php" method="POST">
            <div class="form-group">
                <label for="title">Book Title</label>
                <input type="text" class="form-control" id="title" name="title" required>
            </div>
            <div class="form-group">
                <label for="author">Author</label>
                <input type="text" class="form-control" id="author" name="author" required>
            </div>
            <div class="form-group">
                <label for="isbn">ISBN</label>
                <input type="text" class="form-control" id="isbn" name="isbn" required>
            </div>
            <div class="form-group">
                <label for="publishedDate">Published Date</label>
                <input type="date" class="form-control" id="publishedDate" name="publishedDate" required>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description" name="description" required>
            </div>
            <button type="submit" class="btn btn-primary">Add Book</button>
            <a href="index.php" class="btn btn-primary">Back</a>
        </form>
    </div>
</body>
</html>
