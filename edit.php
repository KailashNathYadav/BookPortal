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
    $id = $_POST["id"];
    $title = $_POST["title"];
    $author = $_POST["author"];
    $isbn = $_POST["isbn"];
    $publishedDate = $_POST["publishedDate"];
    $description = $_POST["description"];
    $sql = "UPDATE `books` SET `Title` = '$title', `Author` = '$author', `ISBN` = '$isbn', `PublishedDate` = '$publishedDate', `Description` = '$description' WHERE `Id` = $id";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        header("Location: index.php");
    } else {
        echo "Failed to update book";
    }
} else if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM `books` WHERE `Id` = $id";
    $result = mysqli_query($conn, $sql);
    $book = mysqli_fetch_assoc($result);
} else {
    header("Location: index.php");
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <title>Edit Book</title>
</head>
<body>
    <div class="container my-4">
        <h2>Edit Book</h2>
        <form action="edit.php" method="POST">
            <input type="hidden" name="id" value="<?php echo $book['Id']; ?>">
            <div class="form-group">
                <label for="title">Book Title</label>
                <input type="text" class="form-control" id="title" name="title" value="<?php echo $book['Title']; ?>" required>
            </div>
            <div class="form-group">
                <label for="author">Author</label>
                <input type="text" class="form-control" id="author" name="author" value="<?php echo $book['Author']; ?>" required>
            </div>
            <div class="form-group">
                <label for="isbn">ISBN</label>
                <input type="text" class="form-control" id="isbn" name="isbn" value="<?php echo $book['ISBN']; ?>" required>
            </div>
            <div class="form-group">
                <label for="publishedDate">Published Date</label>
                <input type="date" class="form-control" id="publishedDate" name="publishedDate" value="<?php echo $book['PublishedDate']; ?>" required>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description" name="description" value="<?php echo $book['description']; ?>" required>
            </div>
            <button type="submit" class="btn btn-primary">Update Book</button>
            <a href="index.php" class="btn btn-primary">Back</a>
        </form>
    </div>
</body>
</html>
