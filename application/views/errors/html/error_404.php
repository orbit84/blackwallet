<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>BlackWallet - 404 Page Not Found</title>

<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

<link type="text/css" rel="stylesheet" href="https://blackwallet.co/assets/css/materialize.min.css"  media="screen,projection"/>
<link rel="icon" type="image/png" href="https://blackwallet.co/assets/img/icon.png" />
<link type="text/css" rel="stylesheet" href="https://blackwallet.co/assets/css/stars.css"  media="screen,projection"/>'

<!-- add to screen icons -->
<link rel="apple-touch-icon" sizes="120x120" href="https://blackwallet.co/assets/img/apple-touch-icon-120x120-precomposed.png" />
<link rel="apple-touch-icon" sizes="152x152" href="https://blackwallet.co/assets/img/apple-touch-icon-152x152-precomposed.png" />

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />


<style type="text/css">

::selection { background-color: #357599; color: white; }
::-moz-selection { background-color: #357599; color: white; }


code {
	font-family: Consolas, Monaco, Courier New, Courier, monospace;
	font-size: 12px;
	background-color: #f9f9f9;
	border: 1px solid #D0D0D0;
	color: #002166;
	display: block;
	margin: 14px 0 14px 0;
	padding: 12px 10px 12px 10px;
}

#container {
	margin: 10px;
	border: 1px solid #D0D0D0;
	box-shadow: 0 0 8px #D0D0D0;
}

p {
	margin: 12px 15px 12px 15px;
}

body{
	overflow:hidden;
}
</style>
</head>
<body class="black">
			<div id='stars'></div>
			<div id='stars2'></div>
			<div id='stars3'></div>


<div class="row center-align">
	<a href="https://blackwallet.co/home"><h4 class="blue-text text-darken-1"><i class="fa fa-rocket blue-text"></i> blackwallet<h4></a>
</div>
<div class="container grey-text center-align">
	<h4 class="white-text"><?php echo $heading; ?></h4>
	<p><?php echo $message; ?></p>
	<p>This page has been moved, has been removed, or is not available for public acccess.<br>
	If you think it's an error, please report it on our <a target="_blank" href="https://galactictalk.org/d/369-blackwallet-enhanced-account-viewer">official thread</a>.</p>
</div>
</body>
</html>