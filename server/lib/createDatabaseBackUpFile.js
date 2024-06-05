import fs from "fs";
import pg from "pg";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname + "/./../../.env" });

// init Postgres
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("Connected to postgres db!");
  }
});

// Fetch content from db
const fetchDatabaseContent = async (value) => {
  try {
    console.log("Database table: ", value);
    const result = await client.query(`SELECT * FROM ${value};`);
    return result.rows;
  } catch (err) {
    console.log({ error: `${err})` });
  }
};

// Write Backup file
const writeBackupFile = async () => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Start from 0
    const day = today.getDate();

    const databaseContentAdmincontacts =
      await fetchDatabaseContent("admincontacts");
    const filenameAdmincontact = `${day}-${month}-${year}_spielbetrieb_admincontacts.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameAdmincontact}`,
      JSON.stringify(databaseContentAdmincontacts),
    );

    const databaseContentAdminlinks = await fetchDatabaseContent("adminlinks");
    const filenameAdminlink = `${day}-${month}-${year}_spielbetrieb_adminlinks.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameAdminlink}`,
      JSON.stringify(databaseContentAdminlinks),
    );

    const databaseContentArtists = await fetchDatabaseContent("artists");
    const filenameArtist = `${day}-${month}-${year}_spielbetrieb_artists.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameArtist}`,
      JSON.stringify(databaseContentArtists),
    );

    const databaseContentChats = await fetchDatabaseContent("chats");
    const filenameChats = `${day}-${month}-${year}_spielbetrieb_chats.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameChats}`,
      JSON.stringify(databaseContentChats),
    );

    const databaseContentComments = await fetchDatabaseContent("comments");
    const filenameComments = `${day}-${month}-${year}_spielbetrieb_comments.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameComments}`,
      JSON.stringify(databaseContentComments),
    );

    const databaseContentDarks = await fetchDatabaseContent("darks");
    const filenameDarks = `${day}-${month}-${year}_spielbetrieb_darks.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameDarks}`,
      JSON.stringify(databaseContentDarks),
    );

    const databaseContentEquipments = await fetchDatabaseContent("equipment");
    const filenameEquipments = `${day}-${month}-${year}_spielbetrieb_equipments.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameEquipments}`,
      JSON.stringify(databaseContentEquipments),
    );

    const databaseContentEvents = await fetchDatabaseContent("events");
    const filenameEvents = `${day}-${month}-${year}_spielbetrieb_events.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameEvents}`,
      JSON.stringify(databaseContentEvents),
    );

    const databaseContentEventtypes = await fetchDatabaseContent("eventtypes");
    const filenameEventtypes = `${day}-${month}-${year}_spielbetrieb_eventtypes.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameEventtypes}`,
      JSON.stringify(databaseContentEventtypes),
    );

    const databaseContentGender = await fetchDatabaseContent("genders");
    const filenameGender = `${day}-${month}-${year}_spielbetrieb_genders.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameGender}`,
      JSON.stringify(databaseContentGender),
    );

    const databaseContentLocations = await fetchDatabaseContent("locations");
    const filenameLocations = `${day}-${month}-${year}_spielbetrieb_locations.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameLocations}`,
      JSON.stringify(databaseContentLocations),
    );

    const databaseContentMatches = await fetchDatabaseContent("matches");
    const filenameMatches = `${day}-${month}-${year}_spielbetrieb_matches.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameMatches}`,
      JSON.stringify(databaseContentMatches),
    );

    const databaseContentMessages = await fetchDatabaseContent("messages");
    const filenameMessages = `${day}-${month}-${year}_spielbetrieb_messages.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameMessages}`,
      JSON.stringify(databaseContentMessages),
    );

    const databaseContentNotifications =
      await fetchDatabaseContent("notifications");
    const filenameNotifications = `${day}-${month}-${year}_spielbetrieb_notifications.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameNotifications}`,
      JSON.stringify(databaseContentNotifications),
    );

    const databaseContentOrientations = await fetchDatabaseContent("orientations");
    const filenameOrientations = `${day}-${month}-${year}_spielbetrieb_orientations.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameOrientations}`,
      JSON.stringify(databaseContentOrientations),
    );

    const databaseContentPartners = await fetchDatabaseContent("partners");
    const filenamePartners = `${day}-${month}-${year}_spielbetrieb_partners.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenamePartners}`,
      JSON.stringify(databaseContentPartners),
    );

    const databaseContentPartnertypes =
      await fetchDatabaseContent("partnertypes");
    const filenamePartnertypes = `${day}-${month}-${year}_spielbetrieb_partnertypes.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenamePartnertypes}`,
      JSON.stringify(databaseContentPartnertypes),
    );

    const databaseContentPhotos = await fetchDatabaseContent("photos");
    const filenamePhotos = `${day}-${month}-${year}_spielbetrieb_photos.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenamePhotos}`,
      JSON.stringify(databaseContentPhotos),
    );

    const databaseContentReviews = await fetchDatabaseContent("reviews");
    const filenameReviews = `${day}-${month}-${year}_spielbetrieb_reviews.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameReviews}`,
      JSON.stringify(databaseContentReviews),
    );

    const databaseContentSubs = await fetchDatabaseContent("subscribers");
    const filenameSubs = `${day}-${month}-${year}_spielbetrieb_subscribers.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameSubs}`,
      JSON.stringify(databaseContentSubs),
    );

    const databaseContentTags = await fetchDatabaseContent("tags");
    const filenameTags = `${day}-${month}-${year}_spielbetrieb_tags.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameTags}`,
      JSON.stringify(databaseContentTags),
    );

    const databaseContentTranslations =
      await fetchDatabaseContent("translations");
    const filenameTranslations = `${day}-${month}-${year}_spielbetrieb_translations.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameTranslations}`,
      JSON.stringify(databaseContentTranslations),
    );

    const databaseContentUsers = await fetchDatabaseContent("users");
    const filenameUsers = `${day}-${month}-${year}_spielbetrieb_users.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameUsers}`,
      JSON.stringify(databaseContentUsers),
    );

    const databaseContentUsersfollowers =
      await fetchDatabaseContent("usersfollowers");
    const filenameUsersfollowers = `${day}-${month}-${year}_spielbetrieb_usersfollowers.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameUsersfollowers}`,
      JSON.stringify(databaseContentUsersfollowers),
    );

    const databaseContentUsersfriends =
      await fetchDatabaseContent("usersfriends");
    const filenameUsersfriends = `${day}-${month}-${year}_spielbetrieb_usersfriends.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameUsersfriends}`,
      JSON.stringify(databaseContentUsersfriends),
    );

    const databaseContentUsersfriendrequests = await fetchDatabaseContent(
      "usersfriendrequests",
    );
    const filenameUsersfriendrequests = `${day}-${month}-${year}_spielbetrieb_usersfriendrequests.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameUsersfriendrequests}`,
      JSON.stringify(databaseContentUsersfriendrequests),
    );

    const databaseContentVisitors = await fetchDatabaseContent("visitors");
    const filenameVisitors = `${day}-${month}-${year}_spielbetrieb_visitors.json`;
    fs.writeFileSync(
      `../../../database-backups/spielbetrieb/${filenameVisitors}`,
      JSON.stringify(databaseContentVisitors),
    );

    console.log("Backup Success!");
  } catch (err) {
    console.log({ error: `${err})` });
  }
};

// Write Backup file
const excecuteScript = async () => {
  try {
    await writeBackupFile();
    client.end();
  } catch (err) {
    console.log({ error: `${err})` });
  }
};

// Running the script
excecuteScript();
