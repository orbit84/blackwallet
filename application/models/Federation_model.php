<?php
class Federation_model extends CI_Model {

        public function __construct()
        {
                parent::__construct();
                $this->load->database();
        }


        /* display error details */
        public function error($detail,$code=400) {
                http_response_code($code);
                echo '{"detail": "'.$detail.'"}';
        }

        /* handle the federation lookup */
        public function handle($q, $type) {

                switch( $type ) {
                        case 'name':
                                $this->getRecordFromName(strtolower($q));
                                break;
                        case 'id':
                                $this->getRecordFromAccountId($q);
                                break;
                        case 'link':
                                $this->linkNameToAccountId($q);
                                break;
                        case 'linkEmail':
                                $this->linkEmailToAccountId($q);
                                break;
                        default:
                                $this->error('Unhandled type');
                                break;

                }

        }

        /* display the record linked to the name $name */
        private function getRecordFromName($name) {
                $this->db->select('*');
                $this->db->from('user');
                $this->db->where('stellar_address', $name);
                $query = $this->db->get();

                if( $query->num_rows() == 0 ) { 

                        $this->error('No record found', 404);
                        return false; 
                }

                $this->displayRecord($query->row(0));
                return $query;
        }

        /* 
        display the first record linked to the account id $accountId 
        an account id can have multiple records linked to it
        */
        private function getRecordFromAccountId($accountId) {
                $this->db->select('*');
                $this->db->from('user');
                $this->db->where('account_id', $accountId);
                $query = $this->db->get();

                if( $query->num_rows() == 0 ) { 
                        $this->error('No record found', 404);
                        return false; 
                }

                $this->displayRecord($query->row(0));
                return $query;
        }



        /* try to link if available, a name to a stellar account id,
        the data is provided this way:    name:accountid */
        private function linkNameToAccountId($data) {
            $data = explode(':', $data);
            $name = $data[0];
            $accountId = $data[1];

            // check that the name is a valid name (alphanumeric regex check)
            if(!ctype_alnum($name)) {
                $this->error('Invalid name, must contains alphanumeric characters only.');
                return false;
            }

            // check that no name is linked yet to the accountid
            $this->db->select('*');
            $this->db->from('user');
            $this->db->where('account_id', $accountId);
            $query = $this->db->get();

            if( $query->num_rows() > 0 ) { 

                $this->error('You already have a federated name or email linked.');
                return false;
            }

            // check that the name is not already used by someone else
            $this->db->select('*');
            $this->db->from('user');
            $this->db->where('stellar_address', $name.'*blackwallet.co');
            $query2 = $this->db->get();

            if( $query2->num_rows() > 0 ) { 

                $this->error('Name already used by someone.');
                return false;
            }


             // finally, we insert the name into the db
            $this->db->insert('user',            
                array(
                   'stellar_address' => strtolower($name).'*blackwallet.co',
                   'account_id' =>  $accountId
                )
            ); 


            echo '{"detail":"Success!"}';

        }

        /* try to link if available, an email to a stellar account id,
        the data is provided this way:    email:accountid:emailsecret 
        where email secret is a hash of the email to prevent people from linking
        emails they do not own to an account id
        */
        private function linkEmailToAccountId($data) {
            $data = explode(':', $data);
            $email = $data[0];
            $accountId = $data[1];
            $emailSecret = $data[2];

            // check that the emailSecret is correct
            // used to prevent users from linking an email that is not their property to an account id
            $email_split = str_split($email);
            $_emailSecret = 276;

            foreach($email_split as $char) {
                $_emailSecret += ord($char)+85019;
            }

            if($_emailSecret != $emailSecret) {
                $this->error('Invalid email hash');
                return false;
            }


            // check that the email is not already linked to an account
            $this->db->select('*');
            $this->db->from('user');
            $this->db->where('stellar_address', $email.'*blackwallet.co');
            $query = $this->db->get();

            if( $query->num_rows() > 0 ) { 

                $this->error('This email is already linked to an account id.');
                return false;
            }


             // finally, we insert the email into the db
            $this->db->insert('user',            
                array(
                   'stellar_address' => strtolower($email).'*blackwallet.co',
                   'account_id' =>  $accountId
                )
            ); 


            echo '{"detail":"Email successfully linked!"}';

        }


        /* display a record in JSON format */
        private function displayRecord($record) {
                if( $record->memo != '' ) {
                        echo '{'
                                .'"stellar_address":"'.$record->stellar_address.'",'
                                .'"account_id":"'.$record->account_id.'",'
                                .'"memo":"'.$record->memo.'",'
                                .'"memo_type":"'.$record->memo_type.'"'
                             .'}';
                } else {
                        echo '{'
                                .'"stellar_address":"'.$record->stellar_address.'",'
                                .'"account_id":"'.$record->account_id.'"'
                             .'}';
                }

        }

}