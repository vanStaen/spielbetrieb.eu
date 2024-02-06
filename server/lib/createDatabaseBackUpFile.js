const fs = require('fs');
const { Client } = require("pg");
require('dotenv').config({ path: __dirname + '/./../../.env' })


// init Postgres
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification


// Connect to Postgres 
client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('Connected to postgres db!')
    }
})

// Fetch content from db
const fetchDatabaseContent = async (value) => {
    try {
        console.log('Database table: ', value)
        const result = await client.query(`SELECT * FROM ${value};`);
        return result.rows;
    } catch (err) {
        console.log({ error: `${err})`, });
    }
}

// Write Backup file 
const writeBackupFile = async () => {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; //Start from 0
        const day = today.getDate();
        const databaseContentSubs = await fetchDatabaseContent("subscribers");
        filenameSubs = `${day}-${month}-${year}_spielbetrieb_subscribers.json`;
        fs.writeFileSync(`../../../database-backups/spielbetrieb/${filenameSubs}`, JSON.stringify(databaseContentSubs));
        const databaseContentUsers = await fetchDatabaseContent("users");
        filenameUsers = `${day}-${month}-${year}_spielbetrieb_users.json`;
        fs.writeFileSync(`../../../database-backups/spielbetrieb/${filenameUsers}`, JSON.stringify(databaseContentUsers));
        console.log("Backup Success!")
    } catch (err) {
        console.log({ error: `${err})`, });
    }
};

// Write Backup file 
const excecuteScript = async () => {
    try {
        await writeBackupFile();
        client.end();
    } catch (err) {
        console.log({ error: `${err})`, });
    }
};

// Running the script
excecuteScript();




