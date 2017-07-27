<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pay extends CI_Controller {

	public function index() {
		$this->load->view('includes/header', array('useMaterialize' => true));
		$this->load->view('pay');
		$this->load->view('includes/footer');

	}

	public function o($data)
	{
		if(!isset($data)) {
		 $this->load->helper('url');
		 redirect('/'); 
		}

		$this->load->view('paymentpage');
	}
}
