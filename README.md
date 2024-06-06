# Spielbetrieb.eu

spielbetrieb.eu | Portal

## Hosting

### URL setup
- merrier.app (production link)
- spielbetrieb.eu (production link)
- spielbetrieb.info (production link to b2b portal)
- www.merrier.app (will auto redirect to the url witout `www`)
- www.spielbetrieb.eu (will auto redirect to the url witout `www`)
- www.spielbetrieb.info (will auto redirect to the url witout `www`) 


## Graphic chart

The file `theme.less` (folder `styles`) contain all relevant style classes for the two themes. Some antd custom classes for some used compoenent are  in the same folder under the file `customAnt.less`.

### Light Theme
Logo dark blue, background Beige/Salmon
Main color : Dark Blue (hex: #142436, rgb: 20, 36, 54)
Secondary color : Green (hex: #104955, rgb: 16, 73, 85)

### Dark Theme
Logo (inverted) pale beige, background DarkBlue/Green
Main color : Pale Beige (hex: #e1cfbb, rgb: 225, 207, 187)
Secondary color : Salmon (#f8b1a7, rgb: 248, 177, 167)

### Fonts
- Spielbetrieb font: Roboto. Never in Italic.
- Merrier font: 'DMSerifDisplay' (google font api)
http


## Feature Flag 

Some feature in devlopment may be hidden under a feature flag.
In order to see the new feature, you have to add a cookie in your local browser. 

To do so: 
- Open the code inspector in Chrome
- Choose the tab 'Application'
- In the left menu, pick 'Local Storage' > 'http://localhost:3001' (or whatever Url the page is hosted under)
- In the table on the right side, add a new line with the corresponding key (see file `featureFlag.js`` to know which one), to true (as Value)
- Refresh the page. You should now see the relevant features


## Data Structure

### Table user | Admins

`isAdmin` is a flag set to identify an admin and `adminRoles` is an Array listing what sections an admin can access in the administration interface. Both values have to be set up manually directly in the database. 

Possible admin roles are:
1. `newsletter`: manage the list of subscribers to our lists
2. `events`: overview/management of all events for the splieplan
3. `users`: overview of registered users
4. `partners`: overview of all partners
5. `content`: management of article for the blog and the dark issues 
6. `analytics`: access to the portal's data
7. `translation`: translation of the portal's texts
8. `data`: data used within the site (such as categor   ies or tags)
9. `ressources`: some internal ressources for the admins only

SQL update script exemple: 
``` UPDATE public.users SET "isAdmin"=true, "adminRoles"='{newsletter,events,users,partners,content,analytics,translation,data,ressources,bugs}' WHERE _id=1; ```

### Table user | Partner

`isPartner` is a flag set to identify a Partner and `partnerRoles` is an Array listing what feature a partner can access from their partner page. Hence only an integer is saved in those column, as an Id to the right data. 

Possible partner roles are:
1. `events`: overview/management of events for the spielplan
2. `tickets`: overview/management of tickets for their events
3. `sales`: overview/management of shop listings for their store
4. `analytics`: special access to some more data regarding their page/events/tickets sale.

### Table Event | Dynamical parameters

#### tags and types

Some description parameters (`eventtype`, `location` and `tags`) are dynamics, have their own bd_table and can be augmented/managed from the admin page. 

The names of those parameters (save in an extra table) should be an object following this type: `{ "en": "english", "de": "deutsch" }`. In case of new languages coming later, default will then be english. 

### Table Notifications

The notifications have a specific type, which influence how they are rendered in the frontend. Those types are as follow:

0. Fallback
1. New Friend request
11. (your sent) Friend requested accepted
12. (your sent) Friend requested declined
2. New Follower
3. New Message
41. (an) Event invite received 
42. (your) Event Invite accepted 
43. (your) Event Invite refused
51. New Event from followed partner 
52. New Shop article from followed partner
61. New Avatar from friends/followed
62. New picture from friends/followed
71. New blog article
72. New Dark issue
9. Spielbetrieb anouncement
91. Event waiting for review // for admin with role event
92. New Bug reported // for admin with role bug


#### Address and Geocoding

We use the Geocoding API from google to get coordinates out of addresses, and vice-versa: https://developers.google.com/maps/documentation/geocoding/overview

#### Sorting

Event are sorted on several levels: The main one is the day time (DD-MM-YYYY). Within a day, the partner events are shown first (isPartnerEvent), then the even with the most guest (attendees), then the start time (HH:mm), and finally alphabetically (Event name).

## Ressources

### Host

The app is hosted by Heroku (Salesforce Platform) under the name `spielbetrieb`.

#### Howto deploy

To upload to heroku, use the CLI tool. To install it go `brew tap heroku/brew && brew install heroku` in the terminal. You can check you have it using `heroku --version`. You will need Git too (`git --version`)</br>

Then, for existing repositories, simply add the heroku remote to git with `heroku git:remote -a rewaer`.

Use `heroku login` to log to your account. Then `git push heroku master`, you can deploy the app. `heroku open` to get the app opened in your browser.

Use the custom script `npm run deploy` to run all of the above commands at once.

#### Heroku Logs

To access heroku's log, run `heroku logs --tail` in the terminal.
The log's saved by the index.js page can be seen at https://rewaer.herokuapp.com/log


#### Heroku CLI slow?

Delete the .netrc file in the home folder (and maybe restart your IDE).
`cmd+shift+point` to show hidden files on mac.

### Email API : SendGrid via Heroku 

Mail are send voia the SendGrid Api. To integerate the API into node,the package `@sendgrid/mail` is used. See its use in the Mail Service (API/Service). More in the documentation under https://app.sendgrid.com/

Some detail about the pricing and availibility of Sendgrid: https://elements.heroku.com/addons/sendgrid (free up to 12 000 email per month).

Track email sent: https://app.sendgrid.com/email_activity

### AWS | s3

Our images are saved on differents AWS S3 bucket. 
All images get stored in 3 version. Original, Medium (800px) and Thumb (180px);


### Google Api

Project name: `spielbetrieb`
Project number: `68991850457`
Project id: `spielbetrieb`

#### Google Maps Static API

// TODO

### Design ideas

Landing page based on this codePen: https://codepen.io/nelsonleite/pen/WwZNVN.
More landing page inspi: https://codepen.io/jeffbredenkamp/pen/jMLepL.
Onepager display page: https://codepen.io/chrisdegroot/pen/NWNWjXr
Nice Overall design: https://getcheex.com/
cool sign up: https://dribbble.com/signup/new\
scroll animations: https://css-tricks.com/books/greatest-css-tricks/scroll-animation/

### TechTuto

esLint + prettier for React: https://www.linkedin.com/pulse/config-eslint-prettier-vs-code-react-js-anurag-kumar
S3 bucket policies and Node server: https://medium.com/how-to-react/how-to-upload-files-on-an-s3-bucket-in-react-js-97a3ccd519d1
Implementation of the s3 endpoints: https://www.youtube.com/watch?v=vVBqEYNXxy8