const path     = require('path')
const express  = require('express')
const session  = require('express-session')
const mongoose = require('mongoose')
const hbs      = require('express-handlebars')
const app      = express()
const passport = require('passport')

// configuration concerning passport
require('./config/passport')(passport)

// database configuration 
const db = require('./config/db').MONGO_URI

// connection to the database
mongoose.connect(db , {
    useNewUrlParser:true,
})
.then(() => console.log("Mongo Database connected..."))
.catch(error => console.log(error))

// Middleware
app.engine('hbs', hbs({ extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret:'verygoodsecret',
    resave:false,
    saveUninitialized: true
}))
app.use(express.urlencoded({ extended : false }))
app.use(express.json())

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

const PORT = process.env.PORT || 5000

app.use('/', require('./routes/index'));
app.use('/users' , require('./routes/users'))



app.listen(PORT, console.log(`Server is started at ${ PORT }`))

