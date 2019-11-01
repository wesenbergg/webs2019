import React from 'react'

const Weather = ({weather}) => {
    console.log(weather)

    if(weather === undefined || weather.location === undefined) return <></>
    
    return(
        <>
        <h3>Weather {weather.location.name} </h3>
        <img alt={weather.current.weather_description} src={weather.current.weather_icons[0]} />
        <p><b>Temperature</b> {weather.current.temperature}&deg;C</p>
        <p><b>Wind</b> {weather.current.wind_speed}kph to {weather.current.wind_dir}</p>
        </>
    )
}

export default Weather