# Spielbetrieb.eu

spielbetrieb.eu | Portal

## Hosting

### URL setup
- merrier.app: experimental-diplodocus-albup3d9s6q3f940idnqmrp9.herokudns.com
- spielbetrieb.eu: closed-escarpment-0h9y6ilhkbyw9yolc6j7ei9f.herokudns.com
- www.merrier.app: glacial-refuge-ipv2cgp66730mrsv17j4b4i0.herokudns.com
- www.spielbetrieb.eu: octagonal-falls-d7e6dabqmser7ns14l3k8z93.herokudns.com

## Graphic chart

Logo color (dark blue)

- hex: #142436
- rgb: 20 36 54

Logo Inverted (pale beige)

- hex: #e1cfbb
- rgb: 225 207 187

Merrier font: 'DMSerifDisplay' (google font api)
https://fonts.google.com/specimen/DM+Serif+Display

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
``` UPDATE public.users SET "isAdmin"=true, "adminRoles"='{newsletter,events,users,shops,blog,analytics,translation}' WHERE _id=1; ```

### Table user | Partner

`isPartner` is a flag set to identify a Partner and `partnerRoles` is an Array listing what feature a partner can access from their partner page.

Possible partner roles are:
1. `events`: overview/management of events for the spielplan
1. `sales`: overview/management of tickets for their events
3. `analytics`: special access to some more data regarding their page/events/tickets sale.

## Ressources

Landing page based on this codePen: https://codepen.io/nelsonleite/pen/WwZNVN.
More landing page inspi: https://codepen.io/jeffbredenkamp/pen/jMLepL.
Onepager display page: https://codepen.io/chrisdegroot/pen/NWNWjXr
Nice Overall design: https://getcheex.com/
cool sign up: https://dribbble.com/signup/new\
