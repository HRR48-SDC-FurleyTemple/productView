# productView
SETUP:
1: NPM install dependencies
2: Seed database: npm run seed:db -> should result in 100 records inserted (MONGO DB related)
3: start server: npm start (MONGO DB related)
4: Build client pack: npm run build

POSTGRES SETUP:
DISCLAIMER - Postgres must be installed in your system for the following steps. Thank you.
5: inside the database directory please create a file called "credentials.js"
   inside credentials.js we will create a variable called initial and export the module.
   initial should include your username, host, password, and port. Please see example below:
    const initial = {
      user: 'username',
      host: 'localhost',
      password: 'password',
      port: 5432,
    }

    module.exports.initial = initial;
6: npm run dataGen
  Please wait til you see the following: finished data generation: X seconds
7: npm run createPG
  Please wait til you see the following messages: Database successfully created!
  Table successfully created!
8: npm run seedPG
  Please wait til you see the following: finished seeding Postgres database: X seconds
9: npm run bigServer
  Will run server servicing the data from postgres Database - Port: 3050

