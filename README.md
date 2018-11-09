# Custom Cookie Manager 🍪🍪🍪 #




## 🍪 Purpose ##

Unlike other cookie compliance scripts, this cookie manager is "opt-in" -- meaning a user must choose "Accept Cookies" before tracking scripts will be written to the page. 

Most other solutions only provide a "I understand" or "OK" button, rather than offering the user an explicit Accept or Decline choice.

Content administrators can configure the Cookie Manager through a CMS.

---

## 🍪 Features ##
- Content administrators can configure functionality and styling through the CMS
- Opt-in nature
- Notice-only mode (gdprMode: noticeOnly)
- Performant (concise code, no dependencies)
- *[Phase 2 roadmap]*

---

## 🍪 Code Notes ##

### HTML ###
- The script generates the HTML, although this approach could be re-examined. It keeps the display logic on the frontend.
- The semantic ```<dialog>``` element is used, with the attribute of ```open``` being used to display it. **[note may 7: temporarily changing to div element to test with ad blockers]**


### CSS ###
- This script leverages CSS-in-JS to create a single-file component.
- The script generates a ```<style>``` tag that includes a handful of minimal base styles
- The additional styles configured by content admin in the CMS are inlined on elements
- Typographic styles inherit from site's main stylesheet, and button styles can too if done properly


### JavaScript ###
- Expects an [on-page variable containing a JSON object](#configSection)
- Portable, single-file component contains template and styles
- No dependencies (like JQuery)
- Pure ES6+
- Use of template literals makes source code very legible
- Performant, non-blocking script
- Transpiled with Babel for IE11 compatability
- Uglified for production (compresses and obfuscates)

---


## 🍪 How to install ##

- Install yarn (yes, you can use npm, but the cool kids use Yarn)
- Node.js 9+
- Webpack 4
- pure Javascript with NO dependencies (such as JQuery)


## 🍪 How to develop and compile ##
- To watch source file and run a dev server: ```yarn dev``` 
- To build compressed file for production: ```yarn build```

---

<a id="configSection"></a>

---

## 🍪 Configuration Options ##


| Option        | Type          | Example  |
| ------------- | ------------- | -----   |
| enableGDPRDialog | boolean | true |
| gdprMode | text | optIn |
| cookieDialogCloseMode | text | tabRemainsVisible |
| cookieDialogBackgroundColor | hexValue | #333333 |
| cookieDialogTabText | text | Cookie Policy |
| cookieDialogTitle | text | This site uses cookies, your title might be longer |
| cookieDialogText | text |  Cookies are used on this site because X, Y, Z. Some account features involving logins may not function correctly if cookies are declined. |
| cookieTextColor | hexValue | #333333 |
| learnMoreLinkText_0 | text | Learn more about X |
| learnMoreLinkText_1 | text | Learn more about Y |
| learnMoreLinkColor_0 | hexValue | #ABABAB |
| learnMoreLinkColor_1 | hexValue | #C3D2E1 |
| learnMoreLinkLocation_0 | url | https://google.com |
| learnMoreLinkLocation_1 | url | https://yahoo.com |
| acceptButtonText | text | Accept Cookies |
| declineButtonText | text | Decline Cookies |
| acceptButtonColor | hexValue | #0a960a |
| declineButtonColor | hexValue | #960a0a |
| nonPrivacyCookieNames | CSV of names of cookies to erase on Decline. | EktGUID, ecm |
| arrayOfConditionalScripts [**Phase 2**] | feature scheduled for **Phase 2** | array of scripts without script tags [**Phase 2**] |
| afterAcceptWhenToOpenDialogAgain [**Phase 2**] | feature scheduled for **Phase 2** | 30days [**Phase 2**] |
| afterDeclineWhenToOpenDialogAgain [**Phase 2**] | feature scheduled for **Phase 2**| onEveryNewSession [**Phase 2**]|


## 🍪 How to implement on a template or page ##

1) feed the script a configuation object written to the page as JSON assigned to a variable called ```bfGDPR__configObject```. Here is an example:

```
var bfGDPR__configObject = {
	"enableGDPRDialog" : true,
	"gdprMode": "optIn",
	"cookieDialogCloseMode":"hideDialogCompletely", 
	"cookieDialogBackgroundColor":"#666666",
	"cookieDialogTabText": "Cookie Policy",
	"cookieDialogTitle":"Optional Title (frontend hides it if empty)",
	"cookieDialogText":"This site uses cookies: This text can be set in CMS and written to the page as a (carefully namespaced) global variable",
	"cookieTextColor":"#FFFFFF",
	"learnMoreLinkText_0": "Learn More",
	"learnMoreLinkText_1": "Learn even more",
	"learnMoreLinkColor_0":"#22BB88",
	"learnMoreLinkColor_1":"#223F6D",
	"learnMoreLinkLocation_0":"https://google.com",
	"learnMoreLinkLocation_1":"https://yahoo.com",
	"acceptButtonText":"Accept Cookies",
	"declineButtonText":"Decline Cookies",
	"acceptButtonColor":"#123456",
	"declineButtonColor":"#654321",
	"nonprivacyCookieNames":"EktGUID, ecm",
	"arrayOfConditionalScripts":"",
	"afterAcceptWhenToOpenDialogAgain":"30days",
	"afterDeclineWhenToOpenDialogAgain":"onEveryNewPageLoad"
};
```

1) reference the script, with the ```async``` attribute, at the very bottom of the document, just before the closing <body> tag.


```
    <script async src="js/vendor/bfGDPRcookie.js"></script>
</body>
```


3) The dialog should appear at the bottom of the screen. If not, check the console for errors.



---

## 🍪 User Types & Workflows ##
[notes in progress]


---

### 🍪 Browser Support ###
- Chrome: Windows, MacOS, Android, iOS
- Safari: MacOS, iOS
- Firefox: Windows, MacOS
- Edge: Windows
- IE11: Windows
- opera?


---


### 🍪 Authors ###

*Jeremy Bates*