<?php
include("./database.php");

$user_id = $_POST['user_id'];
$title = $_POST['title'];
$description = $_POST['description'];
$date = $_POST['date'];
$status = $_POST['status'];

$sql = "INSERT INTO blogs (user_id, title, description, date, status)
VALUES ('$user_id', '$title', '$description', '$date', '$status')";

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