<?php
define ("DatabaseHelper", 1);

require ('database.php');

class DBHelper
{
	public function get_database($config_file)
	{
		$db = new DB ($config_file);
		$db -> connect ();

		return $db;
	}


	public function Upgrade($db)
	{
		$this -> delete_databases ($db);
		$this -> create_databases ($db);
		$this -> populate_databases ($db);
	}

	private function create_databases($db)
	{
		$db -> execute (PingRecordTable::CREATE_QUERY);
		$db -> execute (UserTable::CREATE_QUERY);
		$db -> execute (PingTypeTable::CREATE_QUERY);
		$db -> execute (BatchTable::CREATE_QUERY);
		$db -> execute (ConfigurationTable::CREATE_QUERY);
	}


	private function delete_databases($db)
	{
		$db -> execute (PingRecordTable::DELETE_QUERY);
		$db -> execute (UserTable::DELETE_QUERY);
		$db -> execute (PingTypeTable::DELETE_QUERY);
		$db -> execute (BatchTable::DELETE_QUERY);
		$db -> execute (ConfigurationTable::DELETE_QUERY);
	}


	private function populate_databases($db)
	{
		PingRecordTable::Populate ($db);
		PingTypeTable::Populate ($db);
		UserTable::Populate ($db);
		BatchTable::Populate ($db);
		ConfigurationTable::Populate ($db);
	}
}


/**
	Helper classes that seperate the database schema from the code implementation.
**/
class PingRecordTable extends BaseTable
{
	const TABLE_NAME = "ping_table";
	const USER_ID = "user_id";
	const BATCH_ID = "batch_id";
	const PING_TYPE_ID = "ping_type_id";
	const TIMESTAMP = "timestamp";
	const IP_ADDY = "ip_address";

	const DELETE_QUERY = "DROP TABLE IF EXISTS " . self::TABLE_NAME;
	const CREATE_QUERY = "CREATE TABLE " . self::TABLE_NAME . "(" .
					self::_ID . " INT NOT NULL AUTO_INCREMENT, " .
					self::USER_ID . " INT, " .
					self::BATCH_ID . " INT, " .
					self::PING_TYPE_ID . " INT, " .
					self::TIMESTAMP . " INT(11), " .
					self::IP_ADDY . " VARCHAR (16), " .
					"PRIMARY KEY (" . self::_ID . "));";

	public static function Populate ($db)
	{
	}	
}

class UserTable extends BaseTable
{
	const TABLE_NAME = "user_table";
	const UID = "uni_id";
	const CODENAME = "codename";

	const DELETE_QUERY = "DROP TABLE IF EXISTS " . self::TABLE_NAME;
	const CREATE_QUERY = "CREATE TABLE " . self::TABLE_NAME . "(" .
					self::_ID . " INT NOT NULL AUTO_INCREMENT, " .
					self::UID . " VARCHAR (10), " .
					self::CODENAME . " VARCHAR (30), " .
					"PRIMARY KEY (" . self::_ID . "));";

	public static function Populate ($db)
	{
	}
}

class PingTypeTable extends BaseTable
{
	const TABLE_NAME = "ping_type_table";
	const PING_TYPE_TEXT = "description";

	const DELETE_QUERY = "DROP TABLE IF EXISTS " . self::TABLE_NAME;
	const CREATE_QUERY = "CREATE TABLE " . self::TABLE_NAME . "(" .
				self::_ID . " INT NOT NULL AUTO_INCREMENT, " .
				self::PING_TYPE_TEXT . " VARCHAR (50), ".
				"PRIMARY KEY (" . self::_ID . "));";

	public static function Populate ($db)
	{
		$db -> execute ("INSERT INTO " . self::TABLE_NAME . " (" . self::PING_TYPE_TEXT . ") VALUES ('Email sent');");
		$db -> execute ("INSERT INTO " . self::TABLE_NAME . " (" . self::PING_TYPE_TEXT . ") VALUES ('Email opened');");
		$db -> execute ("INSERT INTO " . self::TABLE_NAME . " (" . self::PING_TYPE_TEXT . ") VALUES ('Link clicked');");
		$db -> execute ("INSERT INTO " . self::TABLE_NAME . " (" . self::PING_TYPE_TEXT . ") VALUES ('Attachment Opened');");
		$db -> execute ("INSERT INTO " . self::TABLE_NAME . " (" . self::PING_TYPE_TEXT . ") VALUES ('Form submitted');");
	}
}

class BatchTable extends BaseTable
{
	const TABLE_NAME = "batch_table";
	const BATCH_TEXT = "description";

	const DELETE_QUERY = "DROP TABLE IF EXISTS " . self::TABLE_NAME;
	const CREATE_QUERY = "CREATE TABLE " . self::TABLE_NAME . "(" .
					self::_ID . " INT NOT NULL AUTO_INCREMENT, " .
					self::BATCH_TEXT . " VARCHAR (50), " .
					"PRIMARY KEY (" . self::_ID . "));";

	public static function Populate ($db)
	{
		$db -> execute ("INSERT INTO " . self::TABLE_NAME . " (" . self::BATCH_TEXT . ") VALUES ('Generic Emails');");
		$db -> execute ("INSERT INTO " . self::TABLE_NAME . " (" . self::BATCH_TEXT . ") VALUES ('Targeted URLs');");
		$db -> execute ("INSERT INTO " . self::TABLE_NAME . " (" . self::BATCH_TEXT . ") VALUES ('Targeted Attachments');");
	}
}

class ConfigurationTable extends BaseTable
{
	const TABLE_NAME = "config_table";
	const CONFIG_NAME = "name";
	const CONFIG_VALUE = "value";

	const DELETE_QUERY = "DROP TABLE IF EXISTS " . self::TABLE_NAME;
	const CREATE_QUERY = "CREATE TABLE " . self::TABLE_NAME . "(" .
					self::_ID . " INT NOT NULL AUTO_INCREMENT, " .
					self::CONFIG_NAME . " VARCHAR (50), " .
					self::CONFIG_VALUE . " INT, " .
					"PRIMARY KEY (" . self::_ID . "));";

	public static function Populate ($db)
	{
	}
}

class BaseTable
{
	const _ID = "id";
}

?>