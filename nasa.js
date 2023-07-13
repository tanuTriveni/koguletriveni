const express=require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
//const https = require("https");
app.post("/",function(request,response){
    const query=request.body.cityName;
    const units="metric";
    const appiid="35eb701a7d6fe9ece307e9d5a8263326";
  

    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query+"&appid=" + appiid+ "&units="+units;
    https.get(url,function(re){
        console.log(re.statusCode);
    
    re.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        //console.log(data);
        //const temp=weatherData.main.temp

         const Wdes=weatherData.weather[0].description;
         const icon=weatherData.weather[0].icon;
        // const url=" https://openweathermap.org/img/wn/10d@2x.png"
         const imGEurl="https://openweathermap.org/img/wn/" + icon+"@2x.png"
         //response.write(icon);

         response.write("<p>weather description "+Wdes+"</p>");
        response.write("<h1> temp description "+temp +"</h1>");
        response.write("<img src=" +imGEurl+">");
        response.send()
    })
    })
   // response.send("server is running ");
})
    // const obje={
    //     name:"trivnei",
    //     food:"kotgule"
    // }
    // console.log(JSON.stringify(obje));

// app.get("/",function(request,response){
//     response.send("hiiiii");

// });

app.listen(3000,function(){
    console.log("server started");
})