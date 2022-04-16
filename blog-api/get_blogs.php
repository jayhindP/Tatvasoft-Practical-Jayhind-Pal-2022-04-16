<?php
include("./database.php");

$sql = "SELECT * FROM blogs";

if(!empty($_GET['user_id'])){
	$user_id = $_GET['user_id'];
	$sql .= " WHERE user_id='$user_id'";
}

$result = $db->query($sql);
if ($result->num_rows > 0) {
  	$data = [];
  	while ($row = $result->fetch_assoc()) {
  		$data[] = $row;
  	}

  	$json['status'] = 1;
	$json['data'] = $data;
	echo json_encode($json);
}else{
	$json['status'] = 0;
	$json['data'] = "Any Post not Found";
	echo json_encode($json);
}
$db->close();
?>