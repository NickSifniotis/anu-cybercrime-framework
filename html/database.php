<?php

if (!defined ("DatabaseHelper"))
	die ("No!");

class DB
{
	private $config_fname = "";
	private $connected = false;
	private $connection;

	public function __construct ($config_file)
	{
		$this -> config_fname = $config_file;
	}


	/**
		Connects to the database specified in the configuration file.
	**/
	public function connect()
	{
		if ($this -> config_fname == "")
			die ("Database connection error - no configuration file given.");

		require ($this -> config_fname);

		$this -> connection = mysql_connect ("localhost", $username, $password);

		if (!$this -> connection)
			die ("Unable to connect to the database, aborting.");

		mysql_select_db($database) or die( "Unable to select database");

		$this -> connected = true;
	}


	public function disconnect()
	{
		if ($this -> connected)
		{
			mysql_close($this -> connection);
			$this -> connected = false;
		}
	}


	/**
		Returns true if the database is connected.
	**/
	public function connected()
	{
		return $this -> connected;
	}


	/**
		Executes a non-select query (ins, upd, del etc)
	**/
	public function execute($query)
	{
		if (!mysql_query ($query, $this -> connection))
			die ("Error: " . $query . "<br>" . $this -> connection -> error);
	}


	/**
		Executes a select query ..
	**/
	public function execute_query ($query)
	{
		return mysql_query ($query, $this -> connection);
	}


	/**
		.. and returns the next row in the result query set
	**/
	public function next ($result_set)
	{
		return mysql_fetch_assoc($result_set);
	}


	/**
		Frees the cursor resource
	**/
	public function close_query ($result_set)
	{
		mysql_free_result($result_set);
	}
}

?>
