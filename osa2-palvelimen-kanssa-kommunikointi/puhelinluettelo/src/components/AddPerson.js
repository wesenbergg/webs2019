import React from 'react'

const AddPerson = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {
    const handleNameChange = event => 
        setNewName(event.target.value)

    const handleNumberChange = e =>
        setNewNumber(e.target.value)

    const addPerson = event => {
        event.preventDefault()
        let personsNames = persons.map(p => p.name)
        const newObject = {
            name: newName,
            number: newNumber === '' ? "No number": newNumber
        }
        
        personsNames.includes(newName) ?
        window.alert(`${newName} has allready added in phonebook.`) :
        setPersons(persons.concat(newObject))

        setNewName('')
        setNewNumber('')
    }
  
    return(
        <>
        <h2>Add new</h2>
        <form onSubmit={addPerson}>
            <div>
            name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default AddPerson