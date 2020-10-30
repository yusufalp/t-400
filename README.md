# T-400

## A trivia game

Created by Yusuf Alp using React

## How to run this game locally

Clone the repo to your local machine:

```
git clone https://github.com/yusufalp/t-400.git
```

Install [dependencies](#dependencies):

```
npm install
```

tart the app (should start on http://localhost:3000/):

```
npm start
```

## What is it?

This is a trivia game where you will be asked 10 questions randomly from (a question bank. 

Each questions has multiple choice options. There is only ONE correct answer.

You will see your score at the top of the screen as you move along with the questions.

Once you answer all 10 questions, click see results to see how you did it.

User will be able to start the quiz again when a round is done with randomly chosen questions.

## Screenshots
![Home Page](https://i.ibb.co/X5Kv5FG/home-page.png)

## How to test the app?

There are several test suits included. To run the tests, run `npm test` or `npm t` in your terminal.

## Dependencies

```
react @ 17.0.1
enzyme @ 3.11.0
vercel @ 20.1.2
enzyme-adapter-react-16 @ 1.15.5
react-router-dom @ 5.2.0
react-scripts @ 4.0.0
```

## Future features

- [ ] User will be able to see what questions asked, what their answer was and whether they were correct in the results page


## Bug reports

If you discover any bugs, feel free to create an issue on GitHub. Please add as much information as
possible to help us in fixing the potential bug. We also encourage you to help even more by forking and
sending us a pull request.

https://github.com/yusufalp/t-400/issues


### Extra

An optional `vercel` dependency will be install as well, if you want to deploy to vercel to make a live web app. You must have a [vercel](https://vercel.com/) account to do that and if you chose to, just run `npm run deploy` in your terminal.

NOTE: When this is done it builds the app for production to the build folder before deploying. It correctly bundles React in production mode and optimizes the build for the best performance. If you want to do that without deploying use `npm run build`

