<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'root';
$DATABASE_PASS = 'newpassword';
$DATABASE_NAME = 'phplogin';
// Try and connect using the info above.
$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if ( mysqli_connect_errno() ) {
	// If there is an error with the connection, stop the script and display the error.
	die ('Failed to connect to MySQL: ' . mysqli_connect_error());
}
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: index.html');
    
	exit();
}
$sql = "SELECT username, wins, loss, tie FROM accounts ORDER BY WINS DESC";
$result = $con->query($sql);
function table( $result ) {
    $result->fetch_array( MYSQLI_ASSOC );
    echo '<table>';
    tableHead( $result );
    tableBody( $result );
    echo '</table>';
}
function tableHead( $result ) {
    echo '<thead>';
    foreach ( $result as $x ) {
    echo '<tr>';
    foreach ( $x as $k => $y ) {
        echo '<th>' . ucfirst( $k ) . '</th>';
    }
    echo '</tr>';
    break;
    }
    echo '</thead>';
}
function tableBody( $result ) {
    echo '<tbody>';
    foreach ( $result as $x ) {
    echo '<tr>';
    foreach ( $x as $y ) {
        echo '<td>' . $y . '</td>';
    }
    echo '</tr>';
    }
    echo '</tbody>';
}
table($result);
// echo"</thead>
// </table>";
$stmt = $con->prepare('SELECT wins,loss,tie FROM accounts WHERE id = ?');
// In this case we can use the account ID to get the account info.
$stmt->bind_param('i', $_SESSION['id']);
$stmt->execute();
$stmt->bind_result($wins, $loss,$tie);
$stmt->fetch();
$stmt->close();
?>
<html>
	<head>
		<meta charset="utf-8">
		<title>Home Page</title>
		<link href="style.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
	</head>
	<body class="loggedin">
		<nav class="navtop">
			<div>
				<h1>Website Title</h1>
				<a href="profile.php"><i class="fas fa-user-circle"></i>Profile</a>
                <a href="logout.php"><i class="fas fa-sign-out-alt"></i>Logout</a>
                <a href="win.php"><i class="fas fa-user-circle"></i>win</a>
			</div>
		</nav>
		<div class="content">
			<h2>Home Page</h2>
            <p>Welcome back, <?=$_SESSION['name']
        
            
            
            ?>!</p>
         
            <p>Your account details are below:</p>
				<table>
					<tr>
						<td>Username:</td>
						<td><?=$_SESSION['name']?></td>
					</tr>
					<tr>
						<td>win</td>
						<td><?=$wins?></td>
					</tr>
					<tr>
						<td>loss</td>
						<td><?=$loss?></td>
                    </tr>
                    <tr>
						<td>tie</td>
						<td><?=$tie?></td>
					</tr>
				</table>
            <p></p>
		</div>
	</body>
</html>
