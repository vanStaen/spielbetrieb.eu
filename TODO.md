# spielbetrieb

- [ ] Login / Sign Up
  - [ ] Login Page
    - [x] Login Form
    - [x] SignUp Form
      - [ ] Small Ad for spielbetrieb? 
  - [x] Login Journey (incl. validation)
- [ ] Translate all menu elements
- [ ] Admin page (not for partner)
  - [ ] Newsletter management
    - [ ] Sort and filter
      - [ ] per language
      - [ ] per lists
    - [ ] Select and export as a email list
  - [ ] Add/Manage events
  - [ ] Add/Manage products
  - [ ] Add 'aktuell' articles
  - [ ] Admin can update user to partner
      - [ ] Create resolver 
  - [ ] Management of the translations from the admin
- [ ] Home page
  - [ ] Link to spielplan / shop
  - [ ] Spielbwetrieb Aktuell
- [ ] Spielplan
- [ ] Shop
- [ ] Dark Magazin

## Tech debt:

- [ ] Create deployment pipeline with test env
- [ ] Get rid of Axios, and use fetch();
- [ ] BackEnd : Migrate AWS SDK for JavaScript (v3) 
- [ ] FrontEnd : Update all packages
- [ ] Check all z-Index
- [ ] Tracking/Analytics
- [ ] Smooth transition for language and theme menu (opacity on out)
- [ ] Fix db_backup script
- [ ] Get rid of 100vh (for event listner of window.innerHeight)
- [ ] 404 : 
  - [ ] Schickt automatisch ein email mit Url
  - [ ] Deutlicher zurück feile. 


## Done :

- [x] Boilerplate React init
- [x] Landing page
  - [x] Spielbetrieb logo
  - [x] Spielbetrieb logo
  - [x] Merrier Mobile view
    - [x] Merrier Logo
  - [x] Colors charts
    - [x] Light Theme
    - [x] Dark Theme
    - [x] Theme based on central CSS class
  - [x] Accept Cookie
    - [x] Modal with button
    - [x] Mobx Store
    - [x] Universal Cookie
    - [x] Store:
      - [x] If Cookie allowed
      - [x] Last theme used
      - [x] Last Language used
- [x] Boilerplate up backend on Heroku
  - [x] Based on merrier Backend
- [x] Newsletter
  - [x] UI form
  - [x] PostGres Database
  - [x] API endpoint (graphql)
  - [x] Validate email
  - [x] Handle errors
  - [ ] ~Add old subscribers to db~
- [x] Use Antd notification
- [x] Fix cors erros between domains
- [x] Create 404
- [x] Feature flags
- [x] Menu
  - [x] Settings
  - [x] Admin
  - [x] Logout
- [x] Format Theme/Language drop down like menu
- [x] Spinner on menu-load should have right color
- [x] Header
  - [ ] ~Spielbetrieb (main page)~
  - [x] Partner
  - [x] Dark Magazin
  - [x] Shop
  - [x] Spielplan