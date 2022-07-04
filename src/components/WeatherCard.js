import React,{useState, useEffect} from "react";
import imagen1 from "../resourses/imagen.jpg"
import "./WeatherCard.css"

export default function WeatherCard(props){
  const [cityData, setCityData] = useState(props)
  const [weatherForecast, setWeatherForecast] = useState([])  
  // useEffect(() => {    
  //  const arre = props.data.forEach( async(el) => {
  //       //let res = await fetch(`http://api.weatherapi.com/v1/current.json?key=c156f7f2a3d84ae0861121630223006&q=${el}&aqi=no`)
  //       console.log(el)
  //       console.log("hola 2")})
        
  //       console.log(arre)
  //       , []}) 
  



  return(
    <div className="cards">     
      <div className="card" style={{width: "18rem"}}>
        <img src={imagen1} className="card-img-top" alt="..."/>
            <div className="card-body">
              <div>                
                <h5 className="card-title" >{props.name}</h5>
                <p className="card-text">{cityData.name}</p>
              </div>
            
          </div>
      </div>
    </div>
  )
}

