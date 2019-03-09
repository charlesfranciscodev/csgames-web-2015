# CSGames 2015 Web Competition

## Start the server and the client
`make`

The client should be acessible at [http://localhost:3007/](http://localhost:3007/).

## Common Commands

Build the images:

`docker-compose -f docker-compose-dev.yml build`

Run the containers:

`docker-compose -f docker-compose-dev.yml up`

Create the database:

`docker-compose -f docker-compose-dev.yml exec server python manage.py recreate_db`

Seed the database:

`docker-compose -f docker-compose-dev.yml exec server python manage.py seed_db`

## Other Commands

To stop the containers:

`docker-compose -f docker-compose-dev.yml stop`

Remove images:

`docker rmi $(docker images -q)`

## Postgres
Want to access the database via psql?

`docker-compose -f docker-compose-dev.yml exec database psql -U postgres`

## Client
Connect to the client

`docker-compose -f docker-compose-dev.yml exec client /bin/sh`

## Completed Tasks

### Authentication (bonus +2 points)
-  Be able to create a new account (with the account creation page)
(+2 points)
-  Be able to log in with an account (+2 points)
-  Be able to log out (+2 points)
-  Password security (database)
   -  High security hash: 2 points

### User Profile
-  Have a profile with following informations (+2 points)
   -  name
   -  email
   -  birthdate
   -  gender
-  Interested in (+1 point)
-  Description (+1 point)
-  Tags (+2 points)
-  picture

## API Routes

**POST** `/login`

Logs the user in the system if the username and password are valid.

Request
```json
{
  "email" : "WonderfulProudKangaroo@mail.com",
  "password": "Password_1"
}
```

Response
```json
{
  "userId": "1",
  "email": "WonderfulProudKangaroo@mail.com",
  "name": "WonderfulProudKangaroo",
  "gender": "M",
  "interestedIn": "F",
  "description": "Integer condimentum ligula vel pellentesque dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi congue consectetur egestas. Mauris rhoncus hendrerit dignissim. Aenean condimentum dui convallis lorem egestas tempor. Etiam odio ipsum, commodo at posuere a, facilisis ut velit. Praesent tortor est, varius sed facilisis eget, accumsan ac est. Vestibulum ullamcorper mauris sit amet elit laoreet, vitae venenatis velit molestie. Suspendisse id laoreet mi. Pellentesque non ex et justo tempus pellentesque id nec dolor. Integer iaculis felis erat. Praesent tincidunt in arcu eu aliquam. Ut vel lacus at dolor consequat consectetur eget quis libero. Aliquam et fringilla dolor, in aliquet sem. Vivamus euismod condimentum sagittis.",
  "pictureURL": "https://randomuser.me/api/portraits/men/54.jpg",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTQyNDQyMjAsImlhdCI6MTU1MTY1MjIyMCwic3ViIjoiY2Y0NGJmNWMtMGNjYS00NWYxLWE0N2EtYTEzYjZjODU5MDU0In0.cAkWQE9bVYeRXcgNH9MFIas0VYqaLPVTcec5IYpBtsk"
}
```
200 | when the authentication is successful

401 | when the email or password is invalid

---

**POST** `/register`

Creates a new user account in the system.

Request
```json
{
  "email": "ethel.moore82@example.com",
  "name": "Ethel Moore",
  "birthdate": "2000-01-01",
  "gender": "F",
  "interestedIn": "M",
  "description": "Integer condimentum ligula vel pellentesque dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi congue consectetur egestas. Mauris rhoncus hendrerit dignissim. Aenean condimentum dui convallis lorem egestas tempor. Etiam odio ipsum, commodo at posuere a, facilisis ut velit. Praesent tortor est, varius sed facilisis eget, accumsan ac est. Vestibulum ullamcorper mauris sit amet elit laoreet, vitae venenatis velit molestie. Suspendisse id laoreet mi. Pellentesque non ex et justo tempus pellentesque id nec dolor. Integer iaculis felis erat. Praesent tincidunt in arcu eu aliquam. Ut vel lacus at dolor consequat consectetur eget quis libero. Aliquam et fringilla dolor, in aliquet sem. Vivamus euismod condimentum sagittis.",
  "pictureURL": "https://randomuser.me/api/portraits/women/59.jpg",
  "password": "Password_1",
  "tags": [1,2]
}
```

Response

200 | when the account creation is successful

400 | when fields are missing

409 | when the email already exists

---

**POST** `/logout`

Logs out the currently logged in user.

Response
```json
{
  "message": "Logout successful"
}
```
200 | Logout successful

## Make sure you have these ready before starting
* Bash Shell
* [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)
* [Git](https://git-scm.com/) + [GitHub](https://github.com/) Account
* [Postman](https://www.getpostman.com/) (optional)

## References
* [csgames15-competitions](https://github.com/dozoisch/csgames15-competitions)
* [Microservices with Docker, Flask, and React](https://github.com/testdrivenio/testdriven-app-2.4)
* [Flask](http://flask.pocoo.org/)
* [React](https://reactjs.org/)
