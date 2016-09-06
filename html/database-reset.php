<?php

/**
	Database master reset
**/

include ("database_helper.php");

$password = "";
if (isset ($_GET['password']))
	$password = $_GET['password'];

$password_hash = md5($password);

if ($password_hash != "2904a3932c58c542ac0b6bd93bfb7c2c")
	die ("Wrong password!");


$_helper = new DBHelper();
$_db = $_helper -> get_database ("db-config.php");


$_helper -> Upgrade ($_db);

?>


