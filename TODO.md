# spielbetrieb

- [x] SignUp Form: Small Ad for spielbetrieb? 
- [ ] Admin page (not for partner)
  - [ ] Newsletter management
    - [ ] Sort and filter
      - [ ] per language
      - [ ] per lists
    - [ ] Select and export as a email list
  - [ ] Add/Manage products
  - [ ] Add 'aktuell' articles
  - [ ] Management of the translations from the admin
- [ ] Spielplan
- [ ] Shop
- [ ] Dark Magazin
- [ ] Stop suspended user from login
- [ ] Forbid "+" in an email address
- [ ] Make column tables in admin dynamic (admin can select which one to display)
- [ ] EVENTS PAGE
  - [ ] Endpoint giving all publicEvents for the next 4 weeks 
    - [ ] if no start date, from now
    - [ ] or from a specific start date
  - [ ] SearchEvent enpoint
  - [ ] EventCard: Show max 5 Tags, and a "+x" tags to show all

## Tech debt:

- [ ] Create deployment pipeline with test env
- [ ] Get rid of Axios, and use fetch();
- [ ] BackEnd : Migrate AWS SDK for JavaScript (v3) 
- [ ] FrontEnd : Update all packages
- [ ] Check all z-Index
- [ ] Tracking/Analytics
- [ ] Smooth transition for language and theme menu
- [ ] Get rid of 100vh (for event listner of window.innerHeight)
- [ ] Rerendering (e.g: mnotifications) 
- [ ] List of forbidden usernames
- [ ] List of forbidden words
- [ ] Filter event based on city/geolocation
- [ ] 