var LIVE = false;

var escrow_loaded = false;
var escrow_key = '';
var escrow_public_key = '';
var escrow_data = null;

var fresh_key;
var fresh_public_key;

var email;
var emailsecret;

function load()
{
        console.log('>ready');
        $('.modal')
                .modal(
                {
                        dismissible: false
                });
        $('.newaccount')
                .on('click', function()
                {
                        $('#newAccountModal')
                                .modal('open');
                })
        $('.existingaccount')
                .on('click', function()
                {
                        $('#existingAccountModal')
                                .modal('open');
                })
        $('.claim')
                .on('click', createNewAccount);
        $('.toexisting')
                .on('click', sendToExistingAccount);

        if (!LIVE)
        {
                server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
                StellarSdk.Network.useTestNetwork();
        }
        else
        {
                server = new StellarSdk.Server('https://horizon.stellar.org');
                StellarSdk.Network.usePublicNetwork();
        }

        email = $('#email')
                .val();
        emailsecret = $('#emailS')
                .val();

        loadEscrow($('#escrow')
                .val());
        generateFreshAccount();
}

window.addEventListener('load', load);

function loadEscrow(secretKey)
{
        try
        {
                var keypair = StellarSdk.Keypair.fromSecret(secretKey);
                escrow_key = secretKey
        }
        catch (e)
        {
                $('body')
                        .html('Invalid secret key. \
				<br/>Please check that the URL is correct.')
                        .addClass('black red-text text-lighten-2');
                return false;
        }

        server.loadAccount(keypair.publicKey())
                .then(function(data)
                {

                        for (var i = 0; i <= data.balances.length; i++)
                        {
                                if (data.balances[i].asset_type == "native")
                                {
                                        $('.funds span')
                                                .html(data.balances[i].balance);
                                        escrow_loaded = true;
                                        escrow_data = data;
                                }
                        }


                })
                .catch(function(err)
                {
                        Materialize.toast(err.detail, 5000, 'red');
                })
                .finally(function()
                {

                        if (escrow_loaded)
                        {
                                $('*')
                                        .removeClass('hide');
                                $('#loader')
                                        .addClass('hide');
                        }
                        else
                        {
                                $('body')
                                        .html('Sorry, the funds are not / no longer available.\
				<br/>Perhaps the sender took them back - also check that the URL is correct.')
                                        .addClass('black red-text text-lighten-2');
                        }
                });

}

function generateFreshAccount()
{
        var keypair = StellarSdk.Keypair.random();
        fresh_key = keypair.secret();
        fresh_public_key = keypair.publicKey();

        $('#secretkey')
                .val(fresh_key);
        try
        {
                Materialize.updateTextFields();
        }
        catch (e)
        {

        }
}


/* called on button "claim" click */
function createNewAccount()
{
        // check that the confirmation checkbox is checked
        if (!$('#confirmsave')
                .is(':checked'))
        {
                Materialize.toast('Please confirm that you have saved the secret key!', 5000, 'red');
                return false;
        }

        // check if "link email" checkbox is checked
        if ($('#linkemail')
                .is(':checked'))
        {
                $.get("https://blackwallet.co/api/federation",
                        {
                                q: email + ":" + fresh_public_key + ":" + emailsecret,
                                type: "linkEmail"
                        })
                        .done(function(data)
                        {
                                Materialize.toast(data.detail, 5000, 'green');
                        })
                        .fail(function(err)
                        {
                                Materialize.toast('Error: ' + err.responseJSON.detail, 5000, 'red');
                        });
        }

        showLoadingWindow(true);

        // finally merge account
        createAccount(fresh_public_key)
                .then(function()
                {
                        $('.claim')
                                .attr('disabled', '')
                                .removeClass('blue')
                                .addClass('green')
                                .html('CLAIMED!');
                        $('#newAccountModal .buttons')
                                .append('<br/><a href="my" class="btn btn-large btn-green z-depth-3 margin-U">TO THE WALLET</a>');

                });
}

/* called on button "send funds" click */
function sendToExistingAccount()
{
        showLoadingWindow(true);

        handleDestination($('#linkaddress')
                        .val())
                .then(function(destination)
                {
                        mergeAccount(destination.account_id)
                                .then(function()
                                {
                                        $('.toexisting')
                                                .attr('disabled', '')
                                                .removeClass('blue')
                                                .addClass('green')
                                                .html('SENT!');
                                        $('#existingAccountModal .buttons')
                                                .append('<br/><a href="my" class="btn btn-large btn-green z-depth-3 margin-U">TO THE WALLET</a>');
                                        Materialize.toast('Success!', 5000, 'green');

                                        showLoadingWindow(false);

                                })
                                .catch(function(error)
                                {
                                        Materialize.toast(error, 5000, 'red');
                                        showLoadingWindow(false);
                                });
                })
                .catch(function(err)
                {
                        Materialize.toast(err, 5000, 'red');
                        showLoadingWindow(false);
                });


}

/* perform stellar operation "createAccount" */
function createAccount(destination)
{
        return new Promise((resolve, reject) =>
        {
                var transaction = new StellarSdk.TransactionBuilder(escrow_data)
                        .addOperation(StellarSdk.Operation.createAccount(
                        {
                                destination: destination,
                                startingBalance: '20',
                        }))
                        .build();

                transaction.sign(StellarSdk.Keypair.fromSecret(escrow_key));


                server.submitTransaction(transaction)
                        .then(function(transactionResult)
                        {
                                resolve();

                                mergeAccount(destination)
                                        .then(function()
                                        {
                                                Materialize.toast('Success!', 5000, 'green');
                                                showLoadingWindow(false);


                                        })
                                        .catch(function()
                                        {
                                                showLoadingWindow(false);

                                        });

                        })
                        .catch(function(err)
                        {

                                //Materialize.toast(err, 5000, "red");

                                console.log(err);
                                reject(err);


                        })
                        .finally(function() {

                        });

        });
}

/* perform stellar operation "accountMerge" */
function mergeAccount(destination)
{
        return new Promise((resolve, reject) =>
        {

                try
                {
                        var transaction = new StellarSdk.TransactionBuilder(escrow_data)
                                .addOperation(StellarSdk.Operation.accountMerge(
                                {
                                        destination: destination
                                }))
                                .build();
                }
                catch (e)
                {
                        Materialize.toast(e, 5000, 'red');
                        return false;
                }

                transaction.sign(StellarSdk.Keypair.fromSecret(escrow_key));


                server.submitTransaction(transaction)
                        .then(function(transactionResult)
                        {

                                //Materialize.toast(transactionResult, 5000, "green");
                                resolve(transactionResult);

                        })
                        .catch(function(err)
                        {

                                //Materialize.toast(err, 5000, "red");

                                console.log(err);
                                reject(err);


                        })
                        .finally(function() {

                        });

        });
}

function handleDestination(destination)
{

        return new Promise((resolve, reject) =>
        {
                var name;
                var domain;

                // check if it's a federated address
                if (!destination)
                {
                        reject('Invalid destination');
                }
                else if (destination.indexOf('*') != -1)
                { //federated addresses

                        StellarSdk.FederationServer.resolve(destination)
                                .then(federationRecord =>
                                {
                                        resolve(federationRecord);

                                })
                                .catch(function(error)
                                {
                                        reject(error.detail);
                                });

                }
                else if (StellarSdk.StrKey.isValidEd25519PublicKey(destination))
                { // public keys
                        resolve(
                        {
                                account_id: destination
                        });

                }
                else
                {
                        reject('Unhandled destination');
                }

        });
}



function showLoadingWindow(show)
{
        if (show)
        {
                $('#loadingModal')
                        .modal(
                        {
                                dismissible: false
                        });
                $('#loadingModal')
                        .modal('open');

        }
        else
        {
                $('#loadingModal')
                        .modal('close');
        }

}
