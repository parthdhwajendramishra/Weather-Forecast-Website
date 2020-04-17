

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')

const message2=document.querySelector('#message-2')
const message3=document.querySelector('#message-3')
const message4=document.querySelector('#message-4')
const message5=document.querySelector('#message-5')
const message6=document.querySelector('#message-6')
const message7=document.querySelector('#message-7')
const message8=document.querySelector('#message-8')
const message9=document.querySelector('#message-9')
const message10=document.querySelector('#message-10')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
     message2.textContent='Loading....'
     message3.textContent=''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            message2.textContent=data.error
        }
        else
        {
            message2.textContent='Weather:'+data.Weather
            message3.textContent='Temperature:'+data.Temperature+'° Celsius'
            message4.textContent='UV Index:'+data.uvindex
            message5.textContent='Visibility:'+data.visibility
            message6.textContent='Precipitation:'+data.precipitation
            message7.textContent='Humidity:'+data.humidity
            message8.textContent='Cloud Cover:'+data.cloudcover
            message9.textContent='Wind Speed:'+data.windspeed
            message10.textContent='Wind Direction:'+data.winddirection
            

            
        }
    })
  })
})