<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    try{
        $sql = "INSERT INTO `users` (`username`, `password`) VALUES ('$username', '$password')";
        $result = mysqli_query($conn, $sql);
        header("Location: login.php");
    }catch(Exception $e){
        echo "Failed to register user, may be username is already occupied.";
    }
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <title>Register</title>
</head>
<body>
    <div class="container my-4 col-md-6 bg-info p-4">
        <h2>Register</h2>
        <form action="register.php" method="POST">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" name="username" value="" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" name="password" value="" required>
            </div>
            <div>
                <button type="submit" class="btn btn-primary">Register</button>
                <a href="login.php" class="btn btn-primary mx-4">Login</a>
            </div>
        </form>
    </div>
</body>
</html>
