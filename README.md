This project is an application skeleton for [Node.js](https://nodejs.org/) web app.

[![Build Status](https://travis-ci.org/FortechRomania/express-mongo-example-project.svg?branch=master)](https://travis-ci.org/FortechRomania/express-mongo-example-project)

## Getting Started

To get you started you can simply clone the repository:

```
git clone https://github.com/abidimomen/backend-bookit
```

and install the dependencies

```
npm install
```

### Prerequisites

You need git to clone the repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

A number of node.js tools is necessary to initialize and test the project. You must have node.js and its package manager (npm) installed. You can get them from [http://nodejs.org/](http://nodejs.org/). The tools/modules used in this project are listed in package.json and include express, mongodb and mongoose.

#### MongoDB

The project uses MongoDB as a database. If you are on Mac and using Homebrew package manager the installation is as simple as `brew install mongodb`.
The current npsql database contains 2 tables: `user` and `event`.

### Start the MongoDB server

First we need to create the `db` directory where the database files will live in. In your terminal navigate to the `root` of your system by doing `cd ..` until you reach the top directory. You can create the directory by running `sudo mkdir -p /data/db`. Now open a different tab in your terminal and run `mongod` to start the Mongo server.

### Run the Application

The project is preconfigured with a simple development web server. The simplest way to start this server is:

    npm start

# Specify Backend Architecture assignment

This project contains a CRUD application for user's entity with a password, email, username, firstname, lastname.
also contains CRUD for event with title,host,date,duration,creationDate,location,maxPart,currentPart,rating,description,datalink.

## Server

The app exposes different endpoints for users and events:

- `GET /users` list all the users
- `GET /users/{id}` list a user with a specific id
- `POST /users` creates a new user
- `PUT /users/{id}` updates a user with specific id
- `DELETE /users/{id}` remove a user with a specific id

- `POST /events/` creates a new event
- `DELETE /events/{id}` remove a event with a specific id
- `GET /events/{id}` list a event with a specific id

## Running the app

To start the app you need to run the following commands

```bash
$ npm install

#development
$ npm start

# watch mode
$ npm run start:dev
```

## Interfaces 
![0e651a74ded4fadd0cdc74a5f552a2dc](https://user-images.githubusercontent.com/79226487/143953801-8eb2083c-deb4-427f-b89d-a21d6e96479b.png
![a1ffa3349445e24aaaa47e8a2cc1f13e](https://user-images.githubusercontent.com/79226487/143953824-c6e4d4cf-98eb-4930-a2b8-9a3976194c49.png)
-
![f2c94e85f29ce9f90017e69999046806](https://user-images.githubusercontent.com/79226487/143953834-25c2e7ce-74fb-40d1-9d8e-55da8759dd7c.png)
![1b8ed7a7a3769e1454f90b526fb37cf5](https://user-images.githubusercontent.com/79226487/143953836-749f067b-3e63-4337-b18c-435516198aee.png)
![43f0d3f0111091c95af8121b8806d75e](https://user-images.githubusercontent.com/79226487/143953839-3bb2ba01-52c2-4a58-b32a-f16214397db7.png)
![82f40a570ddbd4b568dc64fbf90520de](https://user-images.githubusercontent.com/79226487/143953842-412d347e-d69e-4af7-a6b3-55c4c7b8b56b.png)
![3806ecf8b7aad0aa41cdccaa2bbb2832](https://user-images.githubusercontent.com/79226487/143953848-d59a4e56-6aff-4d18-8296-445dad73242b.png)
![8157353b96fd2e0b83e358f2ac423e8f](https://user-images.githubusercontent.com/79226487/143953856-7a13946f-97c2-44b4-8936-d30a6b009bee.png)
)
