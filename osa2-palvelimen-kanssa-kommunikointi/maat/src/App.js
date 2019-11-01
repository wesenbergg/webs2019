import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
import List from './components/List';
import Filter from './components/Filter';
import Weather from './components/Weather';

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ country, setCountry ] = useState('')
  const [ showCountry, setShowCountry ] = useState({})
  const[ weather, setWeather ] = useState({})
    
  const weatherHook = () => {
    axios
        .get('http://api.weatherstack.com/current?access_key=36b7256083e2936443085d78e660310f&query=' + showCountry.capital)
        .then(response => {
        setWeather(response.data)
        console.log(response.data)
        })
   }

    useEffect(weatherHook, [ showCountry ])
  
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }

  useEffect(hook, [])

  return (
    <div className="App">
      <Filter country={country} countries={countries} setShowCountry={setShowCountry} setCountry={setCountry}/>
      <List country={country} countries={countries} setShowCountry={setShowCountry}/>
      <Country country={showCountry} />
      <Weather weather={weather} />
    </div>
  )
}

export default App
