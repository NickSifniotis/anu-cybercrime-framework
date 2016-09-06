<?php

/**
	Testing Database Connectivity
**/

include ("database_helper.php");

if (count ($argv) != 2)
	die ("Error - command line arguments not specified correctly.\n");

$user_id = (int)($argv [1]);

$_helper = new DBHelper();
$_db = $_helper -> get_database ("db-config.php");

$query = "INSERT INTO " . PingRecordTable::TABLE_NAME . " (" .
	PingRecordTable::USER_ID . ", " .
	PingRecordTable::TIMESTAMP . ", " .
	PingRecordTable::PING_TYPE_ID . ") VALUES (" . 
	$user_id . ", " .
	time() . ", " .
	"1);";

$_db -> execute ($query);
$_db -> disconnect ();

?>

