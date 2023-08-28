# Recruitment App
This is a simple app that helps the HR department tract all of the application of the company.
where the user or admin registers and login. and do the creation of applicants, update the status and details of the applicants, delete (CRUD), view profile and logout. 

install : npm install
To the the project:
FRONTEND : client under client directory =  run > npm start
BACKEND : server under server directory =  run > npm start

## Working with the Project
```
REACT_APP_SERVER_DOMAIN='<server_domain>' # example 'http://localhost:8080'
```
## NOTE: Upon the Registration: 
The application is verifying the email and username. Please input the value correctly to register successfully.

After the login you will view the list of applicants / or no data. Please create an applicate by clicking the button "create Applicant"


After that create a file in the Server Folder with the name config.js and put the below code inside it.
Upon inputting the value of status make sure you follow the correct format to view the status nicely. It is for further development too.

add a "config.js" file in server folder upon running the backend

config.js
```
export default{
    JWT: "LOVE YOU",
    EMAIL:"jeromeburce44@gmail.com",
    PASSWORD:"Merry@j0c",
    REACT_APP_SERVER_DOMAIN : 'http://localhost:8080',
    ATLAS_URI:"mongodb+srv://admin:admin123@cluster0.bux5k27.mongodb.net/?retryWrites=true&w=majority"
}
```

install the following:

Frontend:
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

npm i zustand
npm install axios --save
npm i jsonwebtoken      
npm install mongodb    
npm i bcrypt  

upon running the backend install this:
npm i express cors mongoose mongodb-memory-server multer nodemon


