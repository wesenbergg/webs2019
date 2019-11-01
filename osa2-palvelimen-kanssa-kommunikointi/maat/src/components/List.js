import React from 'react'

const List = ({country, countries, setShowCountry}) => {
    const handleShowClick = e => {
        let list = countries.filter(c => c.alpha3Code === e.target.value)
            setShowCountry(list[0])
        }

    const fetchCountries = () => {
        let list = <></>
        let fCountries = countries.filter(c => c.name.toLowerCase()
            .includes(country.toLowerCase()))
        
        if(fCountries.length <= 10 && fCountries.length > 1)
        list = fCountries.map(c => <li key={c.alpha3Code}>{c.name} <button value={c.alpha3Code} onClick={handleShowClick}>show</button></li>)
        if(fCountries.length > 10) list = <p>Too Many Matches</p>
        
        return list
    }

    return(
        <>
        {fetchCountries()}
        </>
    )
}

export default List