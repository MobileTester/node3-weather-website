const request = require('request')

// encodeURIComponent(..) is to correctly replace any special characters present. In cases without special characters, output will be the same
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlraGlsa3Jpc2huIiwiYSI6ImNsMDZmcDV3djE1Z3ozcHAzNTF1c3c1anoifQ.E6KSHnbxAHIyaCX9pbMYig&limit=1'

    // using shorthand syntax for url: url with url
    // since we are using respose.body only from response, we can destructure response to take body out of it
    request({url, json: true}, (error, {body}) => {
        // for handling low level error
       if(error) {
           // not mandatory to pass undefined as the 2nd argument. If nothings is passed, it will be considered as undefined
           callback('Unable to connect to location services!', undefined)
       }
       else if(body.features.length === 0) {
        // not mandatory to pass undefined as the 2nd argument. If nothings is passed, it will be considered as undefined
        callback('Unable to find location. Try a different search term.', undefined)
       }
       else {
        // error is the undefined arg here. not mandatory to pass undefined as the 1st argument. If nothings is passed, it will be considered as undefined   
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: longitude = body.features[0].place_name
        })
       }
       
   })
}

module.exports = geocode