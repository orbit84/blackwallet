<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function index()
	{
		$this->load->view('includes/header', array('useMaterialize' => true, 'useStarsCss' => true, 'useRocketCss' => true));
		$this->load->view('home');
		$this->load->view('includes/footer');
	}
}
