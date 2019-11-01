import React from 'react'

const Persons = ({ persons, showFilter, handleDelete }) => {

    const showPersons = () => {
        let list = persons.filter(p => p.name.toLowerCase().includes(showFilter.toLowerCase()))
        
        return list.map(p => 
            <p key={p.name}>
                {p.name} - {p.number} <button value={p.id} onClick={handleDelete}>delete</button>
            </p>
        )
    }

    return(
        <>
        <h2>Numbers</h2>
        {showPersons()}
        </>
    )
}

export default Persons