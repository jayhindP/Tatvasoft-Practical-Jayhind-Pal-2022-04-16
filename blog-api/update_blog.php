<?php
include("./database.php");

$id = $_POST['id'];
$user_id = $_POST['user_id'];
$title = $_POST['title'];
$description = $_POST['description'];
$date = $_POST['date'];
$status = $_POST['status'];

$sql = "UPDATE blogs SET user_id='$user_id', title='$title', description='$description', date='$date', status='$status'	WHERE id='$id'";

if ($db->query($sql) === TRUE) {
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