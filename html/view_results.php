<?php

/**
	view_results.php

	Dumps the data in 'ping_table' to the screen
**/

require ('database_helper.php');


?>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1"> 
		<title id="_header_page_title"></title>
		<link rel="stylesheet" type="text/css" href="css/styles.css" />
	</head>

	<body>
		<div class="container">
			<div class="header clearfix">
				<img src="images/logo.png" style="margin-right: 30px;" height=50px />
				<p><h3 class="header-heading" id="page_heading"></h3></p>
			</div>

			<div class="content">
				<p><h4>Database Dump</h4></p>

				<table width=100%>
					<tr>
						<th>User ID</th>
						<th>IP Addy</th>
						<th>Email Batch ID</th>
						<th>Response Type</th>
						<th>Date/Time</th>
					</tr>

<?php

$_database_helper = new DBHelper();
$_db = $_database_helper -> get_database ("db-config.php");

$query = "SELECT p.*, u." . UserTable::EMAIL . ", pt." . PingTypeTable::PING_TYPE_TEXT .
	" FROM " . PingRecordTable::TABLE_NAME . " p, " . UserTable::TABLE_NAME . " u, " . PingTypeTable::TABLE_NAME . " pt" .
	" WHERE p." . PingRecordTable::USER_ID . " = u." . UserTable::_ID .
	" AND p." . PingRecordTable::PING_TYPE_ID . " = pt." . PingTypeTable::_ID .
	" ORDER BY p." . PingRecordTable::TIMESTAMP;

$result_set = $_db -> execute_query ($query);

while ($row = $_db -> next ($result_set))
{
	$user_id = $row[UserTable::EMAIL];
	$ip_addy = $row[PingRecordTable::IP_ADDY];
	$batch = $row[PingRecordTable::BATCH_ID];
	$action = $row[PingTypeTable::PING_TYPE_TEXT];
	$datetime = $row[PingRecordTable::TIMESTAMP];

	$datetime = date ("D d/m/Y H:i:s", $datetime);

	$is_ok = 1;
	if ($ip_addy == "150.203.139.148") $is_ok = 0;
	if ($ip_addy == "127.0.0.1") $is_ok = 0;

	if ($is_ok == 1)
	{

?>

					<tr>
						<td><?php echo ($user_id); ?></td>
						<td><?php echo ($ip_addy); ?></td>
						<td><?php echo ($batch); ?></td>
						<td><?php echo ($action); ?></td>
						<td><?php echo ($datetime); ?></td>
					</tr>
<?php
	}
}

$_db -> disconnect();

?>
				</table>
			</div>

			<div class="footer">
				<p id="footer"></p>
			</div>
		</div>
	</body>

	<script type="text/javascript" src="js/view_results.js"></script>
</html>
