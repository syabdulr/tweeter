# Tweeter Project

Tweeter is a simple, single-page Twitter clone


![image](https://github.com/syabdulr/tweeter/blob/master/public/images/example2.png?raw=true)



## Table of Contents
### 1. Intro
### 2. Your information
### 3. Writing a Tweet!
### 4. Explanation of styling
### 5. Explanation of code
### 6. Setup Instructions
### 7. Dependencies


## Intro

With this you single page API, you are able to share your thoughts and see your tweets live as it updates the page in real time!

With the addition of time stamps, you will be able to see exactly what you were thinking at the time of the tweet!

## Your information

In the header of the page you will see all of your information, including your name and photo!

## Writing a Tweet

You'll want to start typing that in the form provided and ensure that you're tweets areat least 1 character, and no more than 140 characters. If your tweet does not meet the requirements set by the app, you will be met with an appropriate error message.

Below is an example of how the tweets would look like in desktop view.

![image](https://github.com/syabdulr/tweeter/blob/master/public/images/example.png?raw=true)


## Explanation of styling

All of the app was designed using CSS and Media Queries. Each section of the app has it's own CSS to keep code tidy and organized, and all of these are linked into our index.html. 

The page also features a desktop and mobile view.

## Explanation of code


This code represents the client-side JavaScript logic for a Twitter clone application called "Tweeter."

It utilizes jQuery to efficiently manipulate the Document Object Model (DOM) and simplify AJAX requests. By leveraging jQuery's event handling and AJAX capabilities, the code interacts with the server and dynamically updates the user interface.

The code's main functionalities include generating and rendering tweets, validating tweet content, and submitting new tweets. The createTweetElement function dynamically creates HTML markup for displaying tweets, incorporating user information, tweet content, and timestamps. The renderTweets function updates the user interface by clearing the tweet container and appending the generated tweet elements.

To ensure valid tweet content, a validation function checks the length of the tweet and displays appropriate error messages if it exceeds the character limit or if it is empty. The submitTweet function sends the tweet data to the server using an AJAX POST request. Upon successful submission, it reloads the tweets, clears the tweet input form, and resets the character counter.

Additionally, the code includes an escape function to prevent potential issues with special characters in tweets. It performs HTML encoding on the tweet content to ensure proper rendering and prevent any unintended effects.

## Setup Instructions

Create a new repository using this repository as a template.
Clone your repository onto your local device.
Install dependencies using the npm install command.
Start the web server using the npm run local command. The app will be served at http://localhost:8080/.
Go to http://localhost:8080/ in your browser.

## Dependencies
Express
Node 5.10.x or above
