# API Documentation

API Deployment -> ~~**://star-tup-api.herokuapp.com/api/**~~ (Heroku is not free anymore. Coming soon on another platform. 🚀)

### API Homepage

- **URL:** .../api
- **Methode:** GET
- **Params:** No params
- **Body:** No body
- **Return:** "Welcome on the StarTup API !"

## Authentication Routes

### Register (Post new user)

- **URL:** .../api/auth/register
- **Methode:** POST
- **Params:** No params
- **Body:** email, password, firstname, lastname, [birthday, motto]
- **Return:** id

Return this new user id.  
Parameters in [square brackets] are all optional.  
Create a new user and automatically bcrypt his password. This password cannot be modified later.

- "email" field must be a valid email (+ unique).
- "birthday" field must be a valid date.

### Login

- **URL:** .../api/auth/login
- **Methode:** POST
- **Params:** No params
- **Body:** email, password
- **Return:** id

Return currently logged in user id.  
Create a jwt authentication cookie for the user who logs in.

### Logout

- **URL:** .../api/auth/logout
- **Methode:** GET
- **Params:** No params
- **Body:** No body
- **Return:** "You have been successfully logged out"

Delete the jwt authentication cookie for the current user.  
Automatically selects the current user by his id contained in his authentication cookie.

## User Routes

### Get all users

- **URL:** .../api/user/all
- **Methode:** GET
- **Params:** No params
- **Body:** No body
- **Return:** id, email, firstname, birthday, motto, createdAt

Provide all users except the currently logged in one.  
Does not provide the password or the last-name.

### Get current user

- **URL:** .../api/user/one
- **Methode:** GET
- **Params:** No params
- **Body:** No body
- **Return:** id, email, firstname, lastname, birthday, motto, createdAt, updatedAt

Return currently logged in user data. Does not provide the password.  
Automatically selects the current user by his id contained in his authentication cookie.

### Edit current user profile

- **URL:** .../api/user/modify
- **Methode:** PUT
- **Params:** No params
- **Body:** [email, firstname, lastname, birthday, motto]
- **Return:** id, email, firstname, lastname, birthday, motto, createdAt, updatedAt

Edit and return uptaded current user profile data without password.  
Parameters in [square brackets] are all optional.  
Automatically selects the current user by his id contained in his authentication cookie.

### Delete current user profile

- **URL:** .../api/user/delete
- **Methode:** DELETE
- **Params:** No params
- **Body:** No body
- **Return:** id, email, firstname, lastname, birthday, motto, createdAt, updatedAt

Delete the jwt authentication cookie for the current user.  
Delete and return deleted current user profile data without password.  
Automatically selects the current user by his id contained in his authentication cookie.  
Deleting a user does not delete their messages and conversations BUT it will then be impossible to associate these messages with the informations of the deleted user.

## Conversations (& Messages) Routes

### Get all conversations

- **URL:** .../api/conv/all
- **Methode:** GET
- **Params:** No params
- **Body:** No body
- **Return:** id, [usersID], messages:[{authorID, text, date},...], createdAt, updatedAt

Return all conversations data of the currently logged in user. Conversations data contains their messages data as well.  
Automatically selects the current user by his id contained in his authentication cookie.  
AuthorID and the two UsersID also provide users email, firstname, lastname, birthday, motto, createdAt.

### Get one conversation

- **URL:** .../api/conv/one/:id
- **Methode:** GET
- **Params:** id
- **Body:** No body
- **Return:** id, [usersID], messages:[{authorID, text, date},...], createdAt, updatedAt

Return this conversation data if the current user have acces to this conversation. Conversations data contains their messages data too.  
Automatically selects the current user by his id contained in his authentication cookie.  
AuthorID and the two UsersID also provide users email, firstname, lastname, birthday, motto, createdAt.

- "id" parameter must be a valid conversation id.

### Post new conversation

- **URL:** .../api/conv/add
- **Methode:** POST
- **Params:** No params
- **Body:** userID
- **Return:** id, [usersID], messages:[], createdAt, updatedAt

Post and return this new conversation data, of course the messages array is empty at the start.  
!! **userID** is the id of the user that does NOT create the conversation. The user that create the conversation is the currently logged in user, and we automatically select his id by his jwt-cookie.

- "userID" field must be a valid id.

### Delete conversation

- **URL:** .../api/conv/delete/:id
- **Methode:** DELETE
- **Params:** id
- **Body:** No body
- **Return:** id, [usersID], messages:[{authorID, text, date},...], createdAt, updatedAt

Delete and return the deleted conversation data if the current user have acces to this conversation.  
Automatically selects the current user by his id contained in his authentication cookie.

- "id" parameter must be a valid conversation id.

### Get one message

- **URL:** .../api/conv/one-msg/:conv_id/:msg_id
- **Methode:** GET
- **Params:** conv_id, msg_id
- **Body:** No body
- **Return:** authorID, text, date

Return this message data if the current user have acces to this conversation.  
Automatically selects the current user by his id contained in his authentication cookie.  
AuthorID also provide user email, firstname, lastname, birthday, motto, createdAt.

- "conv_id" parameter must be a valid conversation id.
- "msg_id" parameter must be a valid message id.

### Add new message (PUT)

- **URL:** .../api/conv/add-msg/:id/
- **Methode:** PUT
- **Params:** id
- **Body:** text
- **Return:** authorID, text, date

Add and return this new message data if the current user have acces to this conversation.  
Automatically set "authorID" by current user id contained in the authentication cookie.

- "id" parameter must be a valid conversation id.

- "text" field is required and must be a string.

### Edit message (PUT)

- **URL:** .../api/conv/modify-msg/:conv_id/:msg_id
- **Methode:** PUT
- **Params:** conv_id, msg_id
- **Body:** text
- **Return:** authorID, text, date

Edit and return this updated message data.  
Cannot edit a message if current user id is not equal to the authorID of the message.  
Automatically selects the current user by his id contained in his authentication cookie.

- "conv_id" parameter must be a valid conversation id.
- "msg_id" parameter must be a valid message id.

- "text" field is required and must be a string.

### Delete message (PUT)

- **URL:** .../api/conv/delete-msg/:conv_id/:msg_id
- **Methode:** PUT
- **Params:** conv_id, msg_id
- **Body:** No body
- **Return:** authorID, text, date

Delete and return the deleted message data.  
Cannot delete a message if current user id is not equal to the authorID of the message.  
Automatically selects the current user by his id contained in his authentication cookie.

- "conv_id" parameter must be a valid conversation id.
- "msg_id" parameter must be a valid message id.
