const express = require('express')
const path = require('path')
const hbs = require('hbs') 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const app = express()

// define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)    // by default its 'views' you can change
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rahul Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rahul Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        message: 'This is help page.',
        name: 'Rahul Singh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
    
})

app.listen(port, () => {
    console.log('server started at port '+port)
})

