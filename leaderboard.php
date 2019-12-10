

<?php
session_start();
// Change this to your connection info.
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
    <link rel="stylesheet" href="mystyles.css">
</head>

<body>
  
   
<h1>
        Welcome <?=$_SESSION['name']?>, You have: <?=$wins?> wins, <?=$loss?> losses, and <?=$tie?> ties

 </h1>
   <?php
   table($result);
   ?>

</body>

</html>
