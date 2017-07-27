/* This is the translation file for blackwallet */
var langs = {};
var active_lang;

var translate = function(lang)
{
        var replaced = $("body")
                .html();

        // we loop through english keys as it's the most complete language

        for (var name in langs['english'])
        {
                var regex = RegExp('{{text.' + name + '}}', 'g');
                replaced = replaced.replace(regex, getTextFor(name));
        }

        $('body')
                .html(replaced);


        // add language buttons in the header
        $('#nav-mobile')
                .prepend('<li> \
	 							<a class="changeLanguage white-text">  \
	 								<span><i class="fa fa-flag blue-text"></i> ' + active_lang.toUpperCase() + '</span>  \
	 							</a>  \
	 						   </li>');

        $('#walletnavmed, #walletnavsmall')
                .prepend('<li> \
	 							<a class="changeLanguage white-text">  \
	 								<span><i class="fa fa-flag blue-text"></i> ' + active_lang.substr(0, 2)
                        .toUpperCase() + '</span>  \
	 							</a>  \
	 						   </li>');

        $('.changeLanguage')
                .on('click', function()
                {
                        $('#languageModal')
                                .modal('open');
                });
        $('.setLanguage')
                .on('click', setLanguage);


        try
        {
                // save lang
                localStorage.setItem('lang', lang);
        }
        catch (e)
        {

        }

        // load blackwallet
        try
        {
                load();
        }
        catch (e)
        {
                alert(e);
        }
}

window.addEventListener('load', function()
{
        if (!localStorage.getItem('lang'))
        {
                active_lang = 'english';
                translate('english');
        }
        else
        {
                active_lang = localStorage.getItem('lang');
                translate(active_lang);
        }


});

function setLanguage()
{
        var language = $('#language')
                .val();
        try
        {
                localStorage.setItem('lang', language);
                location.reload();
        }
        catch (e)
        {
                alert('Error: doesn\'t work in private navigation');
        }
}

// return the text for the active language
// return in english if not set
// return formatted if not set in english
function getTextFor(key)
{
        if (langs[active_lang][key])
        {
                return langs[active_lang][key];
        }
        else if (langs['english'][key])
        {
                console.log('[translation] Missing value for key: ' + key + ' (lang:' + active_lang + ')');
                return langs['english'][key];
        }
        else
        {
                console.log('[translation] Missing value for key: ' + key + ')');
                return '{{text.' + key + '}}';
        }
}

langs.english = {
        "loading": "loading blackwallet",
        "wait": "please wait...",
        "alreadyHaveWallet": "already have a wallet?",
        "enterSecretToUnlock": "enter your secret key to unlock it",
        "secretKey": "Secret key",
        "unlock": "Unlock",
        "noWalletYet": "no wallet yet?",
        "getWalletNow": "get yours in 3 seconds",
        "getStarted": "Get started",
        "generateKeypair": "Generate a key pair",
        "sendMoney": "Send money",
        "receiveMoney": "Receive money",
        "sendMoneyInfo": "You can send money to any public address, email address or federated address.",
        "sendMoneyRecipient": "To",
        "sendMoneyAmount": "Amount",
        "sendMoneyAsset": "Asset",
        "sendMoneyMemoType": "Memo type",
        "sendMoneyMemoValue": "Memo value",
        "send": "Send",
        "receiveLumens": "Receive money",
        "receivePublicAddress": "Your public address",
        "or": "or",
        "federatedName": "Your federated name",
        "explanations": "Explanations",
        "publicAddressTitle": "Public address",
        "publicAddressDesc": "give this address to receive payments, it is supported everywhere.",
        "federatedNameTitle": "Federated name",
        "federatedNameDesc": "give this federated name to receive payments, it may not be supported everywhere but is easier to remember. Click the button <span class=\"fa-stack\"> \
						  <i style=\"font-size:18px;\" class=\"fa fa-user fa-stack-2x white-text\"></i> \
						  <i style=\"top:-10px; left:5px; font-size:12px;\" class=\"fa fa-tag grey-text text-darken-3 fa-stack-1x\"></i>\
					</span> bellow to set your federated name.",
        "tools": "Tools",
        "inspect": "Inspect",
        "charts": "Charts",
        "currency": "Currency",
        "chart": "Chart",
        "holdings": "Holdings",
        "assets": "Assets",
        "asset": "Asset",
        "trust": "Trust",
        "updateTrustlineDesc": "Here you can update the trust line for a given asset.",
        "assetCode": "Asset code",
        "assetIssuer": "Asset issuer",
        "limit": "Limit",
        "optionnal": "optionnal",
        "trustlineLimitInfo": "Set limit to 0 to delete the trust line - enter nothing to use the max limit.",
        "update": "Update",
        "community": "Community",
        "boards": "Boards",
        "official": "Official",
        "buy_sell_exchanges": "Buy/Sell/Exchanges",
        "communityGetListed": "Want to be listed here? Please tell us on our <a href=\"https://galactictalk.org/d/369-blackwallet-enhanced-account-viewer/\" target=\"_blank\">official thread</a> or through PM on GalacticTalk (@orbit84).",
        "giveaway": "Lumens giveaway",
        "giveawayDesc": 'We will give away a part of the Lumens we may win with the Stellar Build Challenge.<br/> \
					You can learn everything about the giveway (how to join etc.) by clicking <a href="https://stellarcommunity.org/t/blackwallet-enhanced-account-viewer-giveaway/690" target="_blank">here</a>.',
        "getGiveawayCode": "GET MY BLACKWALLET CODE",
        "settings": "Settings",
        "settingsGeneral": "General",
        "settingsMoney": "Money",
        "settingsGlobal": "Global",
        "settingsShowTooltips": "Show tooltips",
        "settingsAutoRefresh": "Auto refresh",
        "settingsMobileMode": 'Mobile mode<br/><small><i class="fa fa-warning yellow-text"></i> Your wallet will not lock unless you logout, use at your own risk.</small>',
        "accounts": "Accounts",
        "version": "Version",
        "market": "Market",
        "settingsMarketLabel": "Market for USD balance",
        "inflation": "Inflation",
        "inflationDestination": "Inflation destination",
        "set": "Set",
        "english_s": "'s",
        "wallet": "wallet",
        "nonExistingAccountNotice": 'This account doesn\'t exist on the network.<br/>To create this account, send it at least 20 Lumens (XLM) to fulfill the <a target="_blank" class="grey-text text-darken-3" href="https://www.stellar.org/developers/learn/concepts/fees.html#minimum-balance"><u>minimum balance.</u></a>',
        "logout": "Logout",
        "recentTransactions": "Recent transactions",
        "accountId": "Account ID",
        "operationId": "Operation ID",
        "confirmLogoutTitle": "Logout confirmation",
        "confirmLogoutDesc1": 'Do you really want to logout?\
						  	<br/>\
						  	All the saved wallets will be removed and the mobile mode will be disabled.\<br/>',
        "confirmLogoutDesc2": "Make sure that you have the secret keys stored somewhere else!",
        "cancel": "Cancel",
        "save": "Save",
        "waitAlt": "Please wait",
        "federatedNameWarning": "Warning: once set your federated name will be permanently linked to your public address, it cannot be edited or removed.",
        "sendEverything": "Send everything?",
        "sendEverythingDesc": "You don't have enough funds! (remember that there is a 0.0001 XLM fee)<br/>Would you like to send all your Lumens instead",
        "sendEverythingWarning": "If you do so, this account will become inactive.",
        "yes": "Yes",
        "no": "No",
        "payment": "Payment",
        "confirmPayment": "Please confirm the payment:",
        "destination": "Destination",
        "message": "Message",
        "secretKeyEmail": "Save this key, you can use it to refund the payment in case the email owner never claims the funds.",
        "confirm": "Confirm",
        "language": "Language",
        "english": "English",
        "italian": "Italiano",
        "french": "Français",
        "selectLanguage": "Choose language",
        "anchor": "Anchor",
        "name": "Name",
        "cantDeleteActiveWallet": "You can't delete your active wallet",
        "issuer": "Issuer",
        "noTransactions": "No transactions yet.",
        "mailSendAssetTypeError": "You can only send XLM through mails for the moment.",
        "mailSendAmountError": "You must send at least 40.1 XLM when sending to an email.",
        "amountError": "Amount must be a positive number and have at most 7 digits after the decimal.",
        "error": "Error",
        "accountCreationNotice": "Account created and funded with",
        "accountCreationError": "Account creation error!",
        "invalidDestination": "Invalid destination !",
        "unhandledDestination": "Unhandled destination",
        "accountMergeSuccess": "Account merged with",
        "accountMergeErrorAssets": "Merging error: you still have assets!",
        "accountMergeError": "Merging error!",
        "federatedNameAlreadyDefined": "Federated name already defined for this account!",
        "federatedNameRegexError": "The federated name contains invalid characters (only letters and numbers are allowed)",
        "requiresMobileMode": "Mobile mode must be enabled!",
        "updatedTrustline": "Updated trust line for",
        "updatedInflationDestination": "Updated inflation destination to:",
        "publicKey": "Public key",
        "anchorDomain": "Anchor's domain name",
        "search": "Search",
        "anchorNotFound": "Anchor not found",
        "info": "Infos",
        "image": "Image",
        "assetDesc": "Asset's description",
        "assetConditions": "Asset's conditions",
        "assetName": "Asset's name",
        "to": "To"


};


langs.french = {
        "loading": "chargement",
        "wait": "veuillez patienter...",
        "alreadyHaveWallet": "vous avez déjà un compte?",
        "enterSecretToUnlock": "entrez votre clé secrète",
        "secretKey": "Clé secrète",
        "unlock": "Déverrouiller",
        "noWalletYet": "pas encore de compte?",
        "getWalletNow": "obtenez en un en 3 secondes",
        "getStarted": "Guide",
        "generateKeypair": "Genérer une paire de clés",
        "sendMoney": "Envoyer de l'argent",
        "receiveMoney": "Recevoir de l'argent",
        "sendMoneyInfo": "Vous pouvez envoyer de l'argent à n'importe quelle adresse publique, adresse fédérée ou adresse mail.",
        "sendMoneyRecipient": "Destinataire",
        "sendMoneyAmount": "Quantité",
        "sendMoneyAsset": "Asset",
        "sendMoneyMemoType": "Type du memo",
        "sendMoneyMemoValue": "Valeur du memo",
        "send": "Envoyer",
        "receiveLumens": "Recevoir de l'argent",
        "receivePublicAddress": "Votre adresse publique",
        "or": "ou",
        "federatedName": "Votre nom fédéré",
        "explanations": "Explications",
        "publicAddressTitle": "Adresse publique",
        "publicAddressDesc": "partagez cette adresse pour être payé, elle est supportée partout.",
        "federatedNameTitle": "Nom fédéré",
        "federatedNameDesc": "partagez ce nom fédéré pour être payé, il n'est pas supporté par certaines applications mais est plus facile à retenir. Cliquez sur le boutton <span class=\"fa-stack\"> \
						  <i style=\"font-size:18px;\" class=\"fa fa-user fa-stack-2x white-text\"></i> \
						  <i style=\"top:-10px; left:5px; font-size:12px;\" class=\"fa fa-tag grey-text text-darken-3 fa-stack-1x\"></i>\
					</span> ci-dessous pour définir votre nom fédéré.",
        "tools": "Outils",
        "inspect": "Inspecter",
        "charts": "Graphiques",
        "currency": "Devise",
        "chart": "Graphique",
        "holdings": "Monnaies",
        "assets": "Assets",
        "asset": "Asset",
        "trust": "Trust",
        "updateTrustlineDesc": "Ici vous pouvez modifier la trust line d'un asset.",
        "assetCode": "Code de l'asset",
        "assetIssuer": "&Eacute;metteur de l'asset",
        "limit": "Limite",
        "optionnal": "facultatif",
        "trustlineLimitInfo": "Entrez 0 pour révoquer la trust line - n'entrez rien pour utiliser la limite maximale.",
        "update": "Mettre à jour",
        "community": "Communauté",
        "boards": "Forums",
        "official": "Officiel",
        "buy_sell_exchanges": "Acheter/Vendre/Echanges",
        "communityGetListed": "Vous voulez apparaître ici? Demandez sur le <a href=\"https://galactictalk.org/d/369-blackwallet-enhanced-account-viewer/\" target=\"_blank\">topic officiel</a> ou par MP sur GalacticTalk (@orbit84).",
        "giveaway": "Distribution de Lumens",
        "giveawayDesc": 'Nous allons redistribuer une partie des Lumens si nous gagnons le SBC.<br/> \
					Vous pouvez en apprendre plus en <a href="https://stellarcommunity.org/t/blackwallet-enhanced-account-viewer-giveaway/690" target="_blank">cliquant ici</a>.',
        "getGiveawayCode": "GENERER MON CODE BLACKWALLET",
        "settings": "Réglages",
        "settingsGeneral": "Géneral",
        "settingsMoney": "Monnaie",
        "settingsGlobal": "Global",
        "settingsShowTooltips": "Afficher les info-bulles",
        "settingsAutoRefresh": "Actualisation automatique",
        "settingsMobileMode": 'Mode mobile<br/><small><i class="fa fa-warning yellow-text"></i> Votre portefeuille ne se fermera pas tant que vous ne vous déconnectez pas, utilisez à vos risques et périls.</small>',
        "accounts": "Comptes",
        "version": "Version",
        "market": "Marché",
        "settingsMarketLabel": "Marché pour solde en USD",
        "inflation": "Inflation",
        "inflationDestination": "Destination de l'inflation",
        "set": "Définir",
        "english_s": "",
        "wallet": "",
        "nonExistingAccountNotice": 'Ce compte n\'existe pas sur le réseau.<br/>Pour créer ce compte, envoyez au moins 20 Lumens (XLM) pour remplir le <a target="_blank" class="grey-text text-darken-3" href="https://www.stellar.org/developers/learn/concepts/fees.html#minimum-balance"><u>solde minimum.</u></a>',
        "logout": "Déconnexion",
        "recentTransactions": "Transactions récentes",
        "accountId": "ID Compte",
        "operationId": "ID Opération",
        "confirmLogoutTitle": "Confirmation de déconnexion",
        "confirmLogoutDesc1": 'Voulez-vous vraiment vous déconnecter ?\
						  	<br/>\
						  	Tous vos portefeuilles seront supprimés et le mode mobile sera désactivé.\<br/>',
        "confirmLogoutDesc2": "Assurez-vous d'avoir sauvegardé vos clés secrètes !",
        "cancel": "Annuler",
        "save": "Sauvegarder",
        "waitAlt": "Veuillez patienter",
        "federatedNameWarning": "Attention: une fois défini, votre nom fédéré sera lié de façon permanente à votre adresse publique. Il ne pourra plus être modifié ni supprimé.",
        "sendEverything": "Tout envoyer ?",
        "sendEverythingDesc": "Vous n'avez pas assez de fonds ! (souvenez vous qu'il y a 0.0001 XLM de frais)<br/Voulez-vous envoyer tous vos Lumens à la place ?",
        "sendEverythingWarning": "Si vous faîtes cela, ce compte sera désactivé.",
        "yes": "Oui",
        "no": "Non",
        "payment": "Paiement",
        "confirmPayment": "Veuillez confirmer le paiement:",
        "destination": "Destination",
        "message": "Message",
        "secretKeyEmail": "Sauvegardez cette clé, vous pouvez l'utiliser pour rembourser le paiement si le destinataire ne collecte pas les Lumens.",
        "confirm": "Confirmer",
        "language": "Langue",
        "selectLanguage": "Choix du langage",
        "anchor": "Ancre",
        "name": "Nom",
        "cantDeleteActiveWallet": "Vous ne pouvez pas supprimer le portefeuille actif",
        "issuer": "Emetteur",
        "noTransactions": "Pas encore de transactions.",
        "mailSendAssetTypeError": "Vous ne pouvez envoyer que des XLM par mail pour le moment.",
        "mailSendAmountError": "Vous devez envoyer au minimum 40.1 XLM quand vous envoyez à une adresse mail.",
        "amountError": "La quantité doit être un nombre positif et avoir au maximum 7 décimales.",
        "error": "Erreur",
        "accountCreationNotice": "Compte créé et crédité de ",
        "accountCreationError": "Erreur lors de la création du compte",
        "invalidDestination": "Destinataire invalide",
        "unhandledDestination": "Type de destination non supporté",
        "accountMergeSuccess": "Compte fusionné avec",
        "accountMergeErrorAssets": "Erreur fusion: vous avez encore des assets!",
        "accountMergeError": "Erreur lors de la fusion!",
        "federatedNameAlreadyDefined": "Cette clé publique possède déjà un nom fédéré!",
        "federatedNameRegexError": "Le nom fédéré contient des caractères invalides (seuls les lettres et chiffres sont autorisés)",
        "requiresMobileMode": "Le mode mobile doit être activé !",
        "updatedTrustline": "Trust line mise à jour pour ",
        "updatedInflationDestination": "La destination de l'inflation a été mise à jour: ",
        "publicKey": "Clé publique",
        "anchorDomain": "Nom de domaine de l'ancre",
        "search": "Rechercher",
        "anchorNotFound": "Ancre non trouvée",
        "info": "Infos",
        "assetDesc": "Description de l'asset",
        "assetConditions": "Conditions de l'asset",
        "assetName": "Nom de l'asset",
        "to": "&Agrave;"

};


langs.italian = {
        "loading": "carico blackwallet",
        "wait": "attendere prego...",
        "alreadyHaveWallet": "hai già un wallet?",
        "enterSecretToUnlock": "inserisci la tua chiave segreta per sbloccarlo",
        "secretKey": "Chiave segreta",
        "unlock": "Sblocca",
        "noWalletYet": "ancora non hai un wallet?",
        "getWalletNow": "crea il tuo in 3 secondi",
        "getStarted": "Inizia",
        "generateKeypair": "Genera una coppia di chiavi",
        "sendMoney": "Invia denaro",
        "receiveMoney": "Ricevi denaro",
        "sendMoneyInfo": "Puoi inviare denaro a qualsiasi indirizzo pubblico, ad un indirizzo email o a qualsiasi indirizzo federato.",
        "sendMoneyRecipient": "A",
        "sendMoneyAmount": "Importo",
        "sendMoneyAsset": "Risorsa",
        "sendMoneyMemoType": "Tipologia Memo",
        "sendMoneyMemoValue": "Valore Memo",
        "send": "Invia",
        "receiveLumens": "Ricevi denaro",
        "receivePublicAddress": "Il tuo indirizzo pubblico",
        "or": "o",
        "federatedName": "Il tuo indirizzo federato",
        "explanations": "Spiegazioni",
        "publicAddressTitle": "Indirizzo pubblico",
        "publicAddressDesc": "dai questo indirizzo per ricevere pagamenti, è supportato ovunque.",
        "federatedNameTitle": "Nome federato",
        "federatedNameDesc": "dai questo nome federato per ricevere pagamenti, potrebbe non essere supportato ovunque ma è più facile da ricordare. Clicca il bottone <span class=\"fa-stack\"> \
                          <i style=\"font-size:18px;\" class=\"fa fa-user fa-stack-2x white-text\"></i> \
                          <i style=\"top:-10px; left:5px; font-size:12px;\" class=\"fa fa-tag grey-text text-darken-3 fa-stack-1x\"></i>\
                    </span> qui sotto per impostare il tuo Nome Federato.",
        "tools": "Strumenti",
        "inspect": "Esamina",
        "charts": "Grafici",
        "currency": "Moneta",
        "chart": "Grafici",
        "holdings": "Patrimonio",
        "assets": "Risorse",
        "asset": "Risorsa",
        "trust": "Fiducia",
        "updateTrustlineDesc": "Qui puoi aggiornare la tua catena di fiducia per una determinata risorsa.",
        "assetCode": "Codice risorsa",
        "assetIssuer": "Emittente risorsa",
        "limit": "Limite",
        "optionnal": "Facoltativo",
        "trustlineLimitInfo": "Imposta il limite a 0 per eliminare la catena di fiducia - Lascialo vuoto per impostare il limite al massimo.",
        "update": "Aggiorna",
        "community": "Comunità ",
        "boards": "Commissione",
        "official": "Ufficiale",
        "buy_sell_exchanges": "Compra/Vendi/Scambia",
        "communityGetListed": "Vuoi essere elencato qui? Faccelo sapere sul nostro <a href=\"https://galactictalk.org/d/369-blackwallet-enhanced-account-viewer/\" target=\"_blank\">thread ufficiale</a> o tramite PM su GalacticTalk (@orbit84).",
        "giveaway": "Distribuzione Lumen",
        "giveawayDesc": 'Regaleremo una parte dei Lumen che potremmo vincere con lo Stellar Build Challenge.<br/> \
                    Puoi saperne di più a riguardo (come partecipare etc.) cliccando <a href="https://stellarcommunity.org/t/blackwallet-enhanced-account-viewer-giveaway/690" target="_blank">qui</a>.',
        "getGiveawayCode": "DAMMI IL MIO CODICE BLACKWALLET",
        "settings": "Impostazioni",
        "settingsGeneral": "Generali",
        "settingsMoney": "Monete",
        "settingsGlobal": "Globali",
        "settingsShowTooltips": "Mostra suggerimenti",
        "settingsAutoRefresh": "Auto aggiornamento",
        "settingsMobileMode": 'Modalità cellulare <br/><small><i class="fa fa-warning yellow-text"></i> Il tuo wallet rimarrà accessibile fino a che non eseguirai la disconnessione, usare a vostro rischio.</small>',
        "accounts": "Account",
        "version": "Versione",
        "market": "Mercato",
        "settingsMarketLabel": "Mercato per il saldi in USD",
        "inflation": "Inflazione",
        "inflationDestination": "Destinatario inflazione",
        "set": "Imposta",
        "english_s": " ",
        "wallet": "wallet",
        "nonExistingAccountNotice": 'Questo account non esiste ancora.<br/>Per crearlo inviagli almeno send 20 Lumen (XLM) per raggiungere il <a target="_blank" class="grey-text text-darken-3" href="https://www.stellar.org/developers/learn/concepts/fees.html#minimum-balance"><u>deposito minimo.</u></a>',
        "logout": "Esci",
        "recentTransactions": "Movimenti recenti",
        "accountId": "Identificativo Account",
        "operationId": "Identificativo operazione",
        "confirmLogoutTitle": "Conferma disconnessione",
        "confirmLogoutDesc1": 'Vuoi davvero uscire?\
                            <br/>\
                            Tutti gli wallet salvati saranno rimossi e la modalità cellulare verrà disattivata.\<br/>',
        "confirmLogoutDesc2": "Assicurati di aver conservato le tue chiavi segrete da qualche altra parte!",
        "cancel": "Annulla",
        "save": "Salva",
        "waitAlt": "Attendere prego",
        "federatedNameWarning": "Attenzione: una volta impostato il tuo nome federato sarà collegato permanentemente con il tuo indirizzo pubblico, non potrà più essere modificato o rimosso.",
        "sendEverything": "Inviare tutto?",
        "sendEverythingDesc": "Non hai fondi sufficienti! You don't have enough funds! (Ricorda che c'è un costo di transazione pari a  0.0001 XLM)<br/>Vorresti invece inviare tutti i tuoi Lumen?",
        "sendEverythingWarning": "Se lo fai, questo account diventerà inattivo.",
        "yes": "Si",
        "no": "No",
        "payment": "Pagamenti",
        "confirmPayment": "Per favore conferma il pagamento:",
        "destination": "Destinazione",
        "message": "Messaggio",
        "secretKeyEmail": "Salva questa chiave, potrai utilizzarla per recuperare il tuo pagamento nel caso il destinatario email non reclami il deposito.",
        "confirm": "Conferma",
        "language": "Lingua",
        "selectLanguage": "Scegli la lingua",
        "anchor": "Ancora",
        "name": "Nome",
        "cantDeleteActiveWallet": "Non puoi eliminare il tuo wallet se è attivo",
        "issuer": "Emittente",
        "noTransactions": "Nessuna transazione.",
        "mailSendAssetTypeError": "Al momento puoi solo inviare XLM tramite email.",
        "mailSendAmountError": "Devi inviare almeno 40.1 XLM quando invii tramite email.",
        "amountError": "L'importo deve essere positivo e deve avere al massimo 7 cifre decimali.",
        "error": "Errore",
        "accountCreationNotice": "Account creato e finanziato con",
        "accountCreationError": "Errore durante la creazione dell'account!",
        "invalidDestination": "Destinazione non valida !",
        "unhandledDestination": "Destinazione non gestita",
        "accountMergeSuccess": "Account unito con ",
        "accountMergeErrorAssets": "Impossibile unire: hai ancora delle risorse!",
        "accountMergeError": "Errore di unione!",
        "federatedNameAlreadyDefined": "Nome federato già impostato per questo account!",
        "federatedNameRegexError": "Il nome federato contiene caratteri invalidi (sono permessi solo lettere e numeri)",
        "requiresMobileMode": "La modalità cellulare deve essere abilitata!",
        "updatedTrustline": "Aggiornata la catena di fiducia per ",
        "updatedInflationDestination": "Aggiornata la destinazione dell'inflazione a: ",
        "publicKey": "Chiave pubblica",
        "anchorDomain": "Nome del dominio dell'Ancora",
        "search": "Ricerca",
        "anchorNotFound": "Ancora non trovata",
        "info": "Info",
        "image": "Immagine",
        "assetDesc": "Descrizione della risorsa",
        "assetConditions": "Condizioni della risorsa",
        "assetName": "Nome della risorsa",
        "to": "A"
};
