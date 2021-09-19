const request = require("request")

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieW8ycnZzaW5naCIsImEiOiJja3F5cnZ4Y2QxYXl4MnBxcDh0a3UwM3pyIn0.8JzAC_tcsznKrjdhZy8xwg&limit=1'
    request({ url : url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to the weather services!', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find the location.', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode