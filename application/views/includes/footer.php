<?php if(!isset($hideFooter)) { ?>
<footer class="page-footer grey-text text-lighten-1 black">
  <div class="container">
    <div class="row">
      <div class="col l6 s12">
        <h5 class="blue-text text-darken-1">blackwallet</h5> 
        <p>Made with <i class="fa fa-heart red-text"></i> in France.<br/><b>Donate:</b> <span style="word-wrap:break-word;">GCOQAWJHY3ROVKLU7TAE75LC524SCARFA4EOBRSTVGY4G2TRNYJZ4GJ2</span></p>
      </div>
      <div class="col l4 offset-l2 s12">
        <h5 class="grey-text">Links</h5>
        <ul>
          <li><a target="_blank" href="https://galactictalk.org/d/369-blackwallet-enhanced-account-viewer"><i class="fa fa-rocket white-text"></i> GalacticTalk</a></li>
          <li><a target="_blank" href="https://stellarcommunity.org/t/blackwallet-enhanced-account-viewer-giveaway/690"><i class="fa fa-rocket white-text"></i> StellarCommunity</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-copyright">
    <div class="container">
    © Copyright 2017, BlackWallet - we are not affiliated with the Stellar Foundation.
    <a class="grey-text text-lighten-4 right" href="terms">Terms</a>
    </div>
  </div>
</footer>
<?php } ?>
<script type="text/javascript" src="assets/js/smoothscroll.js"></script>

<?php if(isset($loadBlackWalletJs)) {  ?>
<!-- load blackwallet -->
<script type="text/javascript" src="assets/js/translation.js"></script>
<script type="text/javascript" src="assets/js/blackwalletv2.js"></script>

<script type="text/javascript" src="https://files.coinmarketcap.com/static/widget/currency.js"></script>
<?php } ?>

<?php if(isset($loadClaimJs)) {  ?>
<!-- load stellar sdk -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/0.7.3/stellar-sdk.min.js"></script>
<!-- load blackwallet claim js -->
<script type="text/javascript" src="assets/js/claim.js"></script>
<?php } ?>


</body>
</html>