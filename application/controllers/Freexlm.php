<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Freexlm extends CI_Controller {

	public function index()
	{
		$this->load->view('includes/header', array('useMaterialize' => true));
		$this->load->view('freexlm');
		$this->load->view('includes/footer');
	}
}
