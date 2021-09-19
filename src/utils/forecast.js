//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request")


const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=ad4484fb886ccea6aafb679afd908990&query='+ latitude +','+ longitude + '&units=m'
    request({ url:url, json:true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the server.', undefined)
        } else if(response.body.error) {
            callback('Unable to find the location.', undefined)
        }else {
            callback(undefined, {
                temperature : response.body.current.temperature,
                feelslike : response.body.current.feelslike,
                weather_icons : response.body.current.weather_icons,
                weather_descriptions : response.body.current.weather_descriptions
            })
        }
    })
}


module.exports = forecast

