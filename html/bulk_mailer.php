<?php

require ("database_helper.php");


/**
	Dumps the 'how to use this script' text to the screen, and dies.
**/
function print_args_and_die()
{
	echo ("Usage: php bulk_mailer.php group=<GROUP_ID> batch=<BATCH_NUMBER> template=<TEMPLATE_FILE>\n");
	echo ("       php bulk_mailer.php group=list\n");
	echo ("       php bulk_mailer.php help\n");
	echo ("\n");
	echo ("\tgroup=list -> Displays a list of the different email groups stored in the database, along with their ID numbers.\n");
	echo ("\tgroup=<GROUP_ID> -> Tells the bulk emailer which group of email addresses to send the email to.\n");
	echo ("\tbatch=<BATCH_NUMBER> -> A unique ID number to identify this email batch.\n");
	echo ("\ttemplate=<TEMPLATE_FILE> -> Tells the bulk emailer which Python email template to send out to the group.\n\n");

	exit(1);
}


/**
	Displays a list of the email groups stored in the database, along with their ID numbers.
**/
function list_groups_and_die()
{
	$_database_helper = new DBHelper();
	$_db = $_database_helper -> get_database ("db-config.php");

	$query = "SELECT * FROM " . GroupTypeTable::TABLE_NAME;
	$result_set = $_db -> execute_query ($query);

	echo ("Id\tName\n");
	while ($row = $_db -> next ($result_set))
		echo ($row[GroupTypeTable::_ID] . "\t" . $row[GroupTypeTable::DESCRIPTION] . "\n");

	$_db -> disconnect();

	exit (0);
}


/**
	The main show starts here
**/
// grab the command line parameters
$num_parms = count ($argv);
if ($num_parms < 2 || $num_parms > 4)
	print_args_and_die();

if ($argv[1] == "help")
	print_args_and_die();

$group_pieces = explode ("=", $argv[1]);

$batch_pieces = array ("");
if ($num_parms > 2)
	$batch_pieces = explode ("=", $argv[2]);

$template_pieces = array ("");
if ($num_parms > 3)
	$template_pieces = explode ("=", $argv[3]);

if (count ($group_pieces) != 2)
	print_args_and_die();
else if ($group_pieces[1] == "list")
	list_groups_and_die();

$group_id = intval($group_pieces[1]);

if($group_id == 0)
{
	echo ("Unrecognised group id: $group_pieces[1]\n\n");
	print_args_and_die ();
}

// at this point, since group_id is a (not necessariy valid) number, the template file and batch number
// must have been passed along as well.
if (count ($batch_pieces) != 2)
{
	echo ("Unrecognised batch identity number.\n\n");
	print_args_and_die();
}
$batch_number = intval($batch_pieces[1]);


if (count ($template_pieces) != 2)
{
	echo ("Unrecognised template file.\n\n");
	print_args_and_die();
}
$template_file = $template_pieces[1];
if (!file_exists ($template_file))
	die ("Error: $template_file not found.\n");

if (!file_exists ("email.py"))
	die ("Error: Email script not found. You'll need to contact Nick or Grisha to fix this.\n");


// open a database connection
$_database_helper = new DBHelper();
$_db = $_database_helper -> get_database ("db-config.php");

// select the relevant users, and loop through them
$query = "SELECT * FROM " . UserTable::TABLE_NAME . " WHERE " . UserTable::GROUP . " = $group_id";
$result_set = $_db -> execute_query ($query);
$userlist = array();

while ($row = $_db -> next ($result_set))
	$userlist[] = $row;

$num_users = count($userlist);
for ($i = 0; $i < $num_users; $i ++)
{
	// send the email
	$command_string = "python email.py $batch_number " . $userlist[$i][UserTable::_ID] . " " . $userlist[$i][UserTable::EMAIL] . " $template_file";
	echo ("$command_string\n");

	$query = "INSERT INTO " . PingRecordTable::TABLE_NAME . " (" .
		PingRecordTable::USER_ID . ", " .
		PingRecordTable::BATCH_ID . ", " .
		PingRecordTable::PING_TYPE_ID . ", " .
		PingRecordTable::TIMESTAMP . ", " .
		PingRecordTable::IP_ADDY . ") VALUES (" .
		$userlist[$i][UserTable::_ID] . ", " .
		$batch_number . ", " .
		"1, " .
		time() . ", " .
		"'localhost');";

	echo ("$query\n\n");
}

// close and exit
$_db -> disconnect();

?>
