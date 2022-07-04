import React from "react";
import mondaySdk from "monday-sdk-js";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

const monday = mondaySdk();
monday.setToken("eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2MDg0Njc5MCwidWlkIjozMDMxOTI1MCwiaWFkIjoiMjAyMi0wNS0xN1QwMToxNzowNC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6NzcxNzE2NywicmduIjoidXNlMSJ9.X7R9ymORVX0CcbbBotMLdk_VjPmjfBWszsrkAvhUa3s")

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // Default state
    this.state = {
      cities: ["hola"],
      setData: {},
      settings: {},
      myData: { boards: [] },
      cityWeathers:[]
    };
    this.cityName =[];
      
  }
 
  componentDidMount() {         
  monday.api('query { boards( ids : 2664704591 ) { items { id : name column_values { text }}}}')
  .then((res) => {  
                  console.log(this.setState({myData:res.data}));
                  this.state.myData.boards.map((board) => {
                    board.items.map((item) =>{
                      console.log(item); 
                      fetch(`http://api.weatherapi.com/v1/current.json?key=c156f7f2a3d84ae0861121630223006&q=${item.column_values[3].text}&aqi=no`)
                      .then((res) => res.json())
                      .then((json) => {
                        let cityWeather ={
                          name: json.location.name,
                          temp_c:json.current.temp_c,
                          temp_f:json.current.temp_f,
                          //condicion: json.current.condicion.icon,
                          localTime: json.current.localTime,
                          //icon: json.current.condicion.text
                        };
                        let cityWeathers = [...this.state.cityWeathers, cityWeather];
                        this.setState({cityWeathers});
                      })
                    })}
                  )
                  }
    ) 
  }

      
       
  render(){    
        const {cityWeathers} = this.state; 
        const { myData } = this.state;
        
        return(           
            <div className="App">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">  
                    {
                      console.log(cityWeathers)}
                     { cityWeathers.map((city) => 
                      <WeatherCard key={city.name} className="cards" name={city.name}/>)
                    }
                  
                                           
                                   
                      {/* cities.map((el) =>(                        
                      <div className="cardsRow"> hola
                        <WeatherCard className="cards" key={el.name} name={el.name} temp_c={el.temp_c} temp_f={el.temp_f}
                               icon={el.weatherIcon} localtime={el.localtime}/>
                      </div>))
                    }        */} 
                  </div>
                </div>
              </div>
            </div>
            )
        
    }
}

/* //        const { myData } = this.state;
//         return (
//       <div className="App">
//        const citiesAux =[];        
//         <div className="container">
//           <div className="row">
//             {JSON.stringify(this.state.myData)}
//             {this.state.myData.boards}
//             {console.log(myData.boards)}
//             <div className="col-md-4">  
//               {
//                 cities.length === 0? (<h3>Loading . . .</h3> ) :
//                 cities.map((el) => (
//                   <div className="cardsRow">
//                     <WeatherCard className="cards" key={el.name} name={el.name} temp_c={el.temp_c} temp_f={el.temp_f}
//                               icon={el.weatherIcon} localtime={el.localtime}/>
//                   </div>          
//                 ))
//               }       
// {/*         
//       //       <s
      
                
      
//       //     </div>
//       //   </div>
//       <div>
//         {JSON.stringify(myData.boards)}
//         { myData.boards.map( (board) => {
//         board.items.map((item) => citiesAux.push(item.column_values[3].text) )})} 
//         {
//           citiesAux.forEach((el) =>(
//             <WeatherCard data={el}> </WeatherCard>           
//           ))
//         }
//        {/* {console.log(citiesAux)} 
//        {console.log(this.state.cities)}  */
     



