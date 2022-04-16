<?php
include("./database.php");

$sql = "DELETE FROM blogs";

if(!empty($_POST['id'])){
	$id = $_POST['id'];
	$sql .= " WHERE id='$id'";
}

if ($db->query($sql)) {
  	$json['status'] = 1;
	$json['data'] = [];
	echo json_encode($json);
}else{
	$json['status'] = 0;
	$json['data'] = "Any Post not Found";
	echo json_encode($json);
}
$db->close();
?>