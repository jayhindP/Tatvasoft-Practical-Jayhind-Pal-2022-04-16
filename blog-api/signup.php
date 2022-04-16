<?php
include("./database.php");

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$password = $_POST['password'];
$dob = $_POST['dob'];
$role = $_POST['role'];

$sql = "INSERT INTO users (firstName, lastName, email, password, dob, role)
VALUES ('$firstName', '$lastName', '$email', '$password', '$dob', '$role')";

if ($db->query($sql) === TRUE) {
	$_POST['id'] = $db->insert_id;

	$json['status'] = 1;
	$json['data'] = $_POST;
	echo json_encode($json);
} else {
	$json['status'] = 0;
	$json['data'] = $db->error;
	echo json_encode($json);
}

$db->close();
?>