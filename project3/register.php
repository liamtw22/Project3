<?php
// Change this to your connection info.
$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'root';
$DATABASE_PASS = 'newpassword';
$DATABASE_NAME = 'phplogin';
// Try and connect using the info above.
$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if (mysqli_connect_errno()) {
	// If there is an error with the connection, stop the script and display the error.
	die ('Failed to connect to MySQL: ' . mysqli_connect_error());
}
if (!isset($_POST['username']) || !isset($_POST['password'])) {
	// Could not get the data that should have been sent.
	die ('Please complete the registration form!');
}
// Make sure the submitted registration values are not empty.
if (empty($_POST['username']) || empty($_POST['password'])) {
	// One or more values are empty.
	die ('Please complete the registration form');
}
// We need to check if the account with that username exists.
if ($stmt = $con->prepare('SELECT id, password FROM accounts WHERE username = ?')) {
	// Bind parameters (s = string, i = int, b = blob, etc), hash the password using the PHP password_hash function.
	$stmt->bind_param('s', $_POST['username']);
	$stmt->execute();
	$stmt->store_result();
	// Store the result so we can check if the account exists in the database.
	if ($stmt->num_rows > 0) {
		// Username already exists
		echo 'Username exists, please choose another!';
	} else {
        // Insert new account
        
        // Username doesnt exists, insert new account
if ($stmt = $con->prepare('INSERT INTO accounts (username, password, wins,loss,tie) VALUES (?, ?,?,?,?)')) {
	// We do not want to expose passwords in our database, so hash the password and use password_verify when a user logs in.
	$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
	
	$wins = 0;
		$loss = 0;
		$tie = 0;
		$stmt->bind_param('ssiii', $_POST['username'], $password,$wins, $loss,$tie);
	$stmt->execute();
	// if ($stmt = $con->prepare('INSERT INTO accounts (wins,loss,tie) VALUES (?,?,?)')) {
	// 	$wins = 0;
	// 	$loss = 0;
	// 	$tie = 0;
	// 	$stmt->bind_param("iii", $wins, $loss,$tie);
	// 	$stmt->execute();
	// }
	echo 'You have successfully registered, you can now login!';
} else {
	// Something is wrong with the sql statement, check to make sure accounts table exists with all 3 fields.
	echo 'Could not prepare statement!';
}
	}
	$stmt->close();
} else {
	// Something is wrong with the sql statement, check to make sure accounts table exists with all 3 fields.
	echo 'Could not prepare statement!';
}
$con->close();
?>
