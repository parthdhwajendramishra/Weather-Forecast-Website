const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicGFydGhkaHdhamVuZHJhIiwiYSI6ImNrOHNkd3lnNDBiNGkzZXBqbW11c3l2eDAifQ.UalhWjialt1WQbfqmmJ38A'

    request({url:url,json:true},(error,{body})=>{

    if(error)
    {
        callback('Nikal pehli fursat mai nikal koi network nahi hai yahan',undefined) 
    }
    else if(body.features.length===0)
    {
        callback('Ye kya daal hai re tune isme',undefined)
    }
    else
    {
        callback(undefined,{
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name

        })
    }
 })
}


const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=a0650b098564a197218b446af66b8222&query='+latitude+','+longitude

    request({url,json:true},(error,{body})=>{

    if(error)
    {
        callback('Nikal pehli fursat mai nikal koi network nahi hai yahan',undefined) 
    }
    else if(body.error)
    {
        callback('Ye kya daal hai re tune isme',undefined)
    }
    else
    {
        callback(undefined,{
            weather:body.current.weather_descriptions[0],
            temperature:body.current.temperature,
            uvindex:body.current.uv_index,
            visibility:body.current.visibility,
            precipitation:body.current.precip,
            humidity:body.current.humidity,
            cloudcover:body.current.cloudcover,
            windspeed:body.current.wind_speed,
            winddirection:body.current.wind_dir,
            
            region:body.location.region,
            country:body.location.country,
            timezoneid:body.location.timezone_id,
            localtime:body.location.localtime

        })
    }
 })
}
module.exports={
    geocode:geocode,
    forecast:forecast
}