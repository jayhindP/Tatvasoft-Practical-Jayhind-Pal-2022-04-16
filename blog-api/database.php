<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json;charset=utf-8');


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "my_blogs";

// Create connection
$db = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($db->connect_error) {
  die("Connection failed: " . $db->connect_error);
}
?>