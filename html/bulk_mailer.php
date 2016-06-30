<?php

require ("database_helper.php");


/**
	Dumps the 'how to use this script' text to the screen, and dies.
**/
function print_args_and_die()
{
	echo ("Usage: php bulk_mailer.php group=<GROUP_ID> template=<TEMPLATE_FILE>\n");
	echo ("       php bulk_mailer.php group=list\n");
	echo ("       php bulk_mailer.php help\n");
	echo ("\n");
	echo ("\tgroup=list -> Displays a list of the different email groups stored in the database, along with their ID numbers.\n");
	echo ("\tgroup=<GROUP_ID> -> Tells the bulk emailer which group of email addresses to send the email to.\n");
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

	echo ("Id\tName\n");

	$_db -> disconnect();
}


/**
	The main show starts here
**/
// grab the command line parameters
$num_parms = count ($argv);
if ($num_parms < 2 || $num_parms > 3)
	print_args_and_die();

if ($argv[1] == "help")
	print_args_and_die();

$group_pieces = explode ("=", $argv[1]);
$template_pieces = array ("");
if ($num_parms == 3)
	$template_pieces = explode ("=", $argv[2]);

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

// at this point, since group_id is a (not necessariy valid) number, the template file
// must have been passed along as well.
if (count ($template_pieces) != 2)
{
	echo ("Unrecognised template file.\n\n");
	print_args_and_die();
}
$template_file = $template_pieces[1];
if (!file_exists ($template_file))
	die ("Error: $template_file not found.\n");



// open a database connection
$_database_helper = new DBHelper();
$_db = $_database_helper -> get_database ("db-config.php");

// select the relevant users, and loop through them


// load the email template, and substitute in the variable names


// send the email


// close and exit
$_db -> disconnect();

?>
