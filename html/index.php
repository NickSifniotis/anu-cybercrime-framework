<?php

/**
	Testing Database Connectivity
**/

include ("database_helper.php");

$password = "";
if (isset ($_GET['password']))
	$password = $_GET['password'];

if ($password != "mamoun12344321")
	die ("Wrong password!");


$_helper = new DBHelper();
$_db = $_helper -> get_database ("db-config.php");


//$_helper -> Upgrade ($_db);

//<a href="http://150.203.139.148/listeners/redir.php?a=<USER_ID>&b=<BATCH_ID>&c=3&url=http://150.203.139.148/psp/sscsprod/ISIS.html">Login to ISIS</a> 
?>


