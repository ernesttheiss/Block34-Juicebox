# Block 34 - Juicebox

## Introduction

In this assessment, you'll be provided this GitHub repo with details for a full operational CRUD API that uses Express.JS, PostgreSQL, and other technologies that you've been trained on. 

## Problems to Solve

Begin this Career Simulation by cloning the GitHub repo, installing dependencies, providing environmental variables to connect your database, and running the server. From here, you'll encounter four problems that you'll need to solve. See problems below:

### Problem 1: Repair Database Schema

We'll need to seed our database with some data. The database schema is currently broken, so we'll need to fix it. Go to `db/index.js` and fix the `createUser()` function.

### Problem 2: Create a Middleware Function

The function `requireUser` is missing it's code. We need it to check if a user is logged in, and if so, attach the user to the request object. Navigate to `api/utils.js` and write the middleware function.

### Problem 3: Repair an API Endpoint

Your endpoint to create new Posts is not able to handle "tags" properly. Navigate to `api/posts.js` and find the POST method using the `postsRouter` controller function. Edit it to handle the many "tags" that may be applied to a post.

### Problem 4: Create a New API Endpoint

The DELETE route for posts is currently "under construction". Navigate to `api/posts.js` and find the DELETE method using the `postsRouter` controller function. Write the code to delete a post.

### STRETCH GOAL: Create a Route to Serve Frontend Web App

All of our work so far has been in the API layer and on the database! We need to create a frontend application using HTML, CSS, and JavaScript or `npx create-react-app` to be served by our API. Navigate to `client/index.html` and create a frontend application that can represent our application. 
