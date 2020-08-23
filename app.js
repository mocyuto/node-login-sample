const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require('./auth');
const session = require('express-session');
const flash = require('connect-flash');

// ミドルウェア
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
  secret: 'YOUR-SECRET-STRING',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// ログイン画面でフォームを利用するため
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./router.js"));

app.listen(3000);
