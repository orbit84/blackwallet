<!DOCTYPE HTML>
<html>
<head>
	<title>BlackWallet</title>
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <?php if(isset($useMaterialize)) { echo '<link type="text/css" rel="stylesheet" href="assets/css/materialize.min.css"  media="screen,projection"/>'; } ?>
	<link rel="icon" type="image/png" href="assets/img/icon.png" />
  <?php if(isset($useStarsCss)) { echo '<link type="text/css" rel="stylesheet" href="assets/css/stars.css"  media="screen,projection"/>'; } ?>
  <?php if(isset($useRocketCss)) { echo '<link type="text/css" rel="stylesheet" href="assets/css/rocket.css"  media="screen,projection"/>'; } ?>

	<!-- add to screen icons -->
	<link rel="apple-touch-icon" sizes="120x120" href="assets/img/apple-touch-icon-120x120-precomposed.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="assets/img/apple-touch-icon-152x152-precomposed.png" />

	<link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/utils.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes">

	<!-- yep, it s.... to load js in the header, but that's the only way to prevent conflicts between translation & materialize js -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script type="text/javascript" src="assets/js/materialize.min.js"></script>

	<?php  if(isset($loadStellarSdk)) { ?>
	<!-- load stellar sdk -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/0.7.3/stellar-sdk.min.js"></script>
	<?php } ?>

</head>
<body class="<?php if(isset($bgColor)) { echo $bgColor; } else { echo 'black'; } ?>">
  <nav>
    <div class="nav-wrapper black">
    	<div class="container">
	      <a href="home" id="logo" class="brand-logo blue-text light">blackwallet</a>
	      <ul id="nav-mobile" class="right hide-on-med-and-down">
	        <li><a href="getstarted">Get started</a></li>
	        <li><a href="freexlm">Free XLMs</a></li>
	        <li><a id="mywallet" class="btn blue waves-effect waves-light btn-logout" href="my">My wallet</a></li>
	      </ul>
	     </div>
		<ul id="walletnavmed" class="right hide-on-large-only hide-on-small-only hide">
	        <li><a class="btn btn-flat btn-logout red-text btn-logout"><i class="material-icons">power_settings_new</i></a></li>
	      </ul>
		<ul id="walletnavsmall" class="right hide-on-med-and-up">

	      </ul>

    </div>
  </nav>

  