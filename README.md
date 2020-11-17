
This QuizApp is running on "localserver:3000"
In order to reach this QuizApp on the localserver:3000, it is necessary to complete the steps described below.

It is necessary to be in the right folder/path while using the terminal. The right folder is where the code is downloaded. 

Since our quiz is dependent on a database, which is already created. To make it work it must be created two files named "config.js".
This file must be created in following path:

1) '.\kazoot\server\src'
2) '.\kazoot\server\test'

# Insert this database in '.\kazoot\server\src\config.js'

process.env.MYSQL_HOST = 'mysql.stud.ntnu.no';
process.env.MYSQL_USER = 'stud_gruppefire';
process.env.MYSQL_PASSWORD = 'Kazoot';
process.env.MYSQL_DATABASE = 'stud_gruppefire_db'; 

# Insert this database  '.\kazoot\server\test\config.js'

process.env.MYSQL_HOST = 'mysql.stud.ntnu.no';
process.env.MYSQL_USER = 'stud_gruppefire';
process.env.MYSQL_PASSWORD = 'Kazoot';
process.env.MYSQL_DATABASE = 'stud_gruppefire_test';


First, start the server by installing the dependecies by using a terminal. 

## Start server

```sh
cd server
npm install
npm start
```

The second step is to install the dependencies and bundle the client files. 
This step is also done by using a terminal.

## Bundle client files to be served through server

Install dependencies and bundle client files:

```sh
cd client
npm install
npm start
```

After the two steps above are completed, use a webbrowser and type in localhost:3000 in the URL. 
The QuizApp, Kazoot, will now start running and is playable.


If interested to run tests on client and server, do following: 

### Run client tests:

```sh
npm test
```

### Run server tests:

```sh
npm test
```



