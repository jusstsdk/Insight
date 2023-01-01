# Educational platform using MERN stack
# Outline
- [Description](https://github.com/Advanced-Computer-Lab-2022/Newcomers/new/main?readme=1#description)
- [Motivation](https://github.com/Advanced-Computer-Lab-2022/Newcomers/edit/main/README.md#motivation)
- [Build Status](https://github.com/Advanced-Computer-Lab-2022/Newcomers/edit/main/README.md#build-status)
- [Code Style](https://github.com/Advanced-Computer-Lab-2022/Newcomers/edit/main/README.md#code-style)
- [Demo](https://github.com/Advanced-Computer-Lab-2022/Newcomers/edit/main/README.md#demo) //gifs
- [Technologies](https://github.com/Advanced-Computer-Lab-2022/Newcomers/edit/main/README.md#technologies)
- [Architecture](https://github.com/Advanced-Computer-Lab-2022/Newcomers/edit/main/README.md#architecture)
- [Extra Features](https://github.com/Advanced-Computer-Lab-2022/Newcomers/edit/main/README.md#extra-features)
- [Installation](https://github.com/Advanced-Computer-Lab-2022/Newcomers/edit/main/README.md#installation)

## Description
This is a university project that we worked on during the semester to train on coding a website from scratch (backend and frontend).
The premise of the project is to make a web app that serves as an educational platfrom much like other platforms (ex. Udemy, Coursera, etc...).
We were required to use MERN in addition to any other technology that we deemed need and we were provided with a set of requirements that needs to be met.

## Motivation
The motivation of the website is to train on writing a real website from start to end given a set of requirements to mimick real life engineering

## Build Status
the project is a work on progress but mostly finished. it is a rough proof of concept.

## Code Style
we followed these [conventions](https://google.github.io/styleguide/jsguide.html) when writing out code and stuck mostly to camelCase.

## Demo

## Technologies
### Client Side:
- [React](https://reactjs.org/) : A JavaScript library for building user interfaces which we used primarliy to create our frontend
- [React Router v6](https://reactrouter.com/en/main) : We used this to to manage routing from one url to the other in the frontend
- [Redux](https://redux.js.org/) : A Predictable State Container for JS Apps that helps us keep track of state app wide
- [Redux Persist](https://www.npmjs.com/package/redux-persist) : persists the redux states when brwoser is closed
- [React Bootstrap](https://react-bootstrap.github.io/) :  pre-made components that integrates bootstrap and react

### Server Side:
- [MongoDB](https://www.mongodb.com/) : a NoSql database 
- [Mongoose](https://mongoosejs.com/) : Mongodb object modeling for node.js
- [Node.js](https://nodejs.org/en/) : server enviroment that allows us to run Javascript Code server side
- [Express.js](https://expressjs.com/) : Fast, unopinionated, minimalist web framework for Node.js which helped us
- [ByCrypt](https://www.npmjs.com/package/bcrypt) : A library to help you hash passwords
- [CORS](https://www.npmjs.com/package/cors) : CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
- [dotenv](https://www.npmjs.com/package/dotenv) : Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
- [JSON web token](https://jwt.io/) : tokens used for authorization and authentication
- [nodemailer](https://nodemailer.com/) : helps us send emails from node
- [Stripe](https://stripe.com/) : allows us to simulate an online payment system

## Architecture
### folder heirarchy
```bash
├───client
│   ├───node_modules
│   ├───public
│   └───src
│       ├───components
│       │   ├───admin
│       │   ├───corporateTrainee
│       │   ├───course
│       │   │   └───continueCourse
│       │   ├───guest
│       │   ├───instructor
│       │   │   └───createCourse
│       │   ├───shared
│       │   │   └───pagination
│       │   └───trainee
│       ├───css
│       ├───functions
│       ├───pages
│       │   ├───admin
│       │   ├───corporateTrainee
│       │   ├───guest
│       │   ├───instructor
│       │   ├───sharedTrainee
│       │   └───trainee
│       │       └───stripe
│       ├───redux
│       └───routes
├───docs
└───server
    ├───controllers
    ├───middleware
    ├───models
    │   └───schemas
    ├───node_modules
    └───routes
```
we tried to keep react components and pages that are similar in the same folder for ease of search and organization

### Server Code in-depth dive

the server is built as a [RESTful API](https://restfulapi.net/) that recieves HTTP requests from the frontend then processes that request using various middleware and logic then sends the appropriate actions to the database to reflect the user actions. this API was built with the intent to abstract as much of the logic as possible away from the frontend while also providing a manageable amount of endpoints without overwhelming the frontend with a huge number of choices. let me go into further detail a bit more on each process of the pipeline.

when the server starts it establishes a connection with the mongoDB server and runs on the localhost on port 4000.
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/1263ce18dd0621232f8c7631e687c2cd51bdd810/server/server.js#L63-L75

the first file that the HTTP request passes by is server.js which passes by CORS and Express middleware that fixes cors problems and parses the body of the request from text to JSON.
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/1263ce18dd0621232f8c7631e687c2cd51bdd810/server/server.js#L19-L22

Then the request passes by authentication middleware which decrypts the jwt and checks its content to decide whether the user is authenticated to do this action or not. 
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/1263ce18dd0621232f8c7631e687c2cd51bdd810/server/middleware/auth.js#L4-L23

After it finishes that round of middleware, it is passed to one of the files in the routes folder depending on the matching URL. these routes have access to a set of controllers that include functions that are called based on matching URLs then matches said url with a function.

admin routes for example:
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/1263ce18dd0621232f8c7631e687c2cd51bdd810/server/routes/administrators.js#L34-L35
admin controller for example:
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/1263ce18dd0621232f8c7631e687c2cd51bdd810/server/controllers/administratorController.js#L9-L13

this function then reads the information sent in the request (headers or body) and forwards it to mongoose to perform one of the CRUD operations. Mongoose is used because it is an ODM that applies automatic validations and facilitates the interaction between the server. the response is then returned to the user depending on the result of the operation on the database side and it abides by the HTTP status codes.--

Mongoose uses the models we had defined to decide if the data is proper or not and also it automatically calculates some attributes like ratings for example
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/1263ce18dd0621232f8c7631e687c2cd51bdd810/server/models/instructorModel.js#L15-L52

### Client Code in-depth dive

the client side code is built primarily using react which gets its data from the backend, I will no explain it in details. before I get into how react works, I will explain the two other technologies we use in tandem with it which are Redux and React Router.

Firstly, Redux which is a solution to keeping track of states on an app wide basis in a simple manner. Due to how the nature of react which passes data in a top down approach, this nature introduces a few difficulties when wanting to share information between siblings or components in a level even lower. Redux solves this by first registering a store that keeps track of whatever the developer wants to keep track of, which in our case turns out to be a few things. I will turn your attention to a few global states that are used almost all over the app those being the user and userType which helps with deciding what to render and which data to display instead of fetching the user everytime or passing it as a prop which is known as prop drilling. We also boosted Redux with redux persist which makes use of the local storage to persist the redux accross browser sessions (i.e. closing the browser and openning it again)

set up the store:
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/1263ce18dd0621232f8c7631e687c2cd51bdd810/client/src/redux/store.js#L12-L33
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/1263ce18dd0621232f8c7631e687c2cd51bdd810/client/src/index.js#L20

create reducers:
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/1263ce18dd0621232f8c7631e687c2cd51bdd810/client/src/redux/userSlice.js#L4-L31

The Second main technology we used next to react was React Router. React was designed to be an SPA (Single Page Application) framework which proves difficult to use when having a complex site with multiple users, moving parts and requirements so react router introduces the ability to select which pages to load depend on the current url of the browser which facilitates building the appliciation.

the main router that resides in App.js:
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/1263ce18dd0621232f8c7631e687c2cd51bdd810/client/src/App.js#L13-L35

the sub routes in admin for example:
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/1263ce18dd0621232f8c7631e687c2cd51bdd810/client/src/routes/AdminRoutes.js#L23-L67

we also apply a dynamic layout that changes based on type user as well as protect the routes which checks that the user is actually meant to access this page:
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/03d5967c34b4e23ba8cfb348f81dfe0de31a36d7/client/src/routes/AdminRoutes.js#L23-L25
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/03d5967c34b4e23ba8cfb348f81dfe0de31a36d7/client/src/components/shared/Layout.js#L7-L17
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/03d5967c34b4e23ba8cfb348f81dfe0de31a36d7/client/src/components/shared/Protected.js#L4-L19

Now we move onto React. React simply encapsulates pieces of the page into their own components and these components can include other components as their children. Since we have 5 types of users (Guest, Trainee, Corporate Trainee, Admin and Instructor)  we used react router to group 5 different groups of routes that correspond to each user and then decides what page to render.

Routes render pages and pages contain components. if a components needs data from it parent directly we pass it as a prop but if we notice the phenomenon of prop drilling we switch to a redux state to facilitate reading the code.

Course page for example:
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/03d5967c34b4e23ba8cfb348f81dfe0de31a36d7/client/src/pages/sharedTrainee/CoursePage.js#L109-L154
Course title component that is rendered by the course page:
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/03d5967c34b4e23ba8cfb348f81dfe0de31a36d7/client/src/components/course/CourseTitle.js#L18-L74

## Extra Features
we added the ability of the course to be drafted and published on a later time

## Installation
1. download repo
2. npm install in client and server
3. npm start both
4. head to localhost:3000
