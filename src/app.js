const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// directory name for this js file
console.log(__dirname)
// name of the file for this js file
console.log(__filename)
// to navigate to the public folder
console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
// to configure another path for the hbs files other than the default path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// to serve the static html files in the public folder. index.html will be the file loaded for the root path/when nothing is mentioned. 
// Other file names will be loaded when their names are mentioned in path with .html extension
app.use(express.static(publicDirectoryPath))

// setting the view engine - handlebars
// express will look in the views folder, in root directory, by default for the hbs files. 
app.set('view engine', 'hbs')
// to configure another path for the hbs files other than the default path
app.set('views', viewsPath)
// to register partials
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    // first arg of render -  hbs file to be rendered from views folder. 
    // 2nd arg of render - object which contains values to be accessed for that html file
    res.render('index', {
        title: 'Weather App',
        name: 'Nikhil Krishn N'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nikhil Krishn N'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Official Help documentation',
        title: 'Help',
        name: 'Nikhil Krishn N'
    })
})

// first param is the route. secound param is the function that describes what needs to send back to them
// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: '30 C',
//         location: 'Trivandrum'
//     })
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an Address'
        })
    }  

    // callback chaining, by taking from commandline
    // removed data as the 2nd argument and destructured the object & given a default value in case of an error, where destructuring undefined is not possible
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    
        if(error) {
            return res.send({
                // key and value same name, so we can use the shorthand
                // error: error
                error
            })
        }
    
        // callback parameter error and data are having the same name as the geocode's callback function parameter
        // Need to change it for accessing it uniquely
        // forecast(data.latitude, data.longitude, (error, data) => {
        // unique parameter names are given so that, the parameters can be accessed correctly
        forecast(latitude, longitude, (forecastDataError, forecastData) => {

            if(forecastDataError) {
                return res.send({
                    error: forecastDataError
                })
            }    
            res.send({
                forecast: forecastData,
                // key and value same name, so we can use the shorthand
                // location: location,
                location,
                address: req.query.address
            })
            
        })
        
    })

})

app.get('/products', (req, res) => {

        // if(!req.query.search) {
        //     res.send({
        //         error: 'You must provide a search term'
        //     })
        // }
        // else {
        //     // to get all the query string properties passed
        //     console.log(req.query)
        //     // to get the value of the string property search
        //     console.log(req.query.search)
        //     res.send({
        //         products: []
        //     })
        // }

        // using return statement instead of else block. 
        if(!req.query.search) {
            return res.send({
                error: 'You must provide a search term'
            })
        }
        // to get all the query string properties passed
        console.log(req.query)
        // to get the value of the string property search
        console.log(req.query.search)
        res.send({
            products: []
        })
        


})

// will match with all path that starts with help
app.get('/help/*', (req, res) => {
    // res.send('Help article not found')
    res.render('help404', {
        title: '404',
        name: 'Nikhil Krishn N',
        errorMessage: 'Help article not found'
    })
})

// * will match with all. So this should come as the last app.get, as * should match only when all other options are tried
app.get('*', (req, res) => {
    // res.send('My 404 page')
    res.render('404', {
        title: '404 Page',
        name: 'Nikhil Krishn N',
        errorMessage: 'Page Not Found'
    })
})


// first param is the route. secound param is the function that describes what needs to send back to them. '' serves when nothing is mentioned, like root url. 
// app.get('', (req, res) => {
//     // res.send('Hello express')
//     // Sending back html
//     res.send('<h1>Weather</h1>')
// })

// first param is the route. secound param is the function that describes what needs to send back to them
// app.get('/help', (req, res) => {
//     // res.send('Help page.')
//     // Sending json
//     // res.send({
//     //     myName: 'Nikhil',
//     //     age: 36
//     // })
//     // sending array of object
//     res.send([
//         {
//             myName: 'Nikhil',
//             age: 36
//         }, 
//         {
//             myName: 'Jagan',
//             age: 36
//         }
//     ])
// })

// first param is the route. secound param is the function that describes what needs to send back to them
// app.get('/about', (req, res) => {
//     res.send('<h1>About page.</h1>')
// })



// to start the server. second param is an optional argument, which is a call back function which runs when server is up and running
app.listen(3000, () => {
    console.log('server is up on port 3000.')
})