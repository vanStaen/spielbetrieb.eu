# Spielbetrieb.eu

spielbetrieb.eu | Portal

## Hosting

### URL setup
- merrier.app (production link)
- spielbetrieb.eu (production link)
- www.merrier.app (production link, will auto redirect to the url witout `www`)
- www.spielbetrieb.eu (production link, will auto redirect to the url witout `www`)


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
4. `shops`: overview of all partners
5. `blog`: management of article for the blog
6. `analytics`: access to the portal's data
7. `translation`: translation of the portal's texts

SQL update script exemple: 
``` UPDATE public.users SET "isAdmin"=true, "adminRoles"='{newsletter,events,users,shops,blog,analytics,translation,tags}' WHERE _id=1; ```

### Table user | Partner

`isPartner` is a flag set to identify a Partner and `partnerRoles` is an Array listing what feature a partner can access from their partner page. Hence only an integer is saved in those column, as an Id to the right data. 

Possible partner roles are:
1. `events`: overview/management of events for the spielplan
1. `sales`: overview/management of tickets for their events
3. `analytics`: special access to some more data regarding their page/events/tickets sale.

### Table Event | Dynamical parameters

Some description parameters (`eventType`, `location` and `tags`) are dynamics, have their own bd_table and can be augmented/managed from the admin page. 

The names of those parameters (save in an extra table) should be an object following this type: `{ en: "def", de: "ghj" }`. In case of new languages coming later, default will then be english. 

## Ressources

Landing page based on this codePen: https://codepen.io/nelsonleite/pen/WwZNVN.
More landing page inspi: https://codepen.io/jeffbredenkamp/pen/jMLepL.
Onepager display page: https://codepen.io/chrisdegroot/pen/NWNWjXr
Nice Overall design: https://getcheex.com/
cool sign up: https://dribbble.com/signup/new\
