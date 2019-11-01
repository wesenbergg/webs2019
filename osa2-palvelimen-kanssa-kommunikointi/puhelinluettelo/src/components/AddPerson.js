import React from 'react'

const AddPerson = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons,
     createPerson, update }) => {
    const handleNameChange = event => 
        setNewName(event.target.value)

    const handleNumberChange = e =>
        setNewNumber(e.target.value)

    const addPerson = event => {
        event.preventDefault()
        let foundPerson = persons.find(p => p.name === newName)
        const newObject = {
            name: newName,
            number: newNumber === '' ? "No number": newNumber
        }

        foundPerson !== undefined && foundPerson.name.includes(newName) ?
        handleUpdate(foundPerson, newNumber):
        setPersons(persons.concat(newObject)) || createPerson(newObject)

        setNewName('')
        setNewNumber('')
    }

    const handleUpdate = (person, newNumber) => {
        if(window.confirm(`${person.name} is allready in phonebook. Do you want to update this number?`))
            update({...person, number: newNumber})
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