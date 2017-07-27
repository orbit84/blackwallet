<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class My extends CI_Controller {

	public function index()
	{
		$this->load->view('includes/header.php', array('useMaterialize' => true, 'loadStellarSdk' => true));
		$this->load->view('walletv2.php');
		$this->load->view('includes/footer.php', array('hideFooter' => true, 'loadBlackWalletJs' => true));
	}

}
