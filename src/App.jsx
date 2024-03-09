import { useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import './styles/WeatherCard.css'

function App() {  

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  

  const success = info => {
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude
    })

  } 

  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  
  }, [])

  useEffect(() => {
    if(coords){
    const APIKEY = '2da86dff8bb32c64b34643b5140827b4'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
    

    axios
    .get(url)
    .then(res => {
      setWeather(res.data)
      const celsius = (res.data.main.temp - 273.15).toFixed(1)
      const fahrenheit = ((9/5 * celsius) + 32).toFixed(1)
      setTemp({
        celsius,
        fahrenheit
      })
    })

    .catch(err => console.log(err))
    }

  }, [coords])


  

  
  
  

  return (
    <div className='app'>
      
        isLoading
        ? 
      
      <WeatherCard 
      weather={weather} 
      temp={temp}
      />
      
      
    </div>
  )
}

export default App
