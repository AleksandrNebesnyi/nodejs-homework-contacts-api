## GoIT Node.js Course Template Homework

- При сдаче домашней работы есть ссылка на PR
- JS-код чистый и понятный, для форматирования используется Prettier

### Команды:

- `npm start` старт сервера в режиме production
- `npm run start:dev` старт сервера в режиме разработки (development)
- `npm run lint` запустить выполнение проверки кода с eslint, необходимо
  выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` та же проверка линтера, но с автоматическими исправлениями
  простых ошибок

This is a example of a contacts application providing a REST API to a
MongoDB-backed model.

Contacts

Get list of contacts Request GET /api/contacts/

HTTP/1.1 Host: localhost:7070 Authorization: Bearer Response HTTP/1.1 200 OK
Status: success Content-Type: application/json

Body: "contacts": [] Get contact by id Request GET /api/contacts/:id

HTTP/1.1 Host: localhost:7070 Authorization: Bearer Response HTTP/1.1 200 OK
Status: success Content-Type: application/json

Body: "contact": { "favorite": boolean, "\_id": "", "name": "", "email": "",
"phone": "", "owner": { } } Create contact Request POST /api/contacts/

HTTP/1.1 Host: localhost:7070 Authorization: Bearer

Body: { "name": "", "email": "", "phone": "" } Response HTTP/1.1 201 OK Status:
success Content-Type: application/json

Body: "contact": { "favorite": boolean, "\_id": "", "name": "", "email": "",
"phone": "", "owner": "", "\_\_v": number } Update contact Request PATCH
/api/contacts/:id

HTTP/1.1 Host: localhost:7070 Authorization: Bearer

Body: { "favorite": boolean, "name": "", "email": "", "phone": "" } Response
HTTP/1.1 200 OK Status: success Content-Type: application/json

Body: "contact": { "favorite": boolean, "\_id": "", "name": "", "email": "",
"phone": "", "owner": { } } Update contact favorite field Request PATCH
/api/contacts/:id/favorite

HTTP/1.1 Host: localhost:7070 Authorization: Bearer

Body: { "favorite": boolean } Response HTTP/1.1 200 OK Status: success
Content-Type: application/json

Body: "contact": { "favorite": boolean, "\_id": "", "name": "", "email": "",
"phone": "", "owner": { } } Delete contact Request DELETE /api/contacts/:id

HTTP/1.1 Host: localhost:7070 Authorization: Bearer Response HTTP/1.1 200 OK
Status: contact deleted Content-Type: application/json Query params for contacts
list Requests GET /api/contacts?page=1

GET /api/contacts?limit=20

GET /api/contacts?favorite=true

GET /api/contacts?sortBy=name

GET /api/contacts?sortByDesc=name

GET /api/contacts?filter=email

HTTP/1.1 Host: localhost:7070 Authorization: Bearer Response HTTP/1.1 200 OK
Content-Type: application/json Users User Registration Request POST
/api/users/signup

HTTP/1.1 Host: localhost:7070

Body: { "email": "", "subscription": "" } Response HTTP/1.1 201 Created
Content-Type: application/json

Body: { "user": { "email": "", "subscription": "" } } User Login Request POST
/api/users/login

HTTP/1.1 Host: localhost:7070

Body: { "email": "", "subscription": "" } Response HTTP/1.1 200 OK Content-Type:
application/json

Body: { "token": "", "user": { "email": "", "subscription": "" } } User Logout
Request POST /api/users/logout

HTTP/1.1 Host: localhost:7070 Authorization: Bearer Response HTTP/1.1 204 No
Content Get Current User Request GET /api/users/current

HTTP/1.1 Host: localhost:7070 Authorization: Bearer Response HTTP/1.1 200 OK
Content-Type: application/json

Body: { "email": "", "subscription": "" } Update User Subscription Request PATCH
/api/users/subscription

HTTP/1.1 Host: localhost:7070 Authorization: Bearer

Body: { "subscription": ['starter', 'pro', 'business'], } Response HTTP/1.1 200
OK Status: updated Content-Type: application/json

Body: { "user": { "email": "", "subscription": "" } } Update User Avatar Request
PATCH /api/users/avatars

HTTP/1.1 Host: localhost:7070 Content-Type: multipart/form-data Authorization:
Bearer

Body: { "avatar": image } Response HTTP/1.1 200 OK Status: updated Content-Type:
application/json

Body: { "avatarURL": link to image }
