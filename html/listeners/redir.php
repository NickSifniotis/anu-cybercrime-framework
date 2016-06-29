<?php

require ("../database_helper.php");

$user_id = 0;
if (isset($_GET['a']))
	$user_id = (int)$_GET["a"];

$batch_id = 0;
if (isset($_GET['b']))
	$batch_id = (int)$_GET["b"];

$trans_id = 0;
if (isset($_GET['c']))
	$trans_id = (int)$_GET["c"];

$destination = "http://sociology.cass.anu.edu.au/centres/anu-cybercrime";
if (isset($_GET["url"]))
	$destination = $_GET["url"];

$ip_addy = $_SERVER['REMOTE_ADDR'];

$query = "INSERT INTO " . PingRecordTable::TABLE_NAME . " (" .
		PingRecordTable::USER_ID . ", " .
		PingRecordTable::BATCH_ID . ", " .
		PingRecordTable::PING_TYPE_ID . ", " .
		PingRecordTable::TIMESTAMP . ", " .
		PingRecordTable::IP_ADDY . ") VALUES (" .
		$user_id . ", " .
		$batch_id . ", " .
		$trans_id . ", " .
		time() . ", " .
		"'" . $ip_addy . "');";

$helper = new DBHelper();
$db = $helper -> get_database('../db-config.php');

$db -> execute ($query);

$db -> disconnect();

header ("Location: $destination");

?>
