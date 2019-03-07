const express = require('express');
const morgan = require('morgan');
const models = require('./models');
// models contains all of our db and our models User and Page.

const layout = require('./views/layout');

const app = express();

// requiring the routers from wiki.js and user.js, where our routes are stored.
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');


app.use(express.static(__dirname + '/public')); // serve up public files
app.use(express.urlencoded({ extended: false })); // parse request body. this needs to be above any line in your code that needs the body to be parsed!!

// this is the line of code that tells the program what to do when it gets a request for /wiki.
app.use('/wiki', wikiRouter);

app.use('/user', userRouter);


models.db.authenticate().then(() => {
  console.log('connected to the database');
});

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

const PORT = 3000;

const init = async () => {
  await models.db.sync();
  app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
  })
};

// Our models are defined on our db; therefore we can call models.db.sync and it will sync both Page and User as well; alternatively, we could call them separately, but it is not needed.

init();

// app.listen(PORT, () => {
//   console.log(`App is listening on Port ${PORT}`);
// });

// command "node app.js" starts the server listening!! OR you can "npm install nodemon --save-dev", (it does not need to be required?), and run the command "npm nodemon app.js"/ add "start" to your scripts and define it to be "nodemon app.js". Then, you can run "npm start".
