//THIS IS THE SOURCE FILE WHERE DEVELOPMENT HAPPENS--NOT THE COMPILED FILE TO DEPLOY.
//FOR THE FILE TO DEPLOY, LOOK IN THE _DIST folder


//this is referenced in the html inside of an async tag
(function bfGDPRcookieScript() {

	(function checkForGDPRconfigObject(){
		//type coersion here intentional
		if(typeof bfGDPR__configObject !== 'undefined' && bfGDPR__configObject.enableGDPRDialog == true){
			initbfGDPRcookieScript();
		}
		else {
			console.log('no config object so donT initialize')
		}
	})();
	//should check for object after domcontentloaded
	//but if we miss the DOMContentLoaded event, this just needs to hurry up and fire

	//document.addEventListener('DOMContentLoaded', checkForGDPRconfigObject);


	function initbfGDPRcookieScript(){

		console.log('there is a bfGDPR__configObject on the page, so i will initialize the script');
		var dialogInitialState;

		if (!document.cookie.split(';').filter((item) => {
				return item.indexOf('GDPRPrivacy') !== -1
			}).length) {
			console.log('no cookie named GDPRPrivacy, so i will put dialog in open state.')
			//even if user is new, cookies specified for deletion by content admin should be deleted
			eraseCookies(bfGDPR__configObject.nonprivacyCookieNames);
			localStorage.clear();
			dialogInitialState = 'dialog--open';
		}
	
	
		//there is a nested if in this else
		else {
			var theCookieName = readCookie('GDPRPrivacy');
			console.log('The cookie "GDPRPrivacy" exists and has the value of ' + theCookieName);
	
			dialogInitialState = 'dialog--closed';


	
			//feature request here to destroy cookies listed by backend
			//reopen every session by default
			if (theCookieName === 'userHasDeclinedCookies') {
				eraseCookies(bfGDPR__configObject.nonprivacyCookieNames);
				localStorage.clear();
				//dialog should ONLY be in open state if there is a new session... 
				//but the cookie presense wonT outlast the session
				//Which would mean there was no cookie value
				//dialogInitialState = 'dialog--open';
			}
	
			else if(theCookieName === 'userHasAcceptedCookies' && bfGDPR__configObject.cookieDialogCloseMode !==null && bfGDPR__configObject.cookieDialogCloseMode === 'hideDialogCompletely') {
				dialogInitialState = 'dialog--hidden';
			}
		}
	
		//this creates a dialog on demand. Cannot reliably use the open attribute across browsers
		// CSS variables would be PERFECT for this task, but for lack of IE support :/
		//keep styles scoped inside ID to prevent side-effects.
		//validate manually for now
		//for syntax highlighting, use THIS: https://marketplace.visualstudio.com/items?itemName=plievone.vscode-template-literal-editor
		var cookieDialogHTMLtemplate = `
			<style>
				#cookieDialog *:empty {display: none;}
				#cookieDialog {display: block;position: fixed; right: 0; bottom: 0; left: 0; width: 100%; height: auto; margin: 0; padding: 0; z-index: 999999; border: none; text-align: left; transform: translateY(100%);transition: .3s all ease;}
				#cookieDialog[data-dialog-state="dialog--open"]{transform: translateY(0);}
				#cookieDialog[data-dialog-state="dialog--hidden"]{display:none;}
				#cookieDialog__wrapperInner{position: relative; padding: 16px;}
				#cookieDialog__toggle {position: absolute;display: inline-block;top: 0;left: 0;font-size: 12px;padding: 12px 16px;transform: translateY(-95%);}
				#cookieDialog__toggle:hover {cursor: pointer;}
				#bfGDPR__cookieDialogHeader {padding-bottom: .5rem;}
				#bfGDPR__cookieDialogText {margin: 0;padding: 0 0 .5rem 0;}
				#cookieDialog .learnMoreLink:hover, #cookieDialog .learnMoreLink:active, #cookieDialog .learnMoreLink:focus  {text-decoration: underline;}
				#cookieDialog__footer {border:none; margin: 0;padding: 16px 0;float: right;}
				#cookieDialog button {border:none;font-family: inherit; font-size: 12px;font-weight: bold; color: #ffffff; padding: 1em;margin:0 0 0 1em;}
				#cookieDialog button:hover, #cookieDialog button:active, #cookieDialog button:focus {cursor: pointer;box-shadow: inset 2px 2px 2px #666666, inset -2px -2px 2px #666666;}
			</style>
			<dialog id="cookieDialog" data-dialog-state="" role="dialog" style="background: ${bfGDPR__configObject.cookieDialogBackgroundColor}; color: ${bfGDPR__configObject.cookieTextColor}";>
				<section id="cookieDialog__wrapperInner">
					<span id="cookieDialog__toggle" style="background-color: ${bfGDPR__configObject.cookieDialogBackgroundColor}">${bfGDPR__configObject.cookieDialogTabText}</span>
					<header id="bfGDPR__cookieDialogHeader"><strong>${bfGDPR__configObject.cookieDialogTitle}</strong></header>
						<p id="bfGDPR__cookieDialogText"><small>${bfGDPR__configObject.cookieDialogText}</small></p>
						<a class="learnMoreLink" rel="nofollow" target="_blank" href="${bfGDPR__configObject.learnMoreLinkLocation_0}" style="color: ${bfGDPR__configObject.learnMoreLinkColor_0}"><small>${bfGDPR__configObject.learnMoreLinkText_0}</small></a> &nbsp;  &nbsp; <a class="learnMoreLink" rel="nofollow" target="_blank" href="${bfGDPR__configObject.learnMoreLinkLocation_1}" style="color: ${bfGDPR__configObject.learnMoreLinkColor_1}"><small>${bfGDPR__configObject.learnMoreLinkText_1}</small></a>
					<footer id="cookieDialog__footer">
						<button id="cookieDeclineButton" type="button" style="background-color: ${bfGDPR__configObject.declineButtonColor}">${bfGDPR__configObject.declineButtonText}</button>
						<button id="cookieAcceptButton" type="button" style="background-color: ${bfGDPR__configObject.acceptButtonColor}">${bfGDPR__configObject.acceptButtonText}</button>
					</footer>
				</section>
			</dialog>`;
	
		//add template to DOM [but only if there is a config object, right?]
		document.body.insertAdjacentHTML('beforeend', cookieDialogHTMLtemplate);
	
		//now you can grab a reference to it so that later you can show and hide it
		var theDialogThatHasBeenAdded = document.getElementById('cookieDialog');
	
		//now show it. Cannot use JS API because of lack of cross browser support
		//using toggle method can be problematic when multiple event targets are in play
	
		(function setDialogInitialState() {
			if (dialogInitialState === 'dialog--open') {
				theDialogThatHasBeenAdded.setAttribute('data-dialog-state', 'dialog--open');
			}
			else if (dialogInitialState === 'dialog--closed') {
				theDialogThatHasBeenAdded.setAttribute('data-dialog-state', 'dialog--closed');
			}
			else if (dialogInitialState === 'dialog--hidden') {
				theDialogThatHasBeenAdded.setAttribute('data-dialog-state', 'dialog--hidden');
			}
		})();

		//add listeners to dialog buttons
		//note that a button might not be there depending on user preference
		(function addListenersBasedOnMode() {
			
		

			let cookieToggleButton = document.getElementById('cookieDialog__toggle');
			let cookieAcceptButton = document.getElementById('cookieAcceptButton');
			let cookieDeclineButton = document.getElementById('cookieDeclineButton');
			
			//all modes get toggle
			cookieToggleButton.addEventListener('click', toggleCookieDialog, false);
			cookieAcceptButton.addEventListener('click', acceptCookiesClickEvent, false);
			cookieDeclineButton.addEventListener('click', declineCookiesClickEvent, false);

		})();

		function toggleCookieDialog(event) {
			//if closed, the close mode exists and the closed mode is hide comptely
			if (theDialogThatHasBeenAdded.getAttribute('data-dialog-state') === 'dialog--open' && bfGDPR__configObject.cookieDialogCloseMode !==null && bfGDPR__configObject.cookieDialogCloseMode === 'hideDialogCompletely') {
				theDialogThatHasBeenAdded.setAttribute('data-dialog-state', 'dialog--hidden');
			}
			else if (theDialogThatHasBeenAdded.getAttribute('data-dialog-state') === 'dialog--open') {
				theDialogThatHasBeenAdded.setAttribute('data-dialog-state', 'dialog--closed');
			}
			else {
				theDialogThatHasBeenAdded.setAttribute('data-dialog-state', 'dialog--open');
			}
		}
	
		function acceptCookiesClickEvent(event) {
			toggleCookieDialog(event);
			createCookie('GDPRPrivacy', 'userHasAcceptedCookies', 30);
			console.log('cookies have been accepted');
			//not implementing the script adding yet. But want to make function work with a list of 0
			//addAnalyticsToDocumentHead(event);

			//if notice only, intercept here
			
			let gpdrModeValue = bfGDPR__configObject.gdprMode;
			//this could be null or undefined so try to anticipate that
			if (gpdrModeValue !== 'noticeOnly'){
				window.location.reload();
			}
		}
	
		//this is commented out for phase 1
		//needs to be edited to accept string trim it and split it
		function addAnalyticsToDocumentHead(event) {
			if (bfGDPR__configObject.arrayOfConditionalScripts.length > -1) {
				bfGDPR__configObject.arrayOfConditionalScripts.map(function(thisScriptToAdd) {
					let scriptElement = document.createElement('script');
					scriptElement.innerHTML = thisScriptToAdd;
					document.head.appendChild(scriptElement);
				});
			}
			console.log('analytics have been added to document head');
		}
	
		function declineCookiesClickEvent(event) {
			//expires either everySession, everyPageLoad or 30days
			toggleCookieDialog(event);
			createCookie('GDPRPrivacy', 'userHasDeclinedCookies');
			console.log('cookies have been declined.');
			eraseCookies(bfGDPR__configObject.nonprivacyCookieNames);
			localStorage.clear();
	
			//window only needs to reload if this is a *changed*
			window.location.reload();
		}

		function getDomainName(hostName){
			return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
		}
	
		//If not specified, the cookie will have the lifetime of a session cookie
		function createCookie(name, value, days, forceDeleteSubAndParentDomains) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			} else var expires = "";
			document.cookie = name + "=" + value + expires + "; path=/";
			if(forceDeleteSubAndParentDomains){
				document.cookie = name + "=" + value + expires + "; domain=" + getDomainName(document.domain) + ";  path=/";
				document.cookie = name + "=" + value + expires + "; domain=." + document.domain + ";  path=/";
			}
		}
	
		function readCookie(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) {
					return c.substring(nameEQ.length, c.length);
				}
			}
			return null;
		}
	
		function eraseCookies(cookieNamesToErase) {
			var trimmedCookieNamesToErase = cookieNamesToErase.replace(/\s+/g, '');
			var arrayOfCookieNamesToErase = trimmedCookieNamesToErase.split(',');
			arrayOfCookieNamesToErase.map(function(thisCookieName) {
				console.log('searching for ' + thisCookieName + ' so I can set it to have expired yesterday');
				createCookie(thisCookieName, '', -1, 'forceDeleteSubAndParentDomains');
			});
		}
	}

	

})();