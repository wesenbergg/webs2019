import React from 'react'
import Weather from './Weather'

//Nimi, pääkaupunki, asukasl, kielet, lippu
const Country = ({country}) => {
    const showLang = () =>
        country.languages.map(l => <li key={l.iso639_2}>{l.name}</li>)
    
    if(country.name === undefined) return <></>

    return(
        <>
        <h2>{country.name}</h2>
        <p><b>Capital</b> {country.capital}</p>
        <p><b>Population</b> {country.population}</p>
        <h4>Languages</h4>
        <ul>
            {showLang()}
        </ul>
        <img src={country.flag} alt={country.name} width="200"/>
        <Weather location={country.capital}/>
        </>
    )
}

export default Country