if (process.env.NODE_ENV !=='production') {
    require('dotenv').load()
}

const express = require('express')
const app = express()
const expresslayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views' , __dirname + '/views')
app.set('layout','layouts/layout')
app.set (expresslayouts)
app.set(express.static('public'))

const mongoose = require('mongoose')
mongoose.contact(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to Mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT ||  3000)