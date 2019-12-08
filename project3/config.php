<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "newpassword";
$database = "phplogin";
$port = "3306";

// Create connection

$link = mysqli_connect($servername, $username, $password, $database, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
die("Connected successfully");
}