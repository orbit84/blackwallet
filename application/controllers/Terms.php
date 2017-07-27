<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Terms extends CI_Controller {

	public function index()
	{
		$this->load->view('includes/header', array('useMaterialize' => true, 'hideHeader' => true));
		$this->load->view('terms');
		$this->load->view('includes/footer');
	}
}
