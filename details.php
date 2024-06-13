<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>

<?php
include 'db.php';

if (isset($_GET['id'])) {
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
    <title>Book Details</title>
</head>
<body>
    <div class="container my-4">
        <h2>Book Details</h2>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Title: <?php echo $book['Title']; ?></h5>
                <h6 class="card-subtitle mb-2 text-muted">Author: <?php echo $book['Author']; ?></h6>
                <p class="card-subtitle mb-2 text-muted">ISBN: <?php echo $book['ISBN']; ?></p>
                <p class="card-subtitle mb-2 text-muted">Published Date: <?php echo $book['PublishedDate']; ?></p>
                <p class="card-subtitle mb-2 text-muted">Description: <?php echo $book['description']; ?></p>
                <a href="index.php" class="btn btn-primary">Back</a>
            </div>
        </div>
    </div>
</body>
</html>
