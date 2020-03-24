/********************************************************************/
ITIS-6177- System Integration
Course History Website
/********************************************************************/


/********************************************************************
Execution instructions
********************************************************************/

1. Install nodejs

2. run npm install

3. nodemon app.js

4. Port used is 8084

5. Hit the URL : http://localhost:8084/ to load the website.

/********************************************************************
Website Description
********************************************************************/

1. The website uses a login feature to add courses.

2. Harcoded user list is stored in useDB.js and is used for login and is a POST request.

3. User clicks on Add the course button, a form is loaded if the user is logged in (GET request) else index page is loaded.

4. User fills in the course form and hits on submit (POST request) and the data gets added to the session and the home page showing a table filled with course details is shown.( GET request)

5. User clicks on Delete button against one of the course details row in table, course data is deleted from the session (DELETE request) and the home page loaded.

6. User clicks on Update button against one of the course details row in table, course form page with this data is loaded. User edits the details and clicks on update button on the form page, the course data is updated (PUT request) and the home page is loaded.

7. User click on toggle button against the active field of one of the course details row in the table (PATCH request), the value gets toggled from 'Yes' to 'No' and vice-versa.

Note : Login validation is done in every call.
