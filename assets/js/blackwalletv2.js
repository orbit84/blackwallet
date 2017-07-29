/*
	Subject: Blackwallet2 _ v0.1.6
	Author: made by orbit84 (https://github.com/orbit84)
	License: MIT License
	Thread: https://galactictalk.org/d/369-blackwallet-enhanced-account-viewer
	Desc: Stellar Lumen's web wallet.
*/

var current_slide = null;
var settings = 
				{
					'showTooltips': true,
					'autoRefresh': true,
					'mobileMode': false,
					'market': 'Coinmarketcap'
				};

var version = '0.1.6';

var activeWallet = {'publicKey': null, 'secretKey':null, 'data':null, 'name': 'Wallet 1'};

var wallets = [];

//auto-refresh on payments
var es;

var LIVE = false;

// executed on page load
function load() {
	init();

	if( ! loadWalletsFromStorage() ) {
		$('#unlock').slideDown();
		$('#generate').fadeIn();
		$('#loader').hide();
	}

	loadSettings();


	$('body').removeClass('black').addClass('bluegrey');

	// setup listeners

	$('#unlockBtn').on('click', function() { unlockWithSecretKey( $('#secretkey').val() ); });
	$('#generateKeypair').on('click', function() { generateKeypair(); });

	// wallet related
	$('.close').on('click', function() { showSlide('') });
	$('#toolSendLumens').on('click', function() { showSlide('#walletSend'); });
	$('#toolReceiveLumens').on('click',  function() { showSlide('#walletReceive'); });
	$('.toolInspect').on('click',  function() { showSlide('#walletInspect'); });
	$('.toolHoldings').on('click',  function() { showSlide('#walletHoldings');   });
	$('.toolCharts').on('click',  function() { showSlide('#walletCharts'); });
	$('.toolCommunity').on('click',  function() { showSlide('#walletCommunity'); });
	$('.toolDonate').on('click',  function() { showSlide('#walletDonate'); });
	$('.toolGiveaway').on('click',  function() { showSlide('#walletGiveaway'); });
	$('.toolSettings').on('click',  function() { showSlide('#walletSettings');  });

	// wallet send
	$('#sendLumens').on('click',  preparePayment);

	// wallet receive
	$('.editFederatedName').on('click', editFederatedName);

	// wallet inspect
	$('#walletInspectBtn').on('click',  function() { inspectAddress(undefined); });
	

	// wallet holdings
	$('#hUpdateTrust').on('click', changeTrustAsset);
	$('#hSearchAnchor').on('click', searchAnchor);

	// wallet giveaway
	$('#getBwCode').on('click',  function() { showBlackWalletCode(); });


	// wallet settings
	$('#settingsShowTooltips').on('change', function() { setTooltipsVisible( $('#settingsShowTooltips').is(':checked') ); });
	$('#settingsAutoRefresh').on('change', function() { setAutoRefresh( $('#settingsAutoRefresh').is(':checked') ); });
	//prevent the mobile mode to be disabled through settings, user must logout to do so.
	//$('#settingsMobileMode').on('click', function() { if(settings.mobileMode) {    event.preventDefault();  event.stopPropagation(); } });
	$('#settingsMobileMode').on('change', function() { setMobileMode( $('#settingsMobileMode').is(':checked') ); });
	$('#settingsAccountsConfig').on('click', function() { showAccountsWindow( ); });
	$('#saveAccounts').on('click', function() { settingsSaveWallets(); });

	// market choice
	$('#settingsMarket').on('change', function() { setMarket( $('#settingsMarket').val() ); });
	$('#settingsSetInflationDestination').on('click', setInflationDestination);

	// select public address on click
	$('#publicAddress').on('click', function() { $(this).select(); });

	// merge account modal
	$('#mergeAccountConfirm').on('click', mergeAccount);

	// logout buttons
	$('.btn-logout').on('click', function() { $('#logoutModal').modal('open'); });
	$('#hardLogout').on('click', function() { hardLogout(); });
}

function init() {
	//init stellarsdk's server

	if(!LIVE) {
		server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
		StellarSdk.Network.useTestNetwork();
	} else {
		server = new StellarSdk.Server('https://horizon.stellar.org');
		StellarSdk.Network.usePublicNetwork();	
	}


	// init materializecss select
	$('select').material_select();

	// init modals
	$('.modal').modal();


	// init tabs
	$('ul.tabs').tabs();

  // display BW version
  $('#bwVersion').html('Version ' + version);

}


// wait for the page to be fully loaded
//window.addEventListener('load', load);
// with the translation extension, blackwallet is now loaded from the translation.js file



function loadWalletsFromStorage() {
	var _wallets = JSON.parse(localStorage.getItem('wallets'));
	var activew = JSON.parse(localStorage.getItem('activew'));

	if( _wallets && _wallets.length > 0 ) {

		for(var i=0; i<_wallets.length; i++) {
			_wallets[i].secretKey = decodeSecretKey(_wallets[i].secretKey);
		}

		wallets = _wallets;

		activeWallet = JSON.parse(localStorage.getItem('activew'));
		activeWallet.secretKey = decodeSecretKey(activeWallet.secretKey);

		unlockWithSecretKey(activeWallet.secretKey);
		settingsDisplayWallets();
		return true;
	}

	return false;
}


function saveWalletsToStorage() {
	var _wallets = JSON.parse(JSON.stringify(wallets));
	for(var i=0; i<_wallets.length; i++) {
		_wallets[i].secretKey = encodeSecretKey(_wallets[i].secretKey);
	}

	var _activeWallet = JSON.parse(JSON.stringify(activeWallet));
	_activeWallet.secretKey = encodeSecretKey(_activeWallet.secretKey);
	localStorage.setItem( 'wallets', JSON.stringify(_wallets) );
	localStorage.setItem( 'activew', JSON.stringify(_activeWallet) );

}

/* display the wallets in the settings */
function settingsDisplayWallets() {


	/* display the wallets data in the walletmodal */
	$('#accountsModal .modal-content').html('<h4 class="flow-text blue-text">Accounts</h4>');
	$('#walletsList').html('');
	for(var i=0; i<wallets.length; i++) {


		$('#accountsModal .modal-content').append('<div class="row settingsWallet" id="settingsWallet-'+i+'"> \
											        <div class="input-field col s4"> \
											          <input type="text" autocomplete="off" autocomplete="off" spellcheck="false" id="walletName-'+i+'" value="'+escapeHtml(wallets[i].name)+'"/> \
											          <label for="walletName-'+i+'">'+getTextFor('name')+'</label> \
											        </div> \
											        <div class="input-field col s6"> \
											          <input type="text" readonly="true" autocomplete="off" spellcheck="false" id="walletKey-'+i+'" value="'+wallets[i].secretKey+'"/> \
											          <label for="walletKey-'+i+'">'+getTextFor('secretKey')+'</label> \
											        </div> \
											        <div class="input-field col s2 center-align"> \
											          <a class="btn btn-flat red-text" onclick="settingsRemoveWallet('+i+')"><i class="fa fa-times"></i></a> \
											        </div> \
											  </div>');

		/* display the wallets radiobuttons */
		$('#walletsList').append('<p> \
							      <input '+(activeWallet.secretKey == wallets[i].secretKey ? 'checked' : '')+' class="with-gap selectWallet" name="group1" type="radio" id="wallet-'+i+'"  /> \
							      <label for="wallet-'+i+'">'+escapeHtml(wallets[i].name)+'</label> \
							    </p>');


	}

	$('#accountsModal .modal-content').append('<div class="row"><a id="addWallet" class="btn blue-grey darken-2"><i class="fa fa-plus"></i></a></div>');

	//update listeners
	$('.selectWallet').on('click', function() { event.preventDefault();  event.stopPropagation(); settingsSelectWallet($(this).attr('id')); });
	$('#addWallet').on('click', function() { settingsAddWallet(); });



	try {
		Materialize.updateTextFields();
	} catch(e) {
		console.log('materialize textupdating failed');
	}

}

function settingsSaveWallets() {
	var _wallets = [];
	var collection = document.querySelectorAll('.settingsWallet');

	for(var i=0;i<collection.length;i++) {

		var name = collection[i].querySelectorAll('input')[0].value;
		var key = collection[i].querySelectorAll('input')[1].value;

		if(key == '') {
			continue;
		}

		_wallets.push( {'name':name,'secretKey':key} );
	}

	wallets = _wallets;
	console.log(_wallets);
	saveWalletsToStorage();
	settingsDisplayWallets();
	updateActiveWallet(false);
}


function settingsSelectWallet(id) {
	var _index = id.split('-')[1];
	showLoadingWindow(true);
	unlockWithSecretKey(wallets[_index].secretKey);
}

function settingsRemoveWallet(index) {
	if(wallets.length <= 1 || activeWallet.secretKey == wallets[index].secretKey) {
		Materialize.toast(getTextFor('cantDeleteActiveWallet'), 5000, 'red');
		return false;
	}

	$('#settingsWallet-'+index).remove();
}

function settingsAddWallet() {
	var walletIndex = $('.settingsWallet').length;

	$('#accountsModal .modal-content').append('<div class="row settingsWallet" id="settingsWallet-'+walletIndex+'"> \
										        <div class="input-field col s4"> \
										          <input type="text" autocomplete="off" spellcheck="false" id="walletName-'+walletIndex+'" value=""/> \
										          <label for="walletName-'+walletIndex+'">Name</label> \
										        </div> \
										        <div class="input-field col s7"> \
										          <input type="text" autocomplete="off" spellcheck="false" id="walletKey-'+walletIndex+'" value=""/> \
										          <label for="walletKey-'+walletIndex+'">Secret key</label> \
										        </div> \
										  </div>');
}


function addWallet(wallet) {
	for (var i =0; i<wallets.length; i++) {
		if(wallets[i].secretKey == wallet.secretKey) {
			return false;
		}
	}


	wallets.push(wallet);

	if (settings.mobileMode) {
		saveWalletsToStorage();
	}

	settingsDisplayWallets();

	return true;
}


/* encode a secret key */
function encodeSecretKey(secretKey) {
	try {
		secretKey = secretKey.toLowerCase();

		var _secretKey = secretKey.split('');
		var t = _secretKey[9];
		_secretKey[0] = 'E';
		_secretKey[9] = _secretKey[15];
		_secretKey[15] = t;

		return _secretKey.join('');
	} catch(e) {

	}
}

/* decode an encoded secret key passed in parameter  */
function decodeSecretKey(encodedSecretKey) {
	if(encodedSecretKey.startsWith('S'))
		return false;

	encodedSecretKey = encodedSecretKey.toUpperCase();


	var _secretKey = encodedSecretKey.split('');
	var t = _secretKey[9];
	_secretKey[0] = 'S';
	_secretKey[9] = _secretKey[15];
	_secretKey[15] = t;

	return _secretKey.join('');
}








/* unlock the wallet using the secret key secretKey,
shows an error message on failure.
*/
function unlockWithSecretKey(secretKey) {

	var success = false;
	var keyPair = getKeypairFromSecretKey(secretKey);
	if( !keyPair ) { 
		$('#loadingModal').modal('close');
		return false; 
	}

	$('#unlockForm').addClass('hide');
	$('#unlockLoading').removeClass('hide');


	server.loadAccount(keyPair.publicKey)
		.then(function(data) {
	  		success = true;
			activeWallet.data = data;
			
			// init autorefresh
			es = server.payments()
			  .cursor('now')
			  .forAccount(keyPair.publicKey)
			  .stream({
			    onmessage: function (message) {
			    	if( settings.autoRefresh )
			      		updateActiveWallet(true);
			    	}
			  });



		})
	    .catch(function(err) {
		  	if ( err.name == 'NotFoundError' ) {
		  		success = true;

		  		// this is to prevent errors with multiple accounts and nonfunded accounts, do not edit
				activeWallet.data = null;
				activeWallet.publicKey = keyPair.publicKey;
				activeWallet.secretKey = keyPair.secretKey;
				updateActiveWallet(true);
		  	}
  		})
  		.finally(function() {
			$('#unlockForm').removeClass('hide');
			$('#unlockLoading').addClass('hide');

			$('#loadingModal').modal('close');

			if(success) {
				activeWallet.publicKey = keyPair.publicKey;
				activeWallet.secretKey = keyPair.secretKey;
				loadFederatedName();
				updateActiveWallet(false);
				displayWallet();
				$('#loader').hide();
			}

  		});


}

/* return a keypair from a secretKey */
function getKeypairFromSecretKey(secretKey) {
	try {
		keyPair = StellarSdk.Keypair.fromSecret(secretKey);
		publicKey = keyPair.publicKey();
	}
	catch(e) {
		Materialize.toast('Error: invalid secret key', 4000, 'red');
		return false;
	}

	return {'publicKey': publicKey, 'secretKey': secretKey};
}


/* update wallet's balance, transactions etc. */
function updateActiveWallet(reloadWallet) {

	// same as having reloadWallet=true in parameters, used for IE / edge support
	if(typeof reloadWallet == undefined) {
		var reloadWallet = true;
	}

	// search for the wallet through wallets array and update the active's wallet name
	for(var i=0; i<wallets.length;i++) {
		if(wallets[i].secretKey == activeWallet.secretKey) {
			activeWallet.name = wallets[i].name;
		}
	}

	if(reloadWallet) {
		var success = false;

		server.loadAccount(activeWallet.publicKey)
			.then(function(data) {
				activeWallet.data = data;
				success = true;
			})
		    .catch(function(err) {
			  	Materialize.toast(err.detail, 5000, 'red');
	  		})
	  		.finally(function() {
				updateTransactionHistory();
				updateBalances();

	  		});

	  	if(!success) {
	  		activeWallet.data = null;
	  	}

	} else {
		updateBalances();
		updateTransactionHistory();
		updateName();
	}

	if(settings.mobileMode) {
		saveWalletsToStorage();
		settingsDisplayWallets();
	}

}

// update active wallet's sequence number
function fetchActiveWalletSequenceNumber()  {
	return new Promise((resolve, reject) => {
		server.loadAccount(activeWallet.publicKey)
			.then(function(data) {
				activeWallet.data = data;
				resolve();
			})
			.catch(function(err) {
				reject(err);
			});

	  });
}


/* return the active wallet's lumens balance */
function getWalletLumensCount() {
	try {
		for(var i=0; i<activeWallet.data.balances.length; i++) {
			if(activeWallet.data.balances[i].asset_type == 'native') {
				return activeWallet.data.balances[i].balance;
			}
		}

		return 0;
	} catch(e) {
		return 0;
	}
}

/* return the active wallet's public key */
function getWalletPublicKey() {
	return activeWallet.publicKey;
}


/* move from the unlock page to the wallet page */
function displayWallet() {
	// change "my wallet" button to logout button
	$('#mywallet').removeClass('blue').addClass('btn-flat red-text text-lighten-1 waves-red')
									  .html('<i class="material-icons">power_settings_new</i>').removeAttr('href');
	$('#logo').removeAttr('href');
	

	// display logout buttons for medium size devices
	$('#walletnavmed').removeClass('hide');

	// remove menu links
	$("li:contains('Get started'), li:contains('Free XLMs')").remove();

	$('#unlock, #generate').slideUp();
	$('#walletHeader, #walletTools').fadeIn();

	displayPublicKey();
}

function displayPublicKey() {
	$('#publicAddress').val(activeWallet.publicKey);
}

/* update active wallet's name */
function updateName() {
	$('#activeWalletName').html(escapeHtml(activeWallet.name));
}

/* display the balances (lumens, usd...)  (tokens later) */
function updateBalances() {

	// update Lumens balance
	$('#lumensBalance').html( formatLumens(getWalletLumensCount()) + ' XLM' );
	
	// update USD balance
	updateUsdBalance();
	updateAssets();

	onBalanceUpdate();

}

function updateUsdBalance() {

	switch(settings.market) {
		case 'Coinmarketcap':
			$.get( "https://api.coinmarketcap.com/v1/ticker/stellar/", { 'convert': 'EUR' } )
			  .done(function( data ) {
				$('#usdBalance').html( '$' + (getWalletLumensCount() * data[0].price_usd).toFixed(2).toLocaleString() );

			});

			break;
		case 'Kraken':
			$.get( "https://api.kraken.com/0/public/Ticker", { 'pair': 'XLMUSD' } )
			  .done(function( data ) {
				$('#usdBalance').html( '$' + (getWalletLumensCount() * data.result.XXLMZUSD.a[0]).toFixed(2).toLocaleString() );

			});
			break;
		case 'test':
			$('#usdBalance').html( '$works');
			break;
	}
}

// update wallet according to available assets
function updateAssets() {
	// update asset list in walletSend
	var options = '<option>XLM</option>';

	try {
		for(var i=0; i<activeWallet.data.balances.length; i++) {
			if(activeWallet.data.balances[i].asset_type == "native")
				continue;

			var val = activeWallet.data.balances[i].asset_code + '|' + activeWallet.data.balances[i].asset_issuer
			options += '<option value="'+val+'">' + activeWallet.data.balances[i].asset_code + '</option>';

		}
	} catch(e) {

	}

	$('#sasset').html(options);
	$('select').material_select();

	// ------------------ //

	// update assets in holdings page

	try {

		var table = `<table id="assetsList"> 
						<thead class="bluegrey"> 
							<tr> 
								<th>`+getTextFor('name')+`</th> 
								<th>`+getTextFor('assetCode')+`</th> 
								<th>`+getTextFor('info')+`</th> 
								<th>`+getTextFor('sendMoneyAmount')+`</th> 
								<th> </th> 
							</tr> 
						</thead> 
						<tbody></tbody></table>`;

		$('#hassets').html(table);


		for(var i=0; i<activeWallet.data.balances.length; i++) {
			console.log(i);
			// if its the lumen asset, display and continue
			if(activeWallet.data.balances[i].asset_type == "native") {
				var row = '';

		    	row += '<tr>';
		    	row += '<td>Lumen</td>';
		    	row += '<td><img style="width:32px; height:32px;" src="https://blackwallet.co/assets/img/lumen.png"/> XLM</td>';
		    	row += '<td> </td>';
		    	row += '<td>'+getWalletLumensCount()+'</td>';
		    	row += '</tr>';
			   	$('#assetsList tbody').append(row);

				continue;
			} else {
				var row = '';

				var issuer = activeWallet.data.balances[i].asset_issuer;
				var code = activeWallet.data.balances[i].asset_code;
		    	row += '<tr class="asset'+issuer+'">';
		    	row += '<td class="aname"><i class="fa fa-cog fa-spin"></i></td>';
		    	row += '<td class="acode"><i class="fa fa-spin fa-cog"></i> '+code+'</td>';

		    	row += '<td class="ainfos"><a class="btn grey waves-effect" onclick=\'showAssetInfo('+JSON.stringify({"issuer":issuer, "code":code})+')\'><i class="fa fa-book"></i></a></td>';
		    	row += '<td class="aamount">'+activeWallet.data.balances[i].balance+'</td>';
		    	row += '</tr>';
			   	$('#assetsList tbody').append(row);
			}

			server.loadAccount(issuer)
				.then(function(data) {

					StellarSdk.StellarTomlResolver.resolve(data.home_domain)
					  .then(toml => {

					    for(var i=0; i<toml.CURRENCIES.length;i++) {
					    	if(toml.CURRENCIES[i].issuer == data.account_id) {
					    		var asset = toml.CURRENCIES[i];
						    	
						    	$('.asset'+asset.issuer+' .aname').html(asset.name ? asset.name : '<i class="fa fa-times red-text"></i>');
						    	$('.asset'+asset.issuer+' .acode').html('<img style="width:32px; height:32px;" src="'+asset.image+'"/> '+asset.code);
						    	$('.asset'+asset.issuer+' .ainfos').html('<a class="btn blue waves-effect" onclick=\'showAssetInfo('+JSON.stringify(asset)+')\'><i class="fa fa-search"></i></a>');
					    	}
					    }
					  })
					  .catch(function(err) {

					  });

				});
		}

	} catch(e) {
		console.log('[updateAssets]',e);
	}

}

/* load the active wallet's last 25 transactions and display them */
function updateTransactionHistory() {
	server.operations()
		    .forAccount( getWalletPublicKey() )
		    .limit(25)
		    .order('desc')
		    .call()
		    .then(function (ops) {
				$('#transactions tbody').html('');

				for(var i=0; i<ops.records.length; i++) {
					op = ops.records[i];

					var _key = '';
					var amount = '';
					var memo = '';
					var opID = op.id;
					var asset = op.asset_type == 'native' ? 'XLM' : op.asset_code;
					var _action = '';
					var transaction_id = op._links.transaction.href.split('/')[4];

					switch(op.type) {
						case "create_account":
							amount = op.starting_balance;

							if (op.account == publicKey) {
								_key = op.funder;
								_action = "received";
							} else {
								_key = op.account;
								_action = "sent";
							}

							asset = 'XLM';
							break;
						case "account_merge":
							amount = false;
							if (op.source_account == publicKey) {
								_key = op.into;
								_action = "sent";
							} else {
								_key = op.source_account;
								_action = "received";
							}
							asset = 'XLM';
							break;
						case "payment":
							amount = op.amount;
							if (op.from == publicKey) {
								_key = op.to;
								_action = "sent";
							} else {
								_key = op.from;
								_action = "received";
							}
							break;
						default:
							// if its not a payment or an account creation, we go to the next iteration of the for loop
							continue;
							break;
					}

					$('#transactions tbody').append(
						'<tr>\
						<td><span class="grey-text text-lighten-2" id="date'+transaction_id+'"></span><a href="#" onclick="inspectAddress(\''+_key+'\');">' + _key + '</a></td> \
						<td class="center-align">'+ (_action == "received" ? '<span class="green-text">+<span  id="amount'+opID+'">' : '<span class="red-text">-<span  id="amount'+opID+'">') + (amount ? formatLumens(amount) : '<i class="fa fa-cog fa-spin"></i>') + '</span></span> <span class="light">' + asset + '</span></td> \
						<td class="center-align" id="memo'+transaction_id+'"><i class="fa fa-cog fa-spin"></i></td> \
						<td class="center-align"><a href=" ' + op._links.self.href + ' " target="_blank">' + op.id + '</a></td> \
						</tr>');

					server.transactions()
						.transaction(transaction_id)
						.call()
						.then(function(transaction) {
							// check for memo
							var memo_type = transaction.memo_type != 'none' ? 'MEMO_' + transaction.memo_type : '';
							var memo = transaction.memo ? transaction.memo : '';
							$('#memo'+transaction.id).html('<span class="light grey-text">'+memo_type.toUpperCase() +'</span><br/>' + memo);

							// add date
							var date = new Date(transaction.created_at);
							$('#date'+transaction.id).html('<span class="grey-text text-lighten-2"><i class="fa fa-clock-o"></i> '
								+ date.toLocaleString() +'</span><br/>');
						});

					// check for merge account balance
					if(op.type == "account_merge") {
						server.effects()
						.forOperation(opID)
						.call()
						.then(function(effect) {
							var _amount = 0;
							var _id;

							for(var i = 0; i<effect.records.length; i++) {
								if(effect.records[i].type == "account_credited") {
									_amount = effect.records[i].amount;
									_id = effect.records[i].paging_token.split('-')[0];
									break;
								}
							}
							$('#amount'+_id).html(formatLumens(_amount));
						});
					}
		    	}
		})
	    .catch(function (err) {
			$('#transactions tbody').html('<p class="grey-text">'+getTextFor('noTransactions')+'</p>');
	    });
}


/* remove the secret keys stored in the storage and then logout */
function hardLogout() {
	$('body').html('<div class="container center-align"><h1 class="flow-text blue-text"><i class="fa fa-spinner fa-spin"></i></h1></div>');

	localStorage.removeItem('wallets');
	localStorage.removeItem('activew');


	// disable mobile mode
	settings.mobileMode = false;
	saveSettingsToStorage();

	location.reload();
}

function preparePayment() {
	var amount = $('#samount').val();

	if( !amount || amount < 0 || isNaN(amount) ) {
		Materialize.toast(getTextFor('amountError'), 5000, "red");
		return false;
	}

	showLoadingWindow(true);

	handleDestination( $('#saddress').val() )
			.then( (destination) => {
				var memo;
				var memo_type;

				if( !destination.memo ) {
					memo_type = $('#smemo').val();
					memo = $('#smemoinput').val();
				} else {
					memo_type = "MEMO_"+destination.memo_type.toUpperCase();
					memo = destination.memo;
				}

				var asset = $('#sasset').val().split('|');
				var assetCode = asset[0];
				var assetIssuer = asset[1];

				if(assetCode == 'XLM') {
					asset = StellarSdk.Asset.native();
				} else {
					asset = new StellarSdk.Asset(assetCode, assetIssuer);
				}

				if(!memo) { memo_type = 'none'; }
				try {
					switch(memo_type) {
						case 'MEMO_TEXT':
							memo = StellarSdk.Memo.text(memo);
							break;
						case 'MEMO_HASH':
							memo = StellarSdk.Memo.hash(memo);
							break;
						case 'MEMO_ID':
							memo = StellarSdk.Memo.id(memo);
							break;
						case 'MEMO_RETURN':
							memo = StellarSdk.Memo.returnHash(memo);
							break;
						default:
							memo = StellarSdk.Memo.none('');
							break;
					}
				} catch (e) {
					Materialize.toast(e, 4000, "red");
					showLoadingWindow(false);
					return false;
				}

				confirmPayment(destination, memo, memo_type, asset, amount);


			})
			.catch( function(error) {
				showLoadingWindow(false);
				Materialize.toast(error, 5000, "red");
			});



}

// user must confirm the payment, details are shown and he
// either have the choice to confirm it or cancel it
function confirmPayment(destination, memo, memo_type, asset, amount) {
	// hide the loading window in case it's still visible
	showLoadingWindow(false);

	$('#confirmSendModal').modal({dismissible:false});

	$('#confirmSendModal .destination').html( (destination.stellar_address ? destination.stellar_address
										+ ' (<span style="word-wrap:break-word;">' + destination.account_id + '</span>)'
											 : '<span style="word-wrap:break-word;">' + destination.account_id + '</span>') );
	$('#confirmSendModal .asset').html(  asset.getCode() );
	$('#confirmSendModal .amount').html(  amount );
	$('#confirmSendModal .memo').html(  '<span class="light grey-text text-darken-3">' + memo_type.toUpperCase() + '</span> ' 
										+ (memo._value ? memo._value : '') );


	if ( destination.is_email ) {

		if(asset.getCode() != "XLM") {
			Materialize.toast(getTextFor('mailSendAssetTypeError'), 5000, "red");
			return false;
		}


		if( amount < 40.1 ) { Materialize.toast(getTextFor('mailSendAmountError'), 5000, 'red'); return false; }

		$('#confirmSendModal .secret').removeClass(  'hide' );
		$('#confirmSendModal .secret .key').html(  '<input class="inp" type="text" spellcheck="false" readonly value="'+destination.secret_key+'">' );

		$('#confirmSendModal .secret .key .inp').off();
		$('#confirmSendModal .secret .key .inp').on('click', function() { $(this).select(); });

		$('#confirmSendModal .message').removeClass( 'hide' );


	} else {
		$('#confirmSendModal .secret').addClass(  'hide' );
		$('#confirmSendModal .secret .key').html( '' );
		$('#confirmSendModal .message').addClass( 'hide' );
	}



	$('#confirmSendModal .confirm').off();
	$('#confirmSendModal .confirm').on('click', function() { destination.message = $('#confirmSendModal .message textarea').val(); sendPayment(destination, memo, asset, amount); });

	$('#confirmSendModal').modal('open');

}

// once payment was confirmed by the user, we send it
function sendPayment(destination, memo, asset, amount) {
	// if the user has not enough lumens, propose to merge the account (this prevent extra fees)
	if( asset.code == 'XLM' && asset.issuer == undefined && parseFloat(amount) >= getWalletLumensCount() ) {
		mergeAccountProposal(destination);
		return false;
	}

	showLoadingWindow(true);

	try {
	    var transaction = new StellarSdk.TransactionBuilder(activeWallet.data)
	      .addOperation(StellarSdk.Operation.payment({
	        destination: destination.account_id,
	        asset: asset,
	        amount: amount,
	      }))
	      .addMemo(memo)
	      .build();
	} catch (e) {
	    if (e instanceof TypeError) {
			Materialize.toast(getTextFor('amountError'), 5000, "red");
		} else {
			Materialize.toast(e, 6000, "red");
	    }

		showLoadingWindow(false);
	    return false;
	}

    transaction.sign(StellarSdk.Keypair.fromSecret(activeWallet.secretKey));

    var stopLoading = true;


    server.submitTransaction(transaction)
      .then(function(transactionResult) {
		Materialize.toast("You've sent "+(amount)+"  "+asset.getCode()+" successfuly!", 5000, "green");
		if(destination.is_email) {
			sendMail(destination, amount);
		}

      })
      .catch(function(err) {
        console.log('[sendingMoney] An error has occured:');
        console.log(err);

        try {
			if( asset.code == 'XLM' && !asset.issuer && (err.extras.result_codes.operations && err.extras.result_codes.operations[0] == 'op_underfunded'
				|| err.extras.result_codes.transaction && err.extras.result_codes.transaction == 'tx_insufficient_balance') ) {
				// if the sender has not enough funds, propose to merge account
				mergeAccountProposal(destination);
			}
			else if(asset.code == 'XLM' && !asset.issuer && err.extras.result_codes.operations && err.extras.result_codes.operations[0] == 'op_no_destination') { 
				// if the account doesn't exist, we create it
				//Materialize.toast("Account doesn't exist, creating one...", 5000, "orange");
				createAccount(destination, amount, memo);
				stopLoading = false;

			} else if(transaction.is_email && asset.getCode() != "XLM") {
				Materialize.toast(getTextFor('mailSendAssetTypeError'), 5000, "red");
			} else {
				Materialize.toast(getTextFor('error'), 5000, "red");

		    }
        } catch(e) {
			Materialize.toast(getTextFor('error'), 5000, "red");
        }

      })
      .finally(function() {
      	if( stopLoading )
			showLoadingWindow(false);
		$('#walletSendForm input[type=text]').not($('.select-dropdown')).val('');
      });
}


function createAccount(destination, startingBalance, memo) {
  	showLoadingWindow(true);

	fetchActiveWalletSequenceNumber().then(() => {

	    var transaction = new StellarSdk.TransactionBuilder(activeWallet.data)
	      .addOperation(StellarSdk.Operation.createAccount({
	        destination: destination.account_id,
	        startingBalance: startingBalance,
	      }))
	      .addMemo(memo)
	      .build();

	    transaction.sign(StellarSdk.Keypair.fromSecret(activeWallet.secretKey));



	    server.submitTransaction(transaction)
	      .then(function(transactionResult) {

			Materialize.toast(getTextFor('accountCreationNotice') + " " + (startingBalance) + " XLM", 5000, "green");
			if(destination.is_email) {
				sendMail(destination, startingBalance);
			} 

	      })
	      .catch(function(err) {

	      	/*try {
				// if the sender has not enough funds, propose to merge account
				if(err.extras.result_codes.operations && err.extras.result_codes.operations[0] == 'op_underfunded') {
					mergeAccountProposal(destination.account_id);
				} else {
					Materialize.toast("Account creation error!", 5000, "red");
			    }
	      	} catch(e) {*/
		 if(transaction.is_email && asset.getCode() != "native") {
			Materialize.toast(getTextFor('mailSendAssetTypeError'), 5000, "red");
		} else {
			Materialize.toast(getTextFor('accountCreationError'), 5000, "red");
		}


	      	/*}*/

	        console.log('[accountCreation] An error has occured:');
	        console.log(err);


	      })
	      .finally(function() {
	      	showLoadingWindow(false);

	      });
	});
}

/* retrieve public id of a federated address nor create/retrieve public id linked to an email address
return a stellar public id */
function handleDestination(destination) {




	return new Promise((resolve, reject) => {
			var name;
			var domain;

			// check if it's a federated address
			if(!destination) {
				reject(getTextFor('invalidDestination'));
			}
			else if( destination.indexOf('*') != -1 ) {				//federated addresses

				$.get('https://'+destination.split('*')[1]+'/.well-known/stellar.toml')
				.then(function() {

					StellarSdk.FederationServer.resolve(destination)
					 .then(federationRecord => {
							resolve(federationRecord);

					 })
					 .catch(function(error) {
					 		reject(error.detail);

					 });

				})
				.catch(function() {
					reject(getTextFor('domainNotFound'));
				});



			} else if( validateEmail(destination) ) { // email addresses

				// check if the email is not already linked to an account
				StellarSdk.FederationServer.resolve(destination + '*blackwallet.co')
				 .then(federationRecord => {
						resolve(federationRecord);

				 })
				 .catch(function(error) {
					// else create an escrow account
					var escrow = StellarSdk.Keypair.random();
					resolve({account_id: escrow.publicKey(), secret_key: escrow.secret(),
							 stellar_address:destination, is_email: true});

				 });

			} else if( StellarSdk.StrKey.isValidEd25519PublicKey(destination) ) {	// public keys
				resolve({account_id: destination});

			} else {
				reject(getTextFor('unhandledDestination'));
			}

	  });
}

/* if it was a payment to an email address, send a mail to the email address
explaining how to claim the funds etc. */
function sendMail(destination, amount) {
	console.log('sending mail',destination,amount);
	$.post( "https://blackwallet.co/api/mail", 
	{
		email:destination.stellar_address,
		public_key:destination.account_id,
		secret_key:destination.secret_key,
		amount:amount,
		message:destination.message
	})
	  .done(function() {
	    

	  })
	  .fail(function(err) {
	    console.log('[mailSending]',err)
	  })
	  .always(function() {

	  });

}

function mergeAccountProposal(destination) {
	$('#mergeAccountModal').modal({
      dismissible: false
  	});

	$('#mergeAccountModal #mergeAccountLumens').html(getWalletLumensCount());
	$('#mergeAccountModal #mergeAccountDestination').html(destination.account_id);

	$('#mergeAccountModal').modal('open');
}

function mergeAccount() {
	fetchActiveWalletSequenceNumber().then(() => {

		var destination = 	$('#mergeAccountModal #mergeAccountDestination').text();


	    var transaction = new StellarSdk.TransactionBuilder(activeWallet.data)
	      .addOperation(StellarSdk.Operation.accountMerge({
	        destination: destination
	      }))
	      .build();

	    transaction.sign(StellarSdk.Keypair.fromSecret(activeWallet.secretKey));

		showLoadingWindow(true);

	    server.submitTransaction(transaction)
	      .then(function(transactionResult) {

			Materialize.toast(getTextFor("accountMergeSuccess") + " " + destination, 5000, "green");

			updateActiveWallet(true);
	      })
	      .catch(function(err) {
	      	try {
		      	if(err.extras.result_codes && err.extras.result_codes.operations[0] == 'op_has_sub_entries') {
					Materialize.toast(getTextFor("accountMergeErrorAssets") , 5000, "red");
		      	} else {
					Materialize.toast(getTextFor("accountMergeError") , 5000, "red");
		      	}
	      	} catch(e) {
				Materialize.toast(getTextFor("accountMergeError") , 5000, "red");
	      	}

	        console.log('[mergeAccount] An error has occured:');
	        console.log(err);
	      })
	      .finally(function() {
			showLoadingWindow(false);

	      });
	});

}


/* load the federated name associated to the active wallet public id */
function loadFederatedName() {
  	$('#federatedName').val('loading...');

	$.get( "https://blackwallet.co/api/federation", { q: activeWallet.publicKey, type: "id" } )
	  .done(function( data ) {
	  	if( data.stellar_address ) {
		  	$('#federatedName').val(data.stellar_address);
			$('.editFederatedName')
			.off()
			.on('click', function() { Materialize.toast(getTextFor("federatedNameAlreadyDefined"), 5000, 'red'); });
		}
	  })
	  .fail(function(err) {
	  	$('#federatedName').val(' ');
		$('.editFederatedName')
		.off()
		.on('click', editFederatedName);

	  });

}

function editFederatedName() {
	$('#federatedNameModal').modal({dismissible:false}).modal('open');
	$('#federatedNameModal .set').off()
	.on('click', function() {

		var federatedName = $('#federatedNameNew').val();

		// check that the federated name is valid
		if(!regexFederatedName(federatedName)) {
			Materialize.toast(getTextFor("federatedNameRegexError"), 5000, 'red');
			return false;
		}

		// send a federated name creation request to the federation server
		showLoadingWindow(true);

		$.get( "https://blackwallet.co/api/federation", { q: federatedName+":"+activeWallet.publicKey, 
														type: "link" } )
		.done(function(data) {
			Materialize.toast(data.detail, 5000, 'green');
			loadFederatedName();
			$('#federatedNameModal').modal('close');
			showLoadingWindow(false);
		})
		.fail(function(err) {
			Materialize.toast('Error: ' + err.responseJSON.detail, 5000, 'red');
			showLoadingWindow(false);
		});
	});
}

/* check if the federated name only contains alphanumeric & underscore characters */
function regexFederatedName(name) {
	return (/^[a-z0-9]+$/i).test(name);
}


/* function used by #walletInspect
load the account with address 'address' and
display informations about it */
function inspectAddress(address){
	// check that the slide is opened
	if(current_slide != '#walletInspect') {
		showSlide('#walletInspect');
	}

	$('#walletInspectForm').addClass('hide');
	$('#walletInspectLoading').removeClass('hide');
	$('#walletInspectResultData').html('');

	if(address == undefined)  {
		var address = $('#inspectAddress').val();
	}

	var table = "<p class=\"blue-grey-text text-lighten-3\">Not found: this account doesn't exist!</p>";

	server.loadAccount(address)
		.then(function(data) {

			table = `<p class="grey-text"><b>Address:</b> <span style="word-wrap:break-word;">`+address+`</span></p>
			<table class="soft-bluegrey">
				<thead class="bluegrey">
					<tr>
						<th>Asset</th>
						<th>Amount</th>
					</tr>
				</thead>
			<tbody>`;

			for(var i=0; i<data.balances.length; i++) {
				var asset = data.balances[i].asset_type;

				if(asset == 'native') {
					asset = 'XLM';
				} else {
					asset = data.balances[i].asset_code;
				}
				table += '<tr><td>'+asset+'</td><td>'+data.balances[i].balance+'</td>';

			}

			table += '</tbody></table><p class="grey-text">view more: <a href="http://stellarchain.io/address/'+address+'" target="_blank">stellarchain.io</a> or <a href="http://steexp.com/account/'+address+'" target="_blank">steexp.com</a></p>';




		})
	    .catch(function(err) {
		  	Materialize.toast(err.detail, 5000, 'red');
  		})
  		.finally(function() {
			$('#walletInspectResult').removeClass('hide');
			$('#walletInspectResultData').html(table);
			$('#walletInspectForm').removeClass('hide');
			$('#walletInspectLoading').addClass('hide');
  		});

}

/* ------- settings ------- */

/* Load the settings from the localstorage if they are stored,
use the default settings otherwise */
function loadSettings() {

	_settings = {};

	/*var _settings = localStorage.getItem('settings');

	if(_settings) {
		settings =	JSON.parse(_settings);
	}*/

	for (var i = 0; i < localStorage.length; i++){
	    try {
	    	if(localStorage.key(i).startsWith('setting_')) {
	    		var val = localStorage.getItem(localStorage.key(i));;
	    		if(val == "false")
	    			val = false;
	    		if(val == "true")
	    			val = true;


	    		_settings[localStorage.key(i).replace('setting_', '')] = val;
	    	}
	    } catch(e) {
	    	continue;
	    }
	}

	if(! jQuery.isEmptyObject(_settings)) {
		settings = _settings;
	}

	setTooltipsVisible(settings.showTooltips);
	setAutoRefresh(settings.autoRefresh);
	setMobileMode(settings.mobileMode);
	setMarket(settings.market);

}

/* Save the current settings to localstorage */
function saveSettingsToStorage() {

	// using a try catch to prevent ios error with private browsing
	try {
		for (var i in settings){
	    	localStorage.setItem('setting_'+i, settings[i]);
		}
		return true;
	} catch(e) {
		return false;
	}

/*
	if(_settings.length > 0)
		settings = _settings;


	localStorage.setItem( 'settings', JSON.stringify(settings) );*/
}

/* change the tooltip visibility,
save the settings to the localstorage then
*/
function setTooltipsVisible(status) {
	if(status) {
	  $('.tooltipped').tooltip({delay: 10});
	  $('#settingsShowTooltips').attr('checked','');
	} else {
	  $('.tooltipped').tooltip('remove');
	  $('#settingsShowTooltips').removeAttr('checked');
	}

	settings.showTooltips = status;

	saveSettingsToStorage();
}

/* change the auto refresh status,
auto refresh: refresh the balance and transaction
when a payment is sent/received. 
save the settings to the localstorage then
*/
function setAutoRefresh(status) {
	if(status) {
	  $('#settingsAutoRefresh').attr('checked','');
	} else {
	  $('#settingsAutoRefresh').removeAttr('checked');
	}

	settings.autoRefresh = status;

	saveSettingsToStorage();
}

/* change the settings' market,
save the settings to the localstorage then
*/
function setMarket(market) {

	settings.market = market;
	$('#settingsMarket').val(market);
	$('select').material_select();
	saveSettingsToStorage();
	updateUsdBalance();

}

/* change the mobile mode status,
mobile mode: if enabled, will automatically unlock the
wallet with the secret key(s) stored in the localstorage.
save the settings to the localstorage then
*/
function setMobileMode(status) {
	settings.mobileMode = status;

	if(status) {
	  $('#settingsMobileMode').attr('checked','').attr('disabled', '');
	  $('label[for=settingsMobileMode]').append('<br/><small class="blue-grey-text text-lighten-2">Enabled, logout to disable the mobile mode.</small>');
		
	  //save the wallet to the wallets array & storage
	  addWallet({'secretKey': activeWallet.secretKey, 'name': activeWallet.name})


	} else {
	  $('#settingsMobileMode').removeAttr('checked');
	}


	saveSettingsToStorage();
}


function showAccountsWindow() {
	if(!settings.mobileMode) {
		Materialize.toast(getTextFor('requiresMobileMode'), 5000, 'red');
		return false;
	}

	$('#accountsModal').modal('open');
}

/* ------- giveaway ------- */
function generateBlackWalletCode() {
	var pkey = getWalletPublicKey().split('');

	var sum = 0;
	for(var i=0; i<pkey.length; i++) {
		sum += pkey[i].charCodeAt()*251
	}

	return 'BW-' + sum + 863;
}

function showBlackWalletCode() {
	$('<h5 class="flow-text">Your BlackWallet\'s code is:</h5><h3 class="blue-text flow-text">'+generateBlackWalletCode()+'</h3>').insertAfter('#getBwCode');
	$('#getBwCode').remove();
}


/* ------- utils ------- */

function generateKeypair() {
	var keypair = StellarSdk.Keypair.random(); 
	$('#generate .container').html('<div class="row"> \
	        <div class="col l3 grey-text text-darken-4">.</div> \
	        <div class="input-field col s12 l6"> \
	          <i class="fa fa-rocket blue-text prefix"></i> \
	          <input class="white-text" id="gen-publickey" type="text" readonly="true"  value="'+keypair.publicKey()+'"> \
	          <label for="gen-publickey">'+getTextFor('publicKey')+'</label> \
	        </div> \
	        <div class="col l3 grey-text text-darken-4">.</div> \
	      </div> \
		  <div class="row"> \
	        <div class="col l3 grey-text text-darken-4">.</div> \
	        <div class="input-field col s12 l6"> \
	          <i class="material-icons blue-text prefix">lock</i> \
	          <input class="white-text" id="gen-secretkey" type="text" readonly="true" value="'+keypair.secret()+'"> \
	          <label for="gen-secretkey">'+getTextFor('secretKey')+'</label> \
	        </div> \
	        <div class="col l3 grey-text text-darken-4">.</div> \
	      </div>');

	Materialize.updateTextFields();
}

/* format lumens string */
function formatLumens(lumens) {
	try {
		l = lumens.split('.');
		if ( !l[0] ) l[0] = "0";
		if ( !l[1] ) l[1] = "0000000";
		return parseInt(l[0]).toLocaleString() + '.<small>' + l[1] + '</small>';
	} catch(e) {
		return 0;
	}
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }


/* display the slide passed in parameter */
function showSlide(slide) {
	if(!current_slide) {
		$(slide).slideDown(450, "swing");
	} else {
		$(current_slide).slideUp(300, "linear", function() {
			$(slide).slideDown(450, "swing");
		});

	}

	current_slide = slide;
	// update tabs
	$('ul.tabs').tabs();
}

function showLoadingWindow(show){
	if(show) {
		$('#loadingModal').modal({
			dismissible:false
		});
		$('#loadingModal').modal('open');

	} else {
		$('#loadingModal').modal('close');
	}

}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



/* REFACTORING: BEGINNING */
/* operations */

/*change a trustline for the asset*/
function changeTrustAsset() {
	$('#hUpdateTrust').attr('disabled', '');

	try {
		var assetCode = $('#hAssetCode').val();
		var assetIssuer = $('#hAssetIssuer').val();
		var assetLimit = $('#hAssetLimit').val();

		var asset = new StellarSdk.Asset(assetCode, assetIssuer);
		var changeTrust = (assetLimit ? {'asset': asset, 'limit': assetLimit} : {'asset': asset});

		var trust = new StellarSdk.TransactionBuilder(activeWallet.data)
			      .addOperation(StellarSdk.Operation.changeTrust(changeTrust))
			      .build();
	} catch(e) {
		console.log(e);
		Materialize.toast(getTextFor('error')+"<br/>"+e.detail, 5000, "red");
		$('#hUpdateTrust').removeAttr('disabled');
		return false;
	}

	trust.sign(StellarSdk.Keypair.fromSecret(activeWallet.secretKey));

	showLoadingWindow(true);

    server.submitTransaction(trust)
      .then(function(transactionResult) {


		Materialize.toast(getTextFor('updatedTrustline')+" "+asset.getCode()+"!", 5000, "green");
		updateActiveWallet(true);

      })
      .catch(function(err) {

		Materialize.toast(getTextFor('error')+"<br/>"+err.detail, 5000, "red");
		console.log(err);


      })
      .finally(function() {
      	showLoadingWindow(false);
		$('#hUpdateTrust').removeAttr('disabled');

      });
}

/* search for anchor's assets using the domain name provided by the user.
then display the assets and a button to let the users add the assets */
function searchAnchor() {
	showLoadingWindow(true);

				
	StellarSdk.StellarTomlResolver.resolve($('#hAnchorDomain').val())
	  .then(toml => {

		var table = `<table> 
						<thead class="bluegrey"> 
							<tr> 
								<th>`+getTextFor('name')+`</th> 
								<th>`+getTextFor('assetCode')+`</th> 
								<th>`+getTextFor('info')+`</th> 
								<th> </th> 
							</tr> 
						</thead> 
						<tbody>`;


	    //loop through anchor currencies and display them in a table
	    for(var i=0; i<toml.CURRENCIES.length;i++) {
	    	table += '<tr>';
	    	table += '<td>'+toml.CURRENCIES[i].name+'</td>';
	    	table += '<td><img style="width:32px; height:32px;" src="'+toml.CURRENCIES[i].image+'"/> '+toml.CURRENCIES[i].code+'</td>';
	    	table += '<td><a class="btn blue waves-effect" onclick=\'showAssetInfo('+JSON.stringify(toml.CURRENCIES[i])+')\'><i class="fa fa-search"></i></a></td>';
	    	table += '<td><a class="btn blue waves-effect" onclick=\'addAnchorAsset('+JSON.stringify(toml.CURRENCIES[i])+')\'><i class="fa fa-plus"></i></a></td>';
	    	table += '</tr>';
	    }

	    table += '</tbody></table>';
    	$('#hanchor div.results').html(table);

	  	showLoadingWindow(false);
	  })
	  .catch(error => {
	    Materialize.toast(getTextFor('anchorNotFound'),5000,'red');
	  	showLoadingWindow(false);
	  });
}
/* update the trust line for the asset, asset is an extracted currency from a toml file (toml.CURRENCIES[i]) */
function addAnchorAsset(asset) {
	// little trick to add the anchor, we use the "trust page"
	$('#hAssetCode').val(asset.code);
	$('#hAssetIssuer').val(asset.issuer);
	$('#hAssetLimit').val('');
	changeTrustAsset();
}

/* retrieve and display the asset's info, asset is an extracted currency from a toml file (toml.CURRENCIES[i]) */
function showAssetInfo(asset) {
	$('#assetInfoModal .assetName').html(asset.name ? asset.name : '-');
	$('#assetInfoModal .assetCode').html('<img style="width:32px; height:32px;" src="'+asset.image+'"/> ' + asset.code);
	$('#assetInfoModal .assetIssuer').html(asset.issuer);
	$('#assetInfoModal .assetDesc').html(asset.desc ? asset.desc : '-');
	$('#assetInfoModal .assetConditions').html(asset.conditions ? asset.conditions : '-');

	$('#assetInfoModal').modal('open');

}

/*set inflation destination address address*/
function setInflationDestination() {

	$('#settingsSetInflationDestination').attr('disabled','');
	var address = $('#inflationAddress').val();

	try {
		var inflation = new StellarSdk.TransactionBuilder(activeWallet.data)
			      .addOperation(StellarSdk.Operation.setOptions({'inflationDest':address}))
			      .build();

		inflation.sign(StellarSdk.Keypair.fromSecret(activeWallet.secretKey));

	} catch(e) {
		Materialize.toast(e, 5000, "red");
		$('#settingsSetInflationDestination').removeAttr('disabled');
		return false;
	}

	showLoadingWindow(true);

    server.submitTransaction(inflation)
      .then(function(transactionResult) {


		Materialize.toast(getTextFor('updatedInflationDestination')+" "+address+"", 5000, "green");


      })
      .catch(function(err) {

		Materialize.toast(getTextFor('error')+"<br/>"+err.detail, 5000, "red");
		console.log(err);

      })
      .finally(function() {
		showLoadingWindow(false);
      	$('#inflationAddress').val('');
		$('#settingsSetInflationDestination').removeAttr('disabled');
      });


}


/* events */
function onBalanceUpdate() {
	if(getWalletLumensCount() < 20) {
		$('#minimumBalance').removeClass('hide');		
	} else {
		$('#minimumBalance').addClass('hide');		
	}
}
