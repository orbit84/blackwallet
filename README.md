# Blackwallet

Blackwallet is a Stellar Lumen's web wallet built using codeigniter, javascript (+jquery), materializecss and stellar horizon! It works 
on any platform (as long as the platform can access internet & execute javascript code).

It is multilanguage (at 0.1.5, it was available in English, French and Italian).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need a web server (with PHP support) and a mysql server (for the federation server).

The federation server is already included in blackwallet but not configured, instructions can be found here: https://github.com/orbit84/php-stellar-federation


### Installing

Pretty easy to install:
- Download the project.
- Go to the [php federation's project page](https://github.com/orbit84/php-stellar-federation) and configure the database etc. Make sure to change all the \*domain.com (in Federation_model.php) to your own domain's name.
- In application/controllers/Api.php, change the public function mail() so it works with your domain.
- Upload the whole project on your webserver

Blackwallet should works on your webserver, you can now use it and start editing it.

**/!\ warning**
The project may contains some direct links to https://blackwallet.co - please remove them or modify them to your own host. This will prevent useless surcharge of the blackwallet's server

**/!\ before testing**
You may want to use blackwallet on testnet for the first use - to enable the testnet mode, go to assets/js/blackwalletv2.js and change (line 31)

```
var LIVE = true;
```

to

```
var LIVE = false;
```

Now blackwallet will run in testnet mode!


## Deployment

To deploy on livenet:
Go to assets/js/blackwalletv2.js and change (line 31)

```
var LIVE = false;
```

to

```
var LIVE = true;
```

And then simply upload to your server.


## Built With

* [Materializecss](http://materializecss.com/) - Front-end framework
* [Codeigniter](https://www.codeigniter.com/) - Web framework
* [jQuery](https://jquery.com/) - Javascript library
* [StellarSdk](https://github.com/stellar/js-stellar-sdk) - The Stellar Foundation javascript SDK


## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

a.b.c format, we increment the c at each update - b is incremented on HUGE update or once the c arrives to 10 - a is incremented in case of huge rewriting - huge change or once b arrives to 10.


## Authors

* **orbit84 (Alexis)** - *Initial work* - [@orbit84](https://github.com/orbit84)

## Contributors

* **nekraatal** - *Italian translation-

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* stellar-public Slack users for helping me! 
* GalacticTalk.org & StellarCommunity.org users for providing feedbacks, bug reports, ideas etc.
* [Stellar Foundation](https://stellar.org)
