REST API Contacts Application (NodeJS, Express, MongoDB)
This is a bare-bones example of a contacts application providing a REST API to a MongoDB-backed model.

How To Install App
REST API
Contacts Routes
List of contacts
Contact by Id
Create
Update
Update favorite field
Delete
Query Params For Contacts Routes
Users Routes
Registration
Login
Verification
Re-verification
Logout
Current user
Update Subscription
Update Avatar
Install
npm install
Run the app in production mode
npm start
Run the app in development mode
npm run start:dev
Run the linter
npm run lint
Run the linter in fix mode
npm run lint:fix
REST API
The REST API to the example app is described below.

Contacts
Get list of contacts
Request
GET /api/contacts/


Get contact by id
Request
GET /api/contacts/:id


Create contact
Request
POST /api/contacts/


Update contact
Request
PATCH /api/contacts/:id


Update contact favorite field
Request
PATCH /api/contacts/:id/favorite

HTTP/1.1
Host: localhost:7070
Authorization: Bearer


Delete contact
Request
DELETE /api/contacts/:id


Query params for contacts list
Requests
GET /api/contacts?page=1

GET /api/contacts?limit=20

GET /api/contacts?favorite=true

GET /api/contacts?sortBy=name

GET /api/contacts?sortByDesc=name

GET /api/contacts?filter=email


Users
User Registration
Request
POST /api/users/signup


User Login
Request
POST /api/users/login


User Verification
Request
GET /api/users/verify/:verificationToken


User Re-verification
Request
POST /api/users/verify

User Logout
Request
POST /api/users/logout


Get Current User
Request
GET /api/users/current

Update User Subscription
Request
PATCH /api/users/subscription


Update User Avatar
Request
PATCH /api/users/avatars


