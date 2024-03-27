# face-detection-server
## Backend file
**The backend** is express.js app coordinated by `server.js` file. server.js file initiates the backend server and hold endpoints. ALL of secure information is in `.env` file such as PAT, USERID which I'm using gitignore so no one can access that informaiton except myself. The endpoints for managing ImageRecognition, faceDetection and increment rank is in `image.js` file, for signin is in `signin.js` file, for register is in `register.js`.
file. `database.js` is where I connect to render's database.
