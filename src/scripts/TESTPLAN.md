## Getting Started ##

- Please review readme file before starting:
https://trello.com/c/t8tot2V
- Don't use incognito mode. That will alter the cookie behavior we're trying to testing.
- If possible, have Dev Tools/code inspector open with the console showing. 
- If you need browserstack credentials, contact Vince.




---

## Info needed for bug reports (with example content) ##



- Browser: Edge
- OS: Windows
- Device: Desktop PC
- Issue: FUNCTIONALITY Dialog never appears
- Screenshot: nameTheFileWhatTheProblemIs.png

- Browser: Opera
- OS: iOS
- Device: iPad
- Issue: STYLE: cookie policy tab obstructs copyright text
- Screenshot: nameTheFileWhatTheProblemIs.png



---

## A. Testing steps for 1st time user ##

---

1 - Open browser and go to a 3rd party site like yahoo [heh]. This step helps because you have an opportunity to open the code inspector/dev tools so it's already open when you visit the page you're testing.

2 -- Open code inspector (dev tools), go to the Application tab (this is for Chrome -- list of cookies in other browser code tools might be in a different place). **You will be capturing these values at each step.**
- GDPR cookie presence [gdpr cookie doesn't exist, or yes there is a gdpr cookie]
- GDPR cookie value (if it exists): [```userHasAcceptedCookies``` or ```userHasDeclinedCookies```] [in code inspectors, sometimes you won't see the value change until after the next time the page loads]
- CMS cookie(s) present or absent
- Prohibited tracking scripts presence: ['has tracker on page' or 'free of tracking scripts'] View Source to check definitively. Look for ```googletag```.
- dialog state ['dialog open' or 'dialog closed']

3 -- After finding the cookie list, clear it to ensure the browser you're testing with is starting fresh. If you're using Browserstack, that browser should be starting fresh regardless. Keep dev tools open

4 -- Visit the page you're testing

5 -- Observe the cookie values in dev tools and compare to these expectated behaviors for **First-time visitors:**
- gdpr cookie doesn't exist
- value: [no value because cookie is absent]
- free of tracking scripts (view source)
- dialog open

6 -- Without closing anything, continue to next testing stage

---

## B. Testing steps for first-time visitor who **DECLINES** cookies  ##

---

1. With dev tools still visible (hopefully you haven't closed anything), hit the DECLINE button.

	**Here's what should happen:**
	- GDPRprivacy cookie dropped with value: ```userHasDeclinedCookies```
	- cookies marked for deletion should be erased.
	- dialog closes
	- page will refresh (WHY?)
	- after refresh
		- the dialog will remain closed
	- after refresh, GDPRprivacy cookie [still] has the value of: ```userHasDeclinedCookies```
	- after refresh, there should [still] be no tracking scripts on the page
	- after refresh, cookies marked for deletion should [still] be gone


 2. Without doing anything else, continue to next testing stageContinue to next testing stage

---

## C. Testing steps for user who changes answer to **ACCEPT**  ##

---

1. Click on "Cookie Policy" tab to re-open dialog. (it should have closed after your previous answer )
2. Hit the ACCEPT button

	**Here's what should happen:**
	- page should refresh
	- after refresh
		- the dialog will be closed
		- GDPRprivacy cookie exists and has the value of: ```userHasAcceptedCookies```
		- That cookie should have an expiration date 30 days away
		- after refresh, there should indeed be some tracking scripts on the page (googletag)


 3. Without doing anything else, continue to next testing stageContinue to next testing stage

---

## D. Testing steps for user who changes answer to **DECLINE**  ##

---


1. Click on "Cookie Policy" tab to re-open dialog. (it should have closed after your previous answer )
2. Hit the DECLINE button

	**Here's what should happen:**
	- GDPRprivacy cookie value changed to ```userHasDeclinedCookies```
	- cookies marked for deletion should be erased.
	- dialog closes
	- page will refresh
	- after refresh, the dialog will remain closed
	- after refresh, GDPRprivacy cookie has the value of: ```userHasDeclinedCookies```
	- after refresh, there should be no tracking scripts on the page
	- after refresh, cookies marked for deletion should be gone

3. Without doing anything else, continue to next testing stageContinue to next testing stage

---

## E. Testing steps for user who, after having already made a cookie choice, navigates to another page on SAME domain  ##

---

1. With dev tools still open, take note of the GDPRprivacy cookie value (if you're coming directly from previous step, it should have the closed value)
2. navigate to another page on the SAME domain

	**Here's what should happen:**
	- dialog should remain closed
	- GDPRprivacy cookie value should persist with its value still ```userHasDeclinedCookies```

3. Without doing anything else, continue to next testing stageContinue to next testing stage


---

## F. Testing steps for user who, after PREVIOUSLY DECLINING cookies, restarts browser to start a new session  ##

---

1. Take these steps
	- Close your browser to end the session.
	- Re-open your browser to start a new session.
	- Visit a 3rd-part site like yahoo [heh]
	- Re-open dev tools
	- Navigate back to the page you're testing

**Here's what should happen:**
- user should be treated as a first-time visitor
- dialog should open
- gdpr cookie doesn't exist
- value: [no value because cookie is absent]
- free of tracking scripts (view source)


2. Without doing anything else, continue to next testing stageContinue to next testing stage



---

## G. Testing steps for user who, after PREVIOUSLY ACCEPTING cookies, restarts browser to start a new session  ##

---

1. You should still be on the site you're testing, and if you're coming straight from the previous testing stage, there's no GDPRprivacy cookie yet.
1. Hit the ACCEPT button
1. Close your browser to end the session.
1. Re-open your browser to start a new session.
1. Visit a 3rd-part site like yahoo [heh]
1. Re-open dev tools
1. Navigate back to the page you're testing

**Here's what should happen:**
- dialog should be closed
- GDPRprivacy cookie should exist
- GDPRprivacy cookie value should be ```userHasAcceptedCookies```
- That cookie should have an expiration date 30 days away
- Tracking scripts should be present on the page



---

## H. Testing steps for first-time user who hits ACCEPT are the same as a user who *changes* answer to accept (testing stage C) ##

---
