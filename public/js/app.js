// console.log('client side javascript file is loaded!')
// fetch is not a javascript function or node function. fetch returns a promise.
// fetch is used in client side javascript. (Just an eg usage for fetch is shown below)

// fetch('/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log('Error occured: ' + data.error)
//         }
//         else {
//             console.log('Location: ' + data.location)
//             console.log('Forecast: ' + data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// getting value by id use #    // getting value by classname use .
const messageOne = document.querySelector('#message-1')
messageOne.textContent = ''
const messageTwo = document.querySelector('#message-2')
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    // prevent the default behaviour of page reload
    e.preventDefault()

    // extracts the input value
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        // waiting for the json conversion and then working on it
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = 'Error occured: ' + data.error
                // console.log('Error occured: ' + data.error)
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                // console.log('Location: ' + data.location)
                // console.log('Forecast: ' + data.forecast)
            }
        })
    })

    console.log(location)
})