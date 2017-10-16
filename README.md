# swarnlata-lab1

To run the app locally:

git clone https://github.com/swkumari26/cmpe273-lab1.git

Client1

cd lab1-client1
npm install
npm start

open http://localhost:3000

Server1

cd lab1-server1
npm install
npm start

server for client1 is listening on port 3001
if port changes then update port number in lab1-client1/src/actions/index.js file

Client2

cd lab1-client2
npm install
npm start

open http://localhost:3000

Server2

cd lab1-server2
npm install
npm start

change the mysql server user and password in lab1-server2/routes/databaseOperation.js file

server for client2 is listening on port 3001
if port changes then update port number in lab1-client2/src/actions/index.js

Mysql dump has 2 users created with password for swkumari@gmail.com as 'swarnlata' and for kumar@gmail.com as 'kumar'