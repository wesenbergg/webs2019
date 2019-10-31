import React from 'react'

const Persons = ({ persons, showFilter }) => {
    const showPersons = () =>
    persons.filter(p => p.name.toLowerCase().includes(showFilter.toLowerCase()))
    .map(p => <p key={p.name}>{p.name} - {p.number}</p>)

    return(
        <>
        <h2>Numbers</h2>
        {showPersons()}
        </>
    )
}

export default Persons