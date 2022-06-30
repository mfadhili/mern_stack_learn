//PREPARING THE SERVER 

/configure express
 import it into the express.js file and make it available to the rest of the app.
body-parse     -middleware to handle JSON requests
cookie-parse   -parse and set cookies in request objects
compression    -compress response bodies for all requests
helmet         -secure express apps by setting various http headers
compress       -middleware for cross-origin resource sharing

/starting the server
using express app to listen to incoming requests

/Implementing the user model 
use mongoose to define the necessary user data fields and incoporate business logic eg passwd auth and custom validation

/User schema defination at user.model.js
user schema defination objeacr that will be used to generate new mongoose schema 

/Password for auth
    //Handling password as virtual field
    the password is encrypted as it is received

    //Encryption and authentication
    encrypt logic and salt  generation logic to generate hashed password and salt values for passwd value. describing methods for doing so.

    //Password field validation
    adding validation constraints to the actual passwd string

/mongoose Error Handling
Helper module to parse readable mongoose error messages thrown against schema validations
 add the getErrorMessage helper method to /server/helper/dbErrorHandler.js
 errors that are not Mongoose validator violation have error codes and returns error objects
 will need getUniqueErrorMessage method to parse unique constram=int error object

/Adding user CRUD APIs
Express app exposes endpoints that will allow frontend to perform CRUD operations on documents generated
the auth restictions will work without any auth restrictions
API routes will be declared uisng Express router in server/routes/user.routes.js then mounted on Express appp in server/express.js
    //User routes
    simple user routes using /api/users for GET list of users, POST create a new user . Also /api/users.:userId for GET fetch the user , PUT update a user, DELETE for deleting a user
    Also configure express router to handle the userId parameter by executing userById controller function.
    //User controller
    contains definations of methods called in routes.js. 
    errorhandler will respond to route requests incase of mongoose errors
    uses lodash  when updating existing users with changed values(manipulatoin of array and objects)
        ///creating a new user
        creates user with user json object recieved from post request within req.body. 
        user.save sends it to mongoose db after validation check
        /// Listing all users
        finds all the users from the db and populates the name, email , created and updated fields in resulting userl list.
        returns as an array json object
        /// Loading user by userId
        whenever path has :userId parameter, app executs userbyId controller. It loads it ot express request ibject bfore propagating to next function. 
        /// Reading by userId
        when :userId is in request the userById controller is executed followed by read controller function
        /// updating
        loads user with :userId paramer before update controller function
        /// Deleting
        load user with userId then remove controller is executed

/ Intergrating user auth and protected routes
to prevent access to user operations such profile view and update delete, we will implement signing authentication with JWT to protect and authorise the read, delete and update routes
auth defined from /routes/auth.routes.js
    //Auth routes
    2 auth apis defined using express.Router() and should be called when requests are recieved for these routes (
        '/auth/signin' - POST request to authenticats user with email and password, 
        '/auth/signout' - GET request to clear the cookie conataining a JWT that was set on respose object after signin)
    //Auth controller
    will handle signin and signout routes and provide express-jwt functionality for protectoed API endpoints
        /// signin 
        executes signin controller a POST request at '/auth/signin'
        /// signout
    //Protecting routes with express-jwt
    express jwt imodule is a middleware that validates jwts. two auth controllers: requireSignin and hasAuthorization 
        /// requireSignin
        verifys is the incoming request has a valid jwt in authorisation header using express-jwt
        /// has authorisation
        will check if the authenticated user is the same as the user being updated or deleted before hand
    update read,update and delete routes with hasAuthentication and requireSignin - /user.routes.js

    // Auth error handling for express-jwt
    to catch authrelaed errors thrown by express-jwt, we add the errqr catching code to express app /express.js


    

