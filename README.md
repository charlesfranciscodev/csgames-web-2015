# CSGames 2015 Web Competition

Online Dating Platform for Zombies.

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
   -  age
   -  gender
-  Interested in (+1 point)
-  Description (+1 point)
-  Tags (+2 points)
-  picture

### Candidate list (bonus +2 points)
-  See their names and other relevant infos (+3 pints)
-  See only the candidates of the gender I’m interested in (+1 point)
-  See only the candidates interested in my gender (+1 point)

### Advanced candidate list
-  Filters:
   -  By age range (+2 points)
   -  By tags (+2 points)
-  Sorting by name

### Bonus Functionalities
-  **Bonus**
-  Mobile Friendly (+2 points)
-  Beautiful Icons (fontawesome) (+1 point)
-  Custom font (not native in browser) (+1 point)

###  Ratings (bonus +3 points)
-  Rate someone (1 to 5 stars etc) on his profile (+3 points)
-  See my rating on my profile (+1 point)

## TODO

### Messaging (bonus +2 points)
-  Send an in-app message to other candidates (+3 points)
-  See the received messages (+2 points)
-  See the sent messages (+2 points)
-  See the message thread (+2 points)

###  Dates (bonus +4 points)
-  Ask someone on a date. Must contain date, place, message (+2 points)
   -  Send the date from the persone profile (+1 point)
   -  Send the date from messaging (+1 point)
-  Accept a date (+2 points)
-  See the dates I’ve sent and their status (+2 points)
-  Set your availabilities (+2 points)
-  Be able to send a date to someone only on his availabilities (+3 points)

###  Ratings (bonus +3 points)
-  Rate someone (numeric/stars etc.) on his profile (+3 points)
-  Rate someone after a date (+1 point)
-  See my rating on my profile (+1 point)
-  Comment on someone profile (+3 points)
-  Delete a comment from own profile (+2 points)

###  Likes (Facebook style-ish) (bonus +3 points)
-  Be able to like a candidate and see the people you like (+4 points)
-  See the list of people who likes us (+2 points)
   -  Be able to like the person back from the list (+1 point)
-  Have a sitewise preference so that only people that you like can message you (+2 points)

###  Notifications (bonus +4 points)
-  Notification bar/panel/page + 2 points with at least one of :
   -  likes + 2 points
   -  ratings + 2 points
   -  dates + 2 points
   -  messages + 2 points

###  Stalker Feed (events/activities) (bonus +3 points)
-  See the list of site events (+2 points) with at least one of the following in it:
   -  Likes (+2 points)
   -  Rating (+2 points)
   -  Dates (+2 points)
   -  Comments (+2 points)
-  Filter: See the activity of people I like only (+2 points)
-  See activity of someone on his profile (+3 points)

## API Routes

**POST** `/login`

Logs the user in the system if the username and password are valid.

Request
```json
{
  "email": "brandon.mason78@example.com",
  "password": "Password_1"  
}
```

Response
```json
{
  "birthdate": "1970-03-08",
  "description": "Integer condimentum ligula vel pellentesque dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi congue consectetur egestas. Mauris rhoncus hendrerit dignissim. Aenean condimentum dui convallis lorem egestas tempor. Etiam odio ipsum, commodo at posuere a, facilisis ut velit. Praesent tortor est, varius sed facilisis eget, accumsan ac est. Vestibulum ullamcorper mauris sit amet elit laoreet, vitae venenatis velit molestie. Suspendisse id laoreet mi. Pellentesque non ex et justo tempus pellentesque id nec dolor. Integer iaculis felis erat. Praesent tincidunt in arcu eu aliquam. Ut vel lacus at dolor consequat consectetur eget quis libero. Aliquam et fringilla dolor, in aliquet sem. Vivamus euismod condimentum sagittis.",
  "email": "brandon.mason78@example.com",
  "gender": "M",
  "interestedIn": "F",
  "name": "Brandon Mason",
  "pictureUrl": "https://d3iw72m71ie81c.cloudfront.net/male-16.jpg",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTQ5MDM2NjUsImlhdCI6MTU1MjMxMTY2NSwic3ViIjoxfQ.P-58YHbat93e9UL1cVm1PC42IlhwblwOaeHhq77mFHg",
  "userId": 1
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
  "birthdate": "1995-01-01",
  "gender": "F",
  "interestedIn": "M",
  "description": "Nulla a libero vel ligula vestibulum lacinia. Fusce ligula orci, consequat id turpis a, tristique ultricies leo. Praesent porta faucibus ligula a ultricies. Pellentesque eu felis maximus nulla tincidunt pellentesque bibendum sed nisl. Vivamus placerat nisl vel mauris viverra, ut tristique velit commodo. Nam id aliquam ex. Donec cursus felis ac leo pretium, ut tincidunt ipsum malesuada. Etiam lorem eros, commodo vitae tristique eu, posuere eget ipsum. Vivamus quis porta augue. Duis ac pretium lacus, eget molestie turpis. Nulla scelerisque sodales congue. Duis tortor turpis, condimentum sit amet lacus non, porttitor euismod massa. Nullam in aliquam dolor. Morbi vitae justo ut sem sodales volutpat. Aenean placerat ex ac aliquam euismod.",
  "pictureURL": "https://d3iw72m71ie81c.cloudfront.net/natalia.JPG",
  "password": "mypass",
  "tags": [1,2,3,4,5]
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
* [gender formats &middot; Microformats Wiki](http://microformats.org/wiki/gender-formats)
* [https://placezombie.com/](http://placezombie.com/)
