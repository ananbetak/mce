All of the content on this script , including material in downloadable files, is protected by copyright
for anan kassis , id : 036567303.
the content is only for view purpose and allowed only for Almog.

1. I Have created 2 options , using sockets and using http requests.
the difference between them is, the frontend automatically updates when using sockets, while using http
requests, require a refresh from the frontend.

to be able to change between those options, you can go to client/src/App.tsx
by default, sockets is enabled :
communication = 'sockets';
to change to http , only change this variable to : 'http'

2. According to my usb devices were connected to the computer, all were of type 1 , this means, 
they were all devices, and i had no HUBS , so to be able to show you the "BONUS" results, i had to 
create a mock data, where the type of them are 2.
So Yes, i did the bonus part also.
( These information i got from the internet, regarding the types if they are 1 or not ).


To use this script, simply follow these steps :

1. unzip the directory.
2. enter the root directory and do : npm install
3. enter client folder inside the root directory and do : npm install
4  make sure you have yarn on your pc for minimum steps running the script.

if so , on the root folder , do : yarn dev
the server will start, and also the website will start.

if not , you can start the server from the root directory by : node server.js
and in client folder by : npm start


Thank you