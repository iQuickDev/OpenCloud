# OpenCloud
The repository contains both the frontend and the backend files, this readme file illustrates how to properly set the server up.

### Building
In order to build the project all you need to do is enter the directory and run `bash build.sh`, the script will update, install and create all the files required by the server to run. This step may be skipped by downloading the current release which already contains the production build.

### Setup
As of now the server uses a `.env` configuration file where you can specify your parameters.
The server requires a MongoDB database on the MongoDB Atlas (locally hosted DBs will be implemented in a future release).
<br>
<br>
<b>MONGO_USERNAME</b> is the variable that will be used as username to log into the database
<br>
<b>MONGO_PASSWORDE</b> is the variable that will be used as password to log into the database
<br>
<b>JWT_PRIVATE_KEY</b> is a string that will be used to make sessions, it works as an encryption key to sign the tokens
<br>
<b>PORT</b> defines on which port your server will be running (defaults to 5555)
<br>
<b>FILES_FOLDER</b> is the directory that will store all the files you upload on the cloud
<br>
<b>NODE_ENV</b> defines if the server is running in development or production mode (it is recommended to leave it untouched)

### Known bugs
<b>[CRITICAL]</b> The embedded terminal allows escaping from the files directory

## Showcase
### The Login (animated)
![login](https://user-images.githubusercontent.com/38632219/165107836-32ff4bf2-48df-4e52-b7b9-7dfb67e6eea1.gif)
### The Dashboard
![dashboard](https://cdn.discordapp.com/attachments/967132141660033094/968148819529306162/unknown.png)
### The Terminal
![terminal](https://cdn.discordapp.com/attachments/967132141660033094/968148360383053864/unknown.png)
