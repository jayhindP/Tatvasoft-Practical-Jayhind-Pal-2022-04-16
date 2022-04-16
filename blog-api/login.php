<?php
include("./database.php");

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = $db->query($sql);
if ($result->num_rows > 0) {
  	$data = $result->fetch_assoc();
  	$json['status'] = 1;
	$json['data'] = $data;
	echo json_encode($json);
}else{
	$json['status'] = 0;
	$json['data'] = "You have entered Invalid Credentials";
	echo json_encode($json);
}
$db->close();
?>