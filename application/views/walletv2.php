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

		<h4 class="blue-text darken-1 margin-U">{{text.loading}}</h4>
		<h5 class="grey-text darken-1 light margin-UB">{{text.wait}}</h5>
  	</div>
</section>

<!--					  LOCKED WALLET PART					 -->


<!-- WALLET UNLOCK -->
<section class="padding-UB-large grey lighten-3" id="unlock">
	<div class="row center-align margin-UB padding-UB-large">
		<h4 class="blue-text darken-1">{{text.alreadyHaveWallet}}</h4>
		<h5 class="grey-text darken-1 light margin-UB">{{text.enterSecretToUnlock}}</h5>
  	</div>

  	<div class="container center-align">
	  <div class="row" id="unlockForm">
	    <form class="col s12">
	      <div class="row">
	        <div class="col l3 white-text">.</div>
	        <div class="input-field col s12 l6">
	          <i class="material-icons prefix grey-text">lock</i>
	          <input id="secretkey" type="text" autocomplete="off" spellcheck="false">
	          <label for="secretkey">{{text.secretKey}}</label>
	        </div>
	        <div class="col l3 white-text">.</div>
	      </div>

	      <div class="row center-align">
			<a id="unlockBtn" href="#" class="btn waves-effect btn-large waves-light blue white-text z-depth-2">{{text.unlock}}</a>
	      </div>
	    </form>
	  </div>

	  <div class="row hide" id="unlockLoading">
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
	  </div>

	</div>
</section>

<!-- WALLET GENERATE -->
<section class="padding-UB-large soft-bluegrey darken-4" id="generate">
	<div class="row center-align margin-UB padding-UB-large">
		<h4 class="blue-text darken-1">{{text.noWalletYet}}</h4>
		<h5 class="grey-text darken-1 light margin-UB">{{text.getWalletNow}}</h5>
  	</div>

  	<div class="container">
		<div class="row center-align padding-UB-large">
			<a href="getstarted" class="btn waves-effect btn-large white grey-text z-depth-3 margin-UBLR">{{text.getStarted}}</a>
			<a id="generateKeypair" class="btn waves-effect btn-large waves-light blue white-text  z-depth-3 margin-UBLR">{{text.generateKeypair}}</a>
		</div>
	</div>
</section>



<!--					  UNLOCKED WALLET PART					 -->


<!-- WALLET SLIDE SEND -->
<section class="black white-text padding-UB-large valign-wrapper top-border" id="walletSend">
  	<div class="container">
  		<div class="row">
  			<div class="close right">
				<a href="#" class="fa-stack fa-lg">
				  <i class="fa fa-circle blue-grey-text text-darken-4 fa-stack-2x"></i>
				  <i class="fa fa-times fa-stack-1x black-text"></i>
				</a>
  			</div>
		    <form class="col l5 m8 s12  soft-bluegrey padding-UBLR-large border-radius" id="walletSendForm">
  			<h5 class="blue-text">{{text.sendMoney}}</h5>
		      	<p class="grey-text">{{text.sendMoneyInfo}}</p>

		      <div class="row margin-U">

		        <div class="input-field col s12">
		          <i class="fa fa-rocket prefix"></i>
		          <input id="saddress" autocomplete="off" spellcheck="false" type="text">
		          <label for="saddress">{{text.sendMoneyRecipient}}</label>
		        </div>

		      </div>

		      <div class="row">

		        <div class="input-field col s9">
		          <i class="fa fa-money prefix"></i>
		          <input id="samount" autocomplete="off" spellcheck="false" type="text">
		          <label for="samount">{{text.sendMoneyAmount}}</label>
		        </div>
		        <div class="input-field col s3 valign-wrapper">
				    <select id="sasset">
				      <option value="1">XLM</option>
				    </select>
				    <label>{{text.sendMoneyAsset}}</label>
		        </div>

		      </div>

		      <div class="row">
		      
		        <div class="input-field col s4 valign-wrapper">
				    <select id="smemo">
				      <option value="MEMO_TEXT">MEMO_TEXT</option>
				      <option value="MEMO_ID">MEMO_ID</option>
				      <option value="MEMO_HASH">MEMO_HASH</option>
				      <option value="MEMO_RETURN">MEMO_RETURN</option>

				    </select>
				    <label>{{text.sendMoneyMemoType}}</label>
		        </div>
		        <div class="input-field col s8">
		          <input id="smemoinput" autocomplete="off" spellcheck="false" type="text">
		          <label for="smemoinput">{{text.sendMoneyMemoValue}}</label>
		        </div>

		      </div>

		      <div class="row center-align">
		      	<a id="sendLumens" class="btn btn-large blue white-text waves-effect waves-green z-depth-2"><i class="fa fa-send"></i> <b>{{text.send}}</b></a>
		      </div>
		     </form>

			<div class="preloader-wrapper big active hide margin-UB-large" id="walletSendLoading">
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
</section>

<!-- WALLET SLIDE RECEIVE -->
<section class="black white-text padding-UB-large valign-wrapper top-border" id="walletReceive">
  	<div class="container">
  		<div class="row">
  			<div class="close right">
				<a href="#" class="fa-stack fa-lg">
				  <i class="fa fa-circle blue-grey-text text-darken-4 fa-stack-2x"></i>
				  <i class="fa fa-times fa-stack-1x black-text"></i>
				</a>
  			</div>

		    <form class="col l6 m8 s12 soft-bluegrey padding-UBLR-large border-radius">
	  		  <h5 class="blue-text">{{text.receiveLumens}}</h5>
			  <div class="row margin-U">

			        <div class="input-field col s12">
			          <i class="fa fa-rocket prefix blue-text"></i>
			          <input id="publicAddress" readonly value="loading..." type="text">
			          <label for="publicAddress">{{text.receivePublicAddress}}</label>
			        </div>
		    
		        	<p class="center-align blue-grey-text text-darken-2">{{text.or}}</p>

			        <div class="input-field col s12 margin-U-large">
			          <i class="fa fa-user prefix blue-text"></i>
			          <input id="federatedName" readonly placeholder=" " type="text">
			          <label for="federatedName">{{text.federatedName}}</label>
			        </div>
			  </div>
		    </form>
		 </div>
  		<div class="row">

		    <form class="col l6 m8 s12 soft-bluegrey padding-UBLR-large border-radius">
	  		  <h5 class="blue-text">{{text.explanations}}</h5>
		      <div class="row margin-U">
		        	<p class="grey-text text-lighten-1 small"><b class="blue-text text-lighten-3">{{text.publicAddressTitle}}:</b> {{text.publicAddressDesc}}</p>
		        	<p class="grey-text text-lighten-1 small"><b  class="blue-text text-lighten-3">{{text.federatedNameTitle}}:</b> {{text.federatedNameDesc}}</p>
		      </div>

		      <div class="divider bluegrey"></div>

  			<h5 class="blue-text">{{text.tools}}</h5>
		    <div class="row margin-U">

	  			<a class="btn btn-large blue grey darken-4 grey-text text-darken-3 tooltipped" data-position="top" data-delay="100" data-tooltip="New payment page (soon)"><i class="fa fa-file"></i></a>
	  			<a class="btn btn-large blue white-text waves-effect waves-light tooltipped editFederatedName" data-position="top" data-delay="100" data-tooltip="Federated name">
					<div class="fa-stack">
						  <i class="fa fa-user fa-stack-2x white-text"></i>
						  <i style="top:-10px; left:5px; font-size:12px;" class="fa fa-tag grey-text text-darken-3 fa-stack-1x"></i>
					</div>
				</a>

			</div>

		   </form>

		</div>


	</div>
</section>


<!-- WALLET SLIDE INSPECT -->
<section class="black white-text padding-UB-large valign-wrapper top-border" id="walletInspect">
<div class="container">


      <div class="row">
		<div class="close right">
			<a href="#" class="fa-stack fa-lg">
			  <i class="fa fa-circle blue-grey-text text-darken-4 fa-stack-2x"></i>
			  <i class="fa fa-times fa-stack-1x black-text"></i>
			</a>
		</div>

	    <form class="col l6 m8 s12  soft-bluegrey padding-UBLR-large border-radius" id="walletInspectForm">
  			<h5 class="blue-text">{{text.inspect}}</h5>

	        <div class="input-field col s12 margin-U">
	          <i class="fa fa-search prefix"></i>
	          <input id="inspectAddress" spellcheck="false" autocomplete="off" type="text">
	          <label for="inspectAddress">{{text.publicAddressTitle}}</label>
	        </div>

	        <div class="col s12 center-align">
	        	<a class="btn btn-large blue waves-effect waves-light z-depth-2 margin-U" id="walletInspectBtn">{{text.inspect}}</a>
	        </div>
        </form>

      </div>
      <div class="row">
			<div class="preloader-wrapper big active hide margin-UB-large" id="walletInspectLoading">
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

      <div class="row hide"  id="walletInspectResult">
		  <div class="section" id="walletInspectResultData">
		  </div>
      </div>
</div>
</section>


<!-- WALLET SLIDE CHARTS -->
<section class="black white-text padding-UB-large valign-wrapper top-border" id="walletCharts">
  	<div class="container soft-bluegrey padding-UBLR-large border-radius">
  		<div class="row">
  			<div class="close right">
				<a href="#" class="fa-stack fa-lg">
				  <i class="fa fa-circle blue-grey-text text-darken-4 fa-stack-2x"></i>
				  <i class="fa fa-times fa-stack-1x black-text"></i>
				</a>
  			</div>

  			<h5>{{text.charts}}</h5>
		      <div class="row">
		      	<div class="col l6 m12 s12">
				  <table class="white-text responsive-table">
				    <thead>
				      <tr>
				          <th>{{text.currency}}</th>
				          <th>{{text.chart}}</th>
				      </tr>
				    </thead>

				    <tbody>
				      <tr>
				        <td>
							<div class="coinmarketcap-currency-widget" style="border-color:transparent !important;" data-currency="stellar" data-base="USD" data-secondary="BTC" data-ticker="true" data-rank="true" data-marketcap="true" data-volume="true" data-stats="USD" data-statsticker="false"></div>

				        </td>
				        <td class="center-align"><img src="https://files.coinmarketcap.com/generated/sparklines/512.png" alt="XLM price chart"/></td>
				      </tr>
				      <tr>
				        <td>
							<div class="coinmarketcap-currency-widget" data-currency="bitcoin" data-base="USD" data-secondary="BTC" data-ticker="true" data-rank="true" data-marketcap="true" data-volume="true" data-stats="USD" data-statsticker="false"></div>

				        </td>
				        <td class="center-align"><img src="https://files.coinmarketcap.com/generated/sparklines/1.png" alt="BTC price chart"/></td>
				      </tr>
				      <tr>
				        <td>
							<div class="coinmarketcap-currency-widget" data-currency="ripple" data-base="USD" data-secondary="BTC" data-ticker="true" data-rank="true" data-marketcap="true" data-volume="true" data-stats="USD" data-statsticker="false"></div>

				        </td>
				        <td class="center-align"><img src="https://files.coinmarketcap.com/generated/sparklines/52.png" alt="XRP price chart"/></td>
				      </tr>				      
				    </tbody>
				  </table>
		      </div>
		     </div>
  		</div>


	</div>
</section>

<!-- WALLET SLIDE HOLDINGS -->
<section class="black white-text padding-UB-large valign-wrapper top-border" id="walletHoldings">
<div class="container">


      <div class="row ">
		<div class="close right">
			<a href="#" class="fa-stack fa-lg">
			  <i class="fa fa-circle blue-grey-text text-darken-4 fa-stack-2x"></i>
			  <i class="fa fa-times fa-stack-1x black-text"></i>
			</a>
		</div>

		<div class="col s12 l7 soft-bluegrey padding-UBLR-large border-radius">
  			<h5 class="blue-text margin-B">{{text.holdings}}</h5>
			 <nav class="nav-extended bluegrey margin-U">
			    <div class="nav-content">
			      <ul class="tabs tabs-transparent">
			        <li class="tab"><a class="active" href="#hassets">{{text.assets}}</a></li>
			        <li class="tab"><a href="#hanchor"><i class="fa fa-plus blue-text"></i> {{text.anchor}}</a></li>
			        <li class="tab"><a href="#htrust">{{text.trust}}</a></li>
			      </ul>
			    </div>
			  </nav>


			<div id="hassets">
				<p><i class="fa fa-spinner fa-spin"></i></p>
				<table id="holdings">
					<thead class="bluegrey">
						<tr>
							<th>{{text.sendMoneyAsset}}</th>
							<th>{{text.sendMoneyAmount}}</th>
						</tr>
					</thead>
					<tbody>
		
					</tbody>
				</table>
			</div>

			<div id="htrust">
				<p class="blue-grey-text text-lighten-3">{{text.updateTrustlineDesc}}</p>

		        <div class="input-field col s12">
		          <i class="fa fa-tag prefix"></i>
		          <input id="hAssetCode" autocomplete="off" spellcheck="false" type="text">
		          <label for="hAssetCode">{{text.assetCode}}</label>
		        </div>
		        <div class="input-field col s12">
		          <i class="fa fa-rocket prefix"></i>
		          <input id="hAssetIssuer" autocomplete="off" spellcheck="false" type="text">
		          <label for="hAssetIssuer">{{text.assetIssuer}}</label>
		        </div>
		        <div class="input-field col s12">
		          <i class="fa fa-calculator prefix"></i>
		          <input id="hAssetLimit" autocomplete="off" spellcheck="false" type="text">
		          <label for="hAssetLimit">{{text.limit}} <i>({{text.optionnal}})</i></label>
		          <p class="blue-grey-text text-lighten-3"><small>{{text.trustlineLimitInfo}}</small></p>
		        </div>

		        <div class="col s12 center-align">
		        	<a id="hUpdateTrust" class="btn btn-large blue waves-effect waves-light white-text">{{text.update}}</a>
		        </div>


			</div>

			<div id="hanchor">
		        <div class="input-field col s12 margin-U-large">
		          <i class="fa fa-globe prefix"></i>
		          <input id="hAnchorDomain" autocomplete="off" spellcheck="false" type="text">
		          <label for="hAnchorDomain">{{text.anchorDomain}}</label>
		        </div>
		        <div class="col s12 center-align">
		        	<a id="hSearchAnchor" class="btn blue waves-effect waves-light white-text">{{text.search}}</a>
		        </div>

		        <div class="col s12 results margin-U-large">
		        </div>

			</div>

  		</div>
      </div>


</div>
</section>



<!-- WALLET SLIDE COMMUNITY -->
<section class="black white-text padding-UB-large valign-wrapper top-border" id="walletCommunity">
  	<div class="container ">
  		<div class="row">
  			<div class="close right">
				<a href="#" class="fa-stack fa-lg">
				  <i class="fa fa-circle blue-grey-text text-darken-4 fa-stack-2x"></i>
				  <i class="fa fa-times fa-stack-1x black-text"></i>
				</a>
  			</div>
  			<div class="col s12 m8 l6 soft-bluegrey padding-UBLR-large border-radius">
	  			<h5 class="blue-text">{{text.community}}</h5>
				  <div class="col s12">
				    <h5><i class="fa fa-comments"></i> {{text.boards}}</h5>
				    <ol>
				    	<li><a href="http://GalacticTalk.org" target="_blank">GalacticTalk</a></li>
				    	<li><a href="http://StellarCommunity.org" target="_blank">StellarCommunity</a></li>
				    	<li><a href="http://Stellar.chat" target="_blank">StellarChat</a></li>
				    	<li><a href="http://MyStellar.org" target="_blank">MyStellar</a></li>
				    </ol>
				  </div>
				  <div class="col s12">
				    <h5><i class="fa fa-certificate"></i> {{text.official}}</h5>
				    <ol>
				    	<li><a href="https://twitter.com/stellarorg" target="_blank">Twitter</a></li>
				    	<li><a href="http://slack.stellar.org/" target="_blank">Slack</a></li>
				    	<li><a href="https://www.reddit.com/r/stellar" target="_blank">Reddit</a></li>
				    	<li><a href="https://www.facebook.com/groups/stellarorg/" target="_blank">Facebook</a></li>
				    	<li><a href="http://stellar.org/" target="_blank">Stellar Foundation</a></li>
				    </ol>			  
				   </div>
				  <div class="col s12">
				    <h5><i class="fa fa-credit-card-alt"></i> {{text.buy_sell_exchanges}}</h5>
				    <ol>
				    	<li><a href="http://lupoex.com" target="_blank">LupoEx: Lumen Powered Exchange</a></li>
				    	<li><a href="http://bittrex.com/" target="_blank">Bittrex</a></li>
				    	<li><a href="http://poloniex.com/" target="_blank">Poloniex</a></li>
				    </ol>
				  </div>
				 <p class="grey-text">{{text.communityGetListed}}</p>
  			</div>
  		</div>


	</div>
</section>

<!-- WALLET SLIDE DONATE -->
<!--<section class="black white-text padding-UB-large valign-wrapper top-border" id="walletDonate">
  	<div class="container">
  		<div class="row">
  			<div class="close right">
				<a href="#" class="fa-stack fa-lg">
				  <i class="fa fa-circle blue-grey-text text-darken-4 fa-stack-2x"></i>
				  <i class="fa fa-times fa-stack-1x black-text"></i>
				</a>
  			</div>

		    <form class="col l6 m8 s12 soft-bluegrey padding-UBLR-large border-radius">
	  			<h5>Donate</h5>
		      <div class="row">

		        <div class="input-field col s12">
		          <i class="fa fa-heart prefix red-text"></i>
		          <input id="publicAddress" readonly value="GCOQAWJHY3ROVKLU7TAE75LC524SCARFA4EOBRSTVGY4G2TRNYJZ4GJ2" type="text">
		          <label for="address">Donation address</label>
		        </div>

		        <div class="col s12">
		        	<p class="grey-text">You can support BlackWallet by donating some Lumens to this address, thank you :)</p>
		        </div>

		      </div>
		     </form>
		
		
  		</div>
	</div>
</section>-->

<!-- WALLET SLIDE GIVEAWAY -->
<section class="black white-text padding-UB-large valign-wrapper top-border" id="walletGiveaway">
  	<div class="container">

	      <div class="row center-align soft-bluegrey padding-UBLR-large border-radius" id="giveaway-join">
	  			<div class="close right">
					<a href="#" class="fa-stack fa-lg">
					  <i class="fa fa-circle blue-grey-text text-darken-4 fa-stack-2x"></i>
					  <i class="fa fa-times fa-stack-1x black-text"></i>
					</a>
	  			</div>

		      	<h2><i class="fa fa-gift blue-text"></i></h2>
		      	<h5>{{text.giveaway}}</h5>
		      	<p class="grey-text flow-text">
		      		{{text.giveawayDesc}}
		      	</p>
		      	<a class="btn btn-large pulse blue waves-effect margin-UB-large" id="getBwCode">{{text.getGiveawayCode}}</a><br/>

		  </div>

	      <div class="row hide center-align" id="giveaway-error">
		      	<h2><i class="fa fa-frown-o red-text"></i></h2>
		      	<h5>Sorry</h5>
		      	<p class="grey-text flow-text">
		      		The giveaway is full.
		      	</p>
		  </div>


	</div>
</section>


<!-- WALLET SLIDE SETTINGS -->
<section class="black white-text padding-UB-large valign-wrapper top-border" id="walletSettings">
  	<div class="container soft-bluegrey padding-UBLR-large border-radius">

  		<div class="row">
  			<div class="close right">
				<a href="#" class="fa-stack fa-lg">
				  <i class="fa fa-circle blue-grey-text text-darken-4 fa-stack-2x"></i>
				  <i class="fa fa-times fa-stack-1x black-text"></i>
				</a>
  			</div>
	      	<h5 class="blue-text">{{text.settings}}</h5>
  		</div>

		 <nav class="nav-extended bluegrey">
		    <div class="nav-content">
		      <ul class="tabs tabs-transparent">
		        <li class="tab"><a class="active" href="#sgeneral">{{text.settingsGeneral}}</a></li>
		        <li class="tab"><a href="#smoney">{{text.settingsMoney}}</a></li>
		      </ul>
		    </div>
		  </nav>


		  <div id="sgeneral">
		  	<div class="row padding-LR margin-UB-large">
			    <h5>{{text.settingsGlobal}}</h5>
			    <div class="padding-LR">
				    <div class="col s12 margin-U">
				      <input type="checkbox" checked id="settingsShowTooltips" />
				      <label for="settingsShowTooltips">{{text.settingsShowTooltips}}</label>
				    </div>

				    <div class="col s12 margin-U">
				      <input type="checkbox" checked id="settingsAutoRefresh" />
				      <label for="settingsAutoRefresh">{{text.settingsAutoRefresh}}</label>
				    </div>


				    <div class="col s12 margin-U">
				      <input type="checkbox" id="settingsMobileMode" />
				      <label for="settingsMobileMode">
				      	{{text.settingsMobileMode}}

				      	</label>
				    </div>
				</div>
			</div>
			<div class="divider margin-UB-large bluegrey"></div>
		  	<div class="row padding-LR">
			    <h5>{{text.accounts}}</h5>
			    <div class="padding-LR">
				  <form class="margin-U" id="walletsList" action="#">

				  </form>
				 
				  <p><a id="settingsAccountsConfig" class="btn blue-grey darken-3 waves-effect waves-light"><i class="fa fa-cog"></i></a></p>
				</div>
			</div>

			<div class="divider margin-UB-large bluegrey"></div>

			<p id="bwVersion" class="blue-grey-text text-darken-3">{{text.version}} -</p>


		  </div>


		  <div id="smoney">
		  	<div class="row margin-UB-large padding-LR">
			    <h5>{{text.market}}</h5>

			    <div class="col s12 margin-U padding-LR">
			        <div class="input-field">
			        	  <i class="fa fa-usd center-align prefix"></i>
					    <select id="settingsMarket">
					      <option>Coinmarketcap</option>
					      <option>Kraken</option>

					    </select>
					    <label>{{text.settingsMarketLabel}}</label>
			        </div>
		        </div>

			</div>

			<div class="divider margin-UB-large bluegrey"></div>


		  	<div class="row margin-UB-large padding-LR">
			    <h5>{{text.inflation}}</h5>

			    <div class="col s12 margin-U">
			        <div class="input-field col s12">
			        	  <i class="fa fa-rocket prefix"></i>
				          <input id="inflationAddress" placeholder="Address" autocomplete="off" spellcheck="false" type="text">
				          <label for="inflationAddress">{{text.inflationDestination}}</label>
			        </div>
			        <div class="col s12 ">
			        	<a id="settingsSetInflationDestination" class="btn blue white-text waves-effect waves-light">{{text.set}}</a>
			        </div>
		        </div>

			</div>

		  </div>


	</div>
</section>

<!-- WALLET HEADER -->
<section class="white padding-UB-large margin-B" id="walletHeader">
  	<div class="container">
		<div class="row grey-text valign-wrapper">
			<div class="col s12 l8 left">
				<h5 class="blue-text"><b id="activeWalletName"></b>{{text.english_s}} {{text.wallet}} <a href="#" class="toolHoldings grey-text"><small><i class="fa fa-list"></i></small></a> </h5>
				<h4 class="grey-text text-darken-3 light" id="lumensBalance">0<small>.0000000</small> XLM</h4>
				<h5 class="light" id="usdBalance"><small>$0.00</small></h5>
			</div>

			<div class="col s12 l4 right right-align">
				<a href="#" id="toolSendLumens" class="btn btn-large blue white-text waves-effect waves-light tooltipped margin-UB" data-position="top" data-delay="100" data-tooltip="{{text.sendMoney}}">					
					<div class="fa-stack">
					  <i style="top:5px;" class="fa fa-send fa-stack-2x white-text"></i>
					  <i style="top:-10px;" class="fa fa-usd red-text fa-stack-1x"></i>
					</div>
				</a>
				<a href="#" id="toolReceiveLumens" class="btn btn-large blue white-text waves-effect waves-light tooltipped margin-UB" data-position="bottom" data-delay="100" data-tooltip="{{text.receiveMoney}}">	
					<div class="fa-stack">
					  <i  style="top:5px;"  class="fa fa-credit-card fa-stack-2x white-text"></i>
					  <i style="top:-10px;" class="fa fa-arrow-down light-green-text text-darken   fa-stack-1x"></i>
					</div>
				</a>
			</div>

		</div>


		<p id="minimumBalance" class="hide grey lighten-2 grey-text text-darken-2 padding-UB center-align">{{text.nonExistingAccountNotice}}</p>


	</div>
</section>

<!-- WALLET TOOLS -->
<section class="white-text" id="walletTools">
  	<div class="container">
  		<div class="row padding-UB hide-on-med-and-down">
			<h5>{{text.tools}}</h5>
			<a href="#" class="toolInspect btn btn-large blue white-text waves-effect waves-light margin-UB tooltipped" data-position="bottom" data-delay="100" data-tooltip="{{text.inspect}}"><i class="fa fa-search"></i></a>
			<a href="#" class="toolCharts btn btn-large blue white-text waves-effect waves-light margin-UB tooltipped" data-position="bottom" data-delay="100" data-tooltip="{{text.charts}}"><i class="fa fa-line-chart"></i></a>
			<a href="#" class="toolHoldings btn btn-large blue white-text waves-effect waves-light margin-UB tooltipped" data-position="bottom" data-delay="100" data-tooltip="{{text.holdings}}"><i class="fa fa-briefcase"></i></a>
			<a href="#" class="toolCommunity btn btn-large blue white-text waves-effect waves-light margin-UB tooltipped" data-position="bottom" data-delay="100" data-tooltip="{{text.community}}"><i class="fa fa-users"></i></a>
			<a href="#" class="toolGiveaway btn btn-large blue white-text waves-effect waves-light margin-UB tooltipped" data-position="bottom" data-delay="100" data-tooltip="{{text.giveaway}}"><i class="fa fa-gift"></i></a>
			<a href="#" class="toolSettings btn btn-large blue white-text waves-effect waves-light margin-UB tooltipped" data-position="bottom" data-delay="100" data-tooltip="{{text.settings}}"><i class="material-icons">settings</i></a>
			<a href="#" class="toolLogout btn btn-large btn-logout red white-text waves-effect waves-light margin-UB tooltipped hide-on-med-and-up" data-position="bottom" data-delay="100" data-tooltip="{{text.logout}}"><i class="material-icons">power_settings_new</i></a>
		</div>


		<!-- tools for mobile & tablet display -->
		<div class="tools hide-on-large-only">
			<a href="#" class="toolInspect btn btn-large blue white-text waves-effect waves-light margin-UB tooltipped" data-position="top" data-delay="100" data-tooltip="{{text.inspect}}"><i class="fa fa-search"></i></a>
			<a href="#" class="toolCharts btn btn-large blue white-text waves-effect waves-light margin-UB tooltipped" data-position="top" data-delay="100" data-tooltip="{{text.charts}}"><i class="fa fa-line-chart"></i></a>
			<a href="#" class="toolHoldings btn btn-large blue white-text waves-effect waves-light margin-UB tooltipped" data-position="top" data-delay="100" data-tooltip="{{text.holdings}}"><i class="fa fa-briefcase"></i></a>
			<a href="#" class="toolCommunity btn btn-large blue white-text waves-effect waves-light margin-UB tooltipped" data-position="top" data-delay="100" data-tooltip="{{text.community}}"><i class="fa fa-rocket"></i></a>
			<a href="#" class="toolGiveaway btn btn-large blue white-text waves-effect waves-light margin-UB tooltipped" data-position="top" data-delay="100" data-tooltip="{{text.giveaway}}"><i class="fa fa-gift"></i></a>
			<a href="#" class="toolSettings btn btn-large blue white-text waves-effect waves-light margin-UB tooltipped" data-position="top" data-delay="100" data-tooltip="{{text.settings}}"><i class="material-icons">settings</i></a>
			<a href="#" class="toolLogout btn btn-large btn-logout red white-text waves-effect waves-light margin-UB tooltipped hide-on-med-and-up" data-position="top" data-delay="100" data-tooltip="{{text.logout}}"><i class="material-icons">power_settings_new</i></a>
		</div>

  		<div class="row padding-B-large" >
			<h5>{{text.recentTransactions}}</h5>
			  <table id="transactions" class="striped ">
			    <thead class="black">
			      <tr>
			          <th>{{text.accountId}}</th>
			          <th class="center-align">{{text.sendMoneyAmount}}</th>
			          <th class="center-align">Memo</th>
			          <th class="center-align">{{text.operationId}}</th>
			      </tr>
			    </thead>

			    <tbody>
			      
			    </tbody>
			  </table>
	  	</div>
	</div>
</section>


<!-- Logout modal -->
<div id="logoutModal" class="modal bluegrey grey-text">
<div class="modal-content">
  <h4 class="flow-text blue-text">{{text.confirmLogoutTitle}}</h4>
  <p>
  	{{text.confirmLogoutDesc1}}
  </p>
  <p>
    	<b>{{text.confirmLogoutDesc2}}</b>
  </p>
</div>
<div class="modal-footer soft-bluegrey white-text">
  <a id="hardLogout" class="modal-action modal-close waves-effect waves-red btn-flat red-text">{{text.logout}}</a>
  <a href="#!" class="modal-action modal-close waves-effect waves-default btn-flat grey-text text-lighten-1">{{text.cancel}}</a>
</div>
</div>

<!-- Accounts modal -->
<div id="accountsModal" class="modal bluegrey grey-text">
<div class="modal-content">
  <h4 class="flow-text blue-text">{{text.accounts}}</h4>
</div>
<div class="modal-footer soft-bluegrey white-text">
  <a id="saveAccounts" class="modal-action modal-close waves-effect waves-green btn-flat green-text">{{text.save}}</a>
</div>
</div>



<!-- Loading modal -->
<div id="loadingModal" class="modal bluegrey grey-text">
<div class="modal-content">
  <h4 class="flow-text blue-text">{{text.waitAlt}}</h4>
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
<!--<div class="modal-footer grey darken-4 white-text">
  <a id="hardLogout" class="modal-action modal-close waves-effect waves-red btn-flat red-text">Logout</a>
  <a href="#!" class="modal-action modal-close waves-effect waves-default btn-flat grey-text text-lighten-1">Cancel</a>
</div>-->
</div>


<!-- Federated name modal -->
<div id="federatedNameModal" class="modal bluegrey grey-text">
	<div class="modal-content">
	  <h4 class="flow-text blue-text">{{text.federatedNameTitle}}</h4>
	  <div class="row">
	  	<div class="input-field col s12 m8 l8">
	  		<input type="text" placeholder="Your name or username..." id="federatedNameNew"/>
	  		<label for="federatedNameNew">{{text.federatedName}}</label>
	  	</div>
	  	<div class="input-field col s12 m4 l4">
	  		<input type="text" value="*blackwallet.co" readonly/>
	  	</div>
	  </div>
	  <p class="red-text text-lighten-1">{{text.federatedNameWarning}}</p>
	</div>
	<div class="modal-footer soft-bluegrey white-text">
	  <a class="modal-action modal-close waves-effect waves-green btn-flat green-text set">{{text.set}}</a>
	  <a class="modal-action modal-close waves-effect waves-light btn-flat grey-text">{{text.cancel}}</a>
	</div>
</div>


<!-- Merge accounts modal -->
<div id="mergeAccountModal" class="modal bluegrey grey-text">
	<div class="modal-content">
	  <h4 class="flow-text blue-text">{{text.sendEverything}}</h4>
	  <p>{{text.sendEverythingDesc}} (<span id="mergeAccountLumens" class="blue-text">0</span>) {{text.to}} <span id="mergeAccountDestination" style="word-wrap:break-word;" class="blue-text"></span>?</p>
	  <p>{{text.sendEverythingWarning}}</p>
	</div>
	<div class="modal-footer soft-bluegrey white-text">
	  <a id="mergeAccountConfirm" class="modal-action modal-close waves-effect waves-green btn-flat green-text">{{text.yes}}</a>
	  <a class="modal-action modal-close waves-effect waves-red btn-flat red-text">{{text.no}}</a>
	</div>
</div>



<!-- Confirm send modal -->
<div id="confirmSendModal" class="modal bluegrey grey-text">
	<div class="modal-content">
	  <h4 class="flow-text blue-text">{{text.payment}}</h4>
	  <p>{{text.confirmPayment}}</p>
	  <div class="row">
	  	<div class="col s12 l4 blue-text">
		  	<b>{{text.destination}}:</b>
	  	</div>
	  	<div class="col s12 l8 destination">
	  		
	  	</div>
	  </div>
	  <div class="row">
	  	<div class="col s12 l4 blue-text">
		  	<b>{{text.asset}}:</b>
	  	</div>
	  	<div class="col s12 l8 asset">
	  		
	  	</div>
	  </div>
	  <div class="row">
	  	<div class="col s12 l4 blue-text">
		  	<b>{{text.sendMoneyAmount}}:</b>
	  	</div>
	  	<div class="col s12 l8 amount">
	  		
	  	</div>
	  </div>
	  <div class="row">
	  	<div class="col s12 l4 blue-text">
		  	<b>Memo:</b>
	  	</div>
	  	<div class="col s12 l8 memo">
	  		
	  	</div>
	  </div>
	  <div class="row message ">
	  	<div class="col s12 l4 blue-text">
		  	<b>{{text.message}}:</b>
	  	</div>
	  	<div class="col s12 l8">
	  		<textarea class="materialize-textarea" spellcheck="false" autocomplete="off" placeholder="Your message..."></textarea>
	  	</div>
	  </div>
	  <div class="row secret hide">
	  	<div class="col s12 l4 blue-text">
		  	<b>{{text.secretKey}}:</b>
	  	</div>
	  	<div class="col s12 l8 key">
	  		
	  	</div>
	  	<div class="col s12 red-text text-lighten-3">
	  		{{text.secretKeyEmail}}.
	  	</div>
	  </div>
	</div>
	<div class="modal-footer soft-bluegrey white-text">
	  <a class="modal-action modal-close waves-effect waves-green btn-flat green-text confirm">{{text.confirm}}</a>
	  <a class="modal-action modal-close waves-effect waves-red btn-flat red-text">{{text.cancel}}</a>
	</div>
</div>


<!-- Asset info modal -->
<div id="assetInfoModal" class="modal bluegrey grey-text">
	<div class="modal-content">
	  <h4 class="flow-text blue-text">{{text.asset}}</h4>

	  <div class="row">
	  	<div class="col s12  blue-text">
		  	<b>{{text.assetName}}:</b>
	  	</div>
	  	<div class="col s12 assetName"></div>
	  		
	  </div>

	  <div class="row">
	  	<div class="col s12 blue-text">
		  	<b>{{text.assetCode}}:</b>
	  	</div>
	  	<div class="col s12 assetCode"></div>
	  		
	  </div>

	  <div class="row">
	  	<div class="col s12 blue-text">
		  	<b>{{text.assetIssuer}}:</b>
	  	</div>
	  	<div class="col s12 l8 assetIssuer">
	  		
	  	</div>
	  </div>

	  <div class="row">
	  	<div class="col s12  blue-text">
		  	<b>{{text.assetDesc}}:</b>
	  	</div>
	  	<div class="col s12  assetDesc">
	  		
	  	</div>
	  </div>

	  <div class="row">
	  	<div class="col s12  blue-text">
		  	<b>{{text.assetConditions}}:</b>
	  	</div>
	  	<div class="col s12  assetConditions">
	  		
	  	</div>
	  </div>

	</div>
	<div class="modal-footer soft-bluegrey white-text">
	  <a class="modal-action modal-close waves-effect btn-flat grey-text text-lighten-1">{{text.cancel}}</a>
	</div>
</div>

<!-- Language modal -->
<div id="languageModal" class="modal bluegrey grey-text">
	<div class="modal-content">
	  <h4 class="flow-text blue-text">{{text.language}}</h4>
	  <div class="row padding-UB-large">
		    <div class="input-field">
		    	  <i class="fa fa-flag center-align prefix"></i>
			    <select id="language">
			      <option value="english">{{text.english}}</option>
			      <option value="french">{{text.french}}</option>
			      <option value="italian">{{text.italian}}</option>

			    </select>
			    <label>{{text.selectLanguage}}</label>
		    </div>
	  </div>
	</div>
	<div class="modal-footer soft-bluegrey white-text">
	  <a class="modal-action modal-close waves-effect waves-green btn-flat green-text setLanguage">{{text.set}}</a>
	  <a class="modal-action modal-close waves-effect waves-light btn-flat grey-text text-lighten-1">{{text.cancel}}</a>
	</div>
</div>

<div id="pinModal" class="modal bluegrey grey-text">
        <div class="modal-content">
                <h4 class="flow-text blue-text">{{text.pin}}</h4>
                <div class="row padding-UB-large">
                        <div class="input-field"> 
                        			<i class="fa fa-lock center-align prefix"></i>
									<input type="text"  pattern="[0-9]"  id="pinCode" autocomplete="off" spellcheck="false" maxlength="6"/>
	                                <label for="pinCode">{{text.enterPin}}</label>
                        </div>
                </div>
        </div>
        <div class="modal-footer soft-bluegrey white-text">
                <a class="modal-action modal-close waves-effect waves-green btn-flat green-text setLanguage">{{text.confirm}}</a>              </div>
</div>

<div id="securityModal" class="modal bluegrey grey-text">
        <div class="modal-content">
                <h4 class="flow-text blue-text">{{text.securityConcerns}}</h4>
                <div class="row padding-UB-large">
                	<p>{{text.securityParagraph}}</p>
                </div>
        </div>
        <div class="modal-footer soft-bluegrey white-text">
                <a class="modal-action modal-close waves-effect btn-flat grey-text text-lighten-1">{{text.cancel}}</a>              </div>
</div>

