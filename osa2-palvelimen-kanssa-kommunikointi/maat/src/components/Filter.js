import React from 'react'

const Filter = ({ country, countries, setShowCountry, setCountry }) => {

    const handleShowCountry = codeName => {
        let list = countries.filter(c => c.alpha3Code === codeName)
        setShowCountry(list[0])
    }

    const handleCountryChange = e =>{
        setCountry(e.target.value)
        let fCountries = countries.filter(c => c.name.toLowerCase()
        .includes(e.target.value.toLowerCase()))
        if(fCountries.length === 1) handleShowCountry(fCountries[0].alpha3Code)
    }
    return(
        <>
        <p>find countries <input value={country} onChange={handleCountryChange}/></p>
        </>
    )
}

export default Filter