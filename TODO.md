# spielbetrieb

- [ ] SignUp Form: Small Ad for spielbetrieb? 
- [ ] Admin page (not for partner)
  - [ ] Newsletter management
    - [ ] Sort and filter
      - [ ] per language
      - [ ] per lists
    - [ ] Select and export as a email list
  - [ ] Add/Manage products
  - [ ] Add 'aktuell' articles
  - [ ] Management of the translations from the admin
- [ ] Shop
- [ ] Dark Magazin
- [ ] Stop suspended user from login
- [ ] Forbid "+" in an email address
- [ ] Implement forbidden usernames
- [ ] Make column tables in admin dynamic (admin can select which one to display)
- [ ] EVENTS PAGE
  - [ ] EventCard: Show max 5 Tags, and a "+x" tags to show all
  - [ ] Show number of attendee
  - [ ] Show bookmarked
  - [ ] `showInfilter` for Locations/eventtypes/tags
  - [ ] Translate eventpage
  - [ ] Edit function in Event page
  - [ ] Copy/paste address location
  - [ ] Elypsis on event description
  - [ ] Make responsive
  - [ ] Elipisis 'more' translate
- [ ] Line up Model (artist + artwork + link)
  - [ ] Same as location, store some recuring artists, and make them searchable
- [ ] Translate all in form Event
- [ ] Spielplan Filter should be of type OR (and not AND)
- [ ] URL to old event only possible for admin and VA-er, sonst meldung 'not possible'
- [ ] Admin: When validating new tag, if there are not accepted, they should not be shown in the event anymore.
- [ ] EventPage : create nice artist component
- [ ] EventPage : handle secret location (id9)
- [ ] EventForm : Add loader on selects
- [ ] If draft is set to false, create notification for admins (in BE)
- [ ] Form should show that it is only 5 pic max (event uplaod artwork)
- [ ] Partner profile, should not have friends or following, just followers
- [ ] Report broken link feature 

AI bilder
- lexica creart
- starryai
- nerolens
- stabeldiffusiom

## Tech debt:

- [ ] Create deployment pipeline with test env
- [ ] Tracking/Analytics
- [ ] Use List of forbidden usernames
- [ ] Use List of forbidden words
- [ ] Filter event based on city/geolocation
- [ ] Valid all form with enter, cancel with esc
- [ ] Get own google api key
  - [ ] https://developers.google.com/maps/documentation/geocoding/overview
  - [ ] https://developers.google.com/maps/documentation/javascript
- [ ] Create a custom error component (same as loader), with broken heart, as at the moment all are formated differently.
  - eg: You need to be logged in (EventForm)
  - eg: No events found (Spielplan)
  - eg: An error happened! Please restart the process (subscriberverify)
- [ ] Why resized picture are bigger than original (_m and _t)
- [ ] Check if user is online, and react if not (with custom error) (https://react.dev/learn/reusing-logic-with-custom-hooks)
- [ ] clean theme.less (use .less --var)
- [ ] Spielplan: lazy loading with pagination
- [ ] Spielplan filter : only filter from the data set should be shown
- [ ] if user settings === do not display name etc, it should not be sent from the backend (or with empty value)
- [ ] Split 'getProfile' resolver funciton into smaller function
  - [ ] Separate call for pictures
  - [ ] Separate call for events
  - [ ] Separate call for artists
- [ ] Check all postman call