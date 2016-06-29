<?php

/**
	Testing Database Connectivity
**/

include ("database_helper.php");


$_helper = new DBHelper();
$_db = $_helper -> get_database ("db-config.php");

?>

<html>
	<head>
		<title id="page_title"></title>
		<link rel="stylesheet" type="text/css" href="css/styles.css" />
	</head>

	<body>
		<div class="container">
			<div class="header">
				<h1 class="header-heading" id="page_heading" ></h1>
			</div>

			<div class="nav-bar">
				<ul class="nav">
					<li><a href="#" id="nav_item"></a></li>
				</ul>
			</div>

			<div class="content">
				<div class="main">
					<p id="page_content"></p>
				</div>
			</div>
		</div>
	</body>

	<script type="text/javascript" src="js/main.js"></script>
</html>
