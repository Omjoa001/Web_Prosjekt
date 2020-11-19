This QuizApp is running on "localhost:3000". In order to reach this app on localhost:3000, it is
necessary to complete the steps described below.

Check that you are in the correct folder/path while using the terminal. The right folder is where
the code is downloaded.

Our quiz is dependent on a database which is already created. To connect to the database and get the
server up and running two files named "config.js" must be created in the following folders:

1. './kazoot/server/src'
2. './kazoot/server/test'

# Insert this database in '.\kazoot\server\src\config.js'

process.env.MYSQL_HOST = 'mysql.stud.ntnu.no'; process.env.MYSQL_USER = 'stud_gruppefire';
process.env.MYSQL_PASSWORD = 'Kazoot'; process.env.MYSQL_DATABASE = 'stud_gruppefire_db';

# Insert this database '.\kazoot\server\test\config.js'

process.env.MYSQL_HOST = 'mysql.stud.ntnu.no'; process.env.MYSQL_USER = 'stud_gruppefire';
process.env.MYSQL_PASSWORD = 'Kazoot'; process.env.MYSQL_DATABASE = 'stud_gruppefire_test';

First, start the server by installing the dependecies through a terminal.

## Start server

```sh
cd server
npm install
npm start
```

The second step is to install the dependencies and bundle the client files through the terminal.

## Bundle client files to be served through server

Install dependencies and bundle client files:

```sh
cd client
npm install
npm start
```

After the two steps above are completed, use a web browser and type in localhost:3000 in the URL.
The QuizApp, Kazoot, will now start running and is playable.

To run tests on the client and server, do the following:

### Run client tests:

```sh
npm test
```

### Run server tests:

```sh
npm test
```
