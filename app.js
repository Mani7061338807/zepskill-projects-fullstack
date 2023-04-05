const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
let path = require('path');
let session = require('express-session');
let	passport = require('passport');
let	localStrategy = require('passport-local');
let moment = require('moment');
const flash = require('connect-flash');
const port = 3000

mongoose.connect("mongodb+srv://manishankarkumar789:mani@cluster0.ehkadvc.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("data basse is connted yeah!")
})
.catch((err)=>{
    console.log(err);
})
app.use(
	session({
		secret: "sessionPass",
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			// secure: true,
			expires: Date.now() + 1000 * 60 * 60 * 24,
			maxAge: 1000 * 60 * 60 * 24
		}
	})
);
app.use(flash());
let User = require('./models/user-db')
// ! PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
const jobb = require('./routes/index.js')
let users = require('./routes/auth.js')
const notif = require('./routes/notification');
const user = require('./routes/user');
const test = require('./routes/test');
app.use(notif)
app.use(jobb)
app.use(users)
app.use(user)
app.use(test)

app.get('/',(req,res)=>{
    res.send("server is running")
})

app.listen(port,()=>{
    console.log("server is started");
})