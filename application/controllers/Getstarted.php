<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Getstarted extends CI_Controller {

	public function index()
	{
		$this->load->view('includes/header', array('useMaterialize' => true));
		$this->load->view('getstarted');
		$this->load->view('includes/footer');
	}
}
