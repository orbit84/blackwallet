<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Claim extends CI_Controller {

	public function index()
	{
		if(!isset($_GET['e']) || !isset($_GET['es']) || !isset($_GET['s'])) {
			echo '<p class="red-text">missing parameters</p>';
			return false;
		}

		// used to prevent users from linking an email that is not their property to an account id
		$mail_split = str_split($_GET['e']);
		$mail_secret = 276;

		foreach($mail_split as $char) {
		    $mail_secret += ord($char)+85019;
		}

		if($mail_secret != $_GET['es']) {
			echo '<p class="red-text">invalid link</p>';
			return false;
		}

		$this->load->view('includes/header.php', array('useMaterialize' => true));
		$this->load->view('claim.php', array('secretKey' => htmlspecialchars($_GET['s']), 
											'email' => htmlspecialchars($_GET['e']),
											'emailSecret' => htmlspecialchars($_GET['es'])));
		$this->load->view('includes/footer.php', array('hideFooter' => true, 'loadClaimJs' => true));
	}

}
