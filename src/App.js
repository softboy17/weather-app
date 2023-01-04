import logo from './logo.svg';
import './App.css'; 

import React, {useState} from 'react'; 
const api ={ 
  key:'95d4cb87aa7596bf1bd8a9f8c150d02b', 
  base: 'https://api.openweathermap.org/data/2.5/'
  // base: 'https://api.openweathermap.org/data/2.5/'
} 

const dateBuilder = (d) =>{ 
  let months = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']; 
  let days = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
 
  let day = days[d.getDay()]; 
  let date = d.getDate(); 
  let month = months[d.getMonth()]; 
  let year = d.getFullYear(); 
  return `${day} ${date} ${month} ${year}`
}

function App() { 
  const [query,setQuery]= useState(''); 
  const[weather, setWeather]= useState({}); 

  const search = evt =>{ 
    if(evt.key === 'Enter'){ 
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`) 
      .then(res=> res.json() ) 
      .then(result =>{ 
        setWeather(result);
        setQuery(''); 
        console.log(result)
      });
    }
  }

  return ( 

    <div className={ 
      (typeof weather.main !='undefined') 
        ?((weather.main.temp >16) 
        ?'app-warm' 
        : 'app-cold' ) 
        :'app'}>
        <div className='app'>
        <main>
          
          <div className='search-box'> 
        <input type='text' className='search-bar'  
        placeholder='Search...'  
        onChange={e => setQuery(e.target.value)}  
        value={query} onKeyPress={search}>  
        </input> 
          <h1 className='nickname'>SF Weather</h1>
          </div> 
          {(typeof weather.main !='undefined')?(
           <div>  
          
            <div className='location-box'>
             <div className='location'>{weather.name},{weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
              </div>
          
          <div className='weather-box'> 
            <div className='temp'> 
             {Math.round(weather.main.temp)} C
             </div> 
             <div className='weather'>{weather.weather[0].main} <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}/></div> 
          
            </div> 
            </div>  
        ): ( weather.cod == '404')?(
          <div className='not-found'>
            <div className='not-found-text'><h2>Город не найден</h2></div></div>
        ):(<div className='Welcome'><h1>Добро пожаловать</h1></div>)}
        </main>
    </div>
  </div> 
)}

export default App;
