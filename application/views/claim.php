<!-- LOADER -->
<!--<section class="padding-UB-large" id="loader">
	<div class="row center-align margin-UB padding-UB-large">
		<div class="preloader-wrapper big active">
		    <div class="spinner-layer spinner-blue-only">
		      <div class="circle-clipper left">
		        <div class="circle"></div>
		      </div><div class="gap-patch">
		        <div class="circle"></div>
		      </div><div class="circle-clipper right">
		        <div class="circle"></div>
		      </div>
		    </div>
		</div>

		<h4 class="blue-text darken-1 margin-U">loading</h4>
		<h5 class="grey-text darken-1 light margin-UB">please wait...</h5>
  	</div>
</section>

<div class="row white center-align padding-UB-large black-text hide" style="margin-bottom:0px !important;">
	<div class="container">
		<h2 class="blue-text light">hey!</h2>
		<h3 class="funds flow-text grey-text text-darken-3"><b><span></span></b> XLM</h3>
		<h5 class="light flow-text blue-text">are waiting for you</h5>
	</div>
</div>


<div class="row soft-bluegrey padding-UB-large blue-grey-text text-lighten-3  hide" style="margin-bottom:0px !important;">
	<div class="container">
		<h5 class="blue-text flow-text">FUNDS DESTINATION <i class="fa fa-cog blue-grey-text"></i></h5>

		<div class="row">
			<div class="input-field col s12">
				<i class="fa fa-key prefix blue-text"></i>
				<input type="text" readonly spellcheck="false" id="secretkey" value="">
				<label for="secretkey">Secret key</label>
			</div>
		</div>
	</div>
</div>

<div class="row bluegrey padding-UB-large blue-grey-text text-lighten-3 hide" style="margin-bottom:0px !important;">
	<div class="container">

		<h5 class="blue-text flow-text">IMPORTANT NOTICE</h5>
		<p>We generated a secret key for you, save it and store it somewhere safe! That secret key is used to access your account and manage your funds.<br/>
		<span class="red-text text-lighten-2">Blackwallet do not store nor have access to these data, if you lose your secret key, your funds will be lost too.</span></p>

		<h5 class="blue-text flow-text margin-U-large">LOST? HAVE QUESTIONS?</h5>
		<p>You may find the answers to your questions <a href="/getstarted" target="_blank">here</a> - you can also learn more about Stellar <a href="https://stellar.org" target="_blank">here</a>.</p>
	</div>

</div>

<div class="row soft-bluegrey padding-UB-large white-text center-align  hide">
	<a class="btn btn-large blue waves-effect waves-green white-text z-depth-3 margin-UB-large"><i class="fa fa-check"></i> <b>CLAIM NOW</b></a>
</div>


-->

<!-- LOADER -->
<section class="padding-UB-large" id="loader">
	<div class="row center-align margin-UB padding-UB-large">
		<div class="preloader-wrapper big active">
		    <div class="spinner-layer spinner-blue-only">
		      <div class="circle-clipper left">
		        <div class="circle"></div>
		      </div><div class="gap-patch">
		        <div class="circle"></div>
		      </div><div class="circle-clipper right">
		        <div class="circle"></div>
		      </div>
		    </div>
		</div>

		<h4 class="blue-text darken-1 margin-U">loading</h4>
		<h5 class="grey-text darken-1 light margin-UB">please wait...</h5>
  	</div>
</section>

<div class="row hide soft-bluegrey left-align padding-UB" style="margin-bottom:0;">
	<div class="container">
		<h5 class="blue-text">funds received</h5>
	</div>
</div>

<div class="row hide white center-align padding-UB-large" style="margin-bottom:0;">


	<div class="container padding-UB">

		<div>
			<div class="funds">		
				<div><i class="fa fa-money blue-text fa-4x"></i></div>
				<h5 class="grey lighten-3 grey-text text-darken-2 padding-UB"><span></span> XLM</h5>
			</div>

		</div>

	</div>
</div>

<div class="row hide soft-bluegrey left-align padding-UB" style="margin-bottom:0;">
	<div class="container">
		<h5 class="blue-text">funds destination</h5>
	</div>
</div>
<div class="row hide white center-align padding-UB-large" style="margin-bottom:0;">


	<div class="container padding-UB">

		<div>
			<a class="btn btn-large blue waves-effect waves-light z-depth-3 pulse newaccount">NEW ACCOUNT</a><br/>
			<a class="btn btn-large grey lighten-1 waves-effect waves-light margin-U existingaccount">EXISTING ACCOUNT</a>

		</div>

	</div>

</div>

<div class="row hide soft-bluegrey left-align padding-UB" style="margin-bottom:0;">
	<div class="container">
		<h5 class="blue-text">learn more</h5>
	</div>
</div>
<div class="row hide bluegrey blue-grey-text text-lighten-2 left-align padding-UB-large">


	<div class="container padding-UB">
		Lost? You can learn more about blackwallet &amp; stellar by <a href="/getstarted" target="_blank">clicking here</a>.
	</div>

</div>






<!-- New account  modal -->
<div id="newAccountModal" class="modal bluegrey grey-text">
	<div class="modal-content">
	  <h4 class="flow-text blue-text">New account</h4>
	  <div class="row">
		<p>We generated a secret key for you, save it and keep it somewhere safe, you will need it to manage your funds later.</p>
		<div class="input-field margin-U-large">
			<i class="fa fa-lock prefix blue-text"></i>
			<input type="text" readonly id="secretkey">
			<label for="secretkey">Secret key</label>
		</div>
		<div class="divider soft-bluegrey"></div>
		<p>Would you like to link your email (<b><?php echo $email; ?></b>) to this account so that the next time someone send you lumens through a mail, funds will be directly transfered to this account?</p>
		<div class="input-field">
			<input type="checkbox" readonly id="linkemail">
			<label for="linkemail">Yes, link my email</label>
		</div>

		 <div class="divider soft-bluegrey margin-U-large"></div>

		 <p class="red-text text-lighten-3">Please make sure that you saved your secret key before continuing. We do not store it nor have access to it - losing it would result in your funds being lost.</p>

		 <div class="divider soft-bluegrey margin-U-large"></div>
			<div class="input-field">
				<input type="checkbox" readonly id="confirmsave">
				<label for="confirmsave">Yes, I saved my secret key.</label>
			</div>
	  </div>


	  <div class="row center-align buttons">
	  	<a class="btn btn-large blue waves-effect waves-green z-depth-3 claim">CLAIM</a>
	  </div>
		
	</div>
</div>


<!-- Existing account modal -->
<div id="existingAccountModal" class="modal bluegrey grey-text">
	<div class="modal-content">
	  <h4 class="flow-text blue-text">Existing account</h4>
	  <div class="row">
		<p>Enter the public address or federated address of the existing account:</p>
		<div class="input-field margin-U-large">
			<i class="fa fa-rocket prefix blue-text"></i>
			<input type="text" spellcheck="false" autocomplete="off" id="linkaddress">
			<label for="linkaddress">Destination</label>
		</div>
	  </div>


	  <div class="row center-align buttons">
	  	<a class="btn btn-large blue waves-effect waves-green z-depth-3 toexisting">SEND FUNDS</a>
	  </div>
		
	</div>
</div>

<!-- Loading modal -->
<div id="loadingModal" class="modal bluegrey grey-text">
	<div class="modal-content">
	  <h4 class="flow-text blue-text">Please wait</h4>
	  <div class="row center-align">
		<div class="preloader-wrapper big active margin-UB-large">
			    <div class="spinner-layer spinner-blue-only">
			      <div class="circle-clipper left">
			        <div class="circle"></div>
			      </div><div class="gap-patch">
			        <div class="circle"></div>
			      </div><div class="circle-clipper right">
			        <div class="circle"></div>
			      </div>
			   </div>
			</div>
		</div>
	</div>
</div>

<input type="hidden" id="escrow" value="<?php echo $secretKey; ?>">
<input type="hidden" id="email" value="<?php echo $email; ?>">
<input type="hidden" id="emailS" value="<?php echo $emailSecret; ?>">
