const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=748137d19a19dc3f3bf1560d0e193642&query=' + encodeURIComponent(latitude) +',' + encodeURIComponent(longitude) + '&units=m'

    // json: true, is passed, response body will already be json. There is no need to parse it again.
    // using shorthand syntax for url: url with url
    // since we are using respose.body only from response, we can destructure response to take body out of it
    request({url, json: true}, (error, {body}) => {
         // for handling low level error
        if(error) {
            // not mandatory to pass undefined as the 2nd argument. If nothings is passed, it will be considered as undefined
            callback('Unable to connect to weather service!', undefined)
        }
        // error key in the response body
        else if(body.error) {
            // not mandatory to pass undefined as the 2nd argument. If nothings is passed, it will be considered as undefined
            callback('Unable to find the location:- ' + body.error.info, undefined)
        }
        // error is the undefined arg here. not mandatory to pass undefined as the 1st argument. If nothings is passed, it will be considered as undefined   
        else {
            callback(undefined, "Is Day: " + body.current.is_day + ". " + body.current.weather_descriptions[0] + '. Currently it is ' + body.current.temperature + ' degrees out. But it feels like ' + body.current.feelslike + " degrees.")
        }
    })
}

module.exports = forecast