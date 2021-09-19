
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const weatherIcon = document.querySelector('img')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    weatherIcon.src = ''


    fetch('http://localhost:3000/weather?address='+location)
    .then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                weatherIcon.src = data.forecast.weather_icons[0]
                messageTwo.textContent = data.forecast.weather_descriptions + '. It is currently ' + data.forecast.temperature + ' degree out.'
                
            }
        })
    })
})