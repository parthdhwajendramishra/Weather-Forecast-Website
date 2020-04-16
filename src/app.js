const express= require('express')
const path=require('path')
const hbs=require('hbs')
const weather=require('./utils/weather.js')

const port=process.env.PORT || 3000
const app=express()

//Define paths for express config
const viewspath= path.join(__dirname,'../templates/views')
const partialPaths= path.join(__dirname,'../templates/partials')
const publicDirevtoryPath = path.join(__dirname,'../public')


//setup handlebars engine an view location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialPaths)

//setup static directory to serve
app.use(express.static(publicDirevtoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Parthdhwajendra'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helper:'I am helper how can I help you',
        title:'Help',
        name:'Parthdhwajendra'
    })
})

app.get('/products',(req,res)=>{
    res.send({
        products:[]
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        about:'This is about Nodejs',
        title:'About',
        name:'Parthdhwajendra'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

weather.geocode(req.query.address,(error,{latitude,longitude,location}={})=>
{
    if(error)
    {
        return res.send({error})
    }
    else
    {
        weather.forecast(latitude,longitude,(error,data)=>
        {
        if(error)
        {
        return res.send({error}) 
            }
        return res.send({
            Weather:data.weather,
            Temperature:data.temperature,
            address:req.query.address
            })

        })
    }  
  })
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
        title:'404',
        name:'Parthdhwajendra',
        errorMessage:'Help article not found'
        
    })
})


app.get('*',(req,res)=>{
      res.render('404',{
        title:'404',
        name:'Parthdhwajendra',
        errorMessage:'Page Not Found'
        
    })
})



app.listen(port)