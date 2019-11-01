import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter.js'
import AddPerson from './components/AddPerson.js'
import Persons from './components/Persons.js'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showFilter, setShowFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const createPerson = newObject => {
    personService
        .create(newObject)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
        })
        .catch(e =>{
            alert("Oops something went wrong")
        })
  }

  
  const update = (newObject) => {
    console.log(newObject)
    personService
    .update(newObject.id, newObject)
    .then(returnedPerson => {
      //console.log(returnedP) => undefined
      setPersons(persons.map(person => person.id !== newObject.id ? person : newObject))
    })
  }

  const handleDelete = e => {
    let id = parseInt(e.target.value)

    personService
    .deleteById(id)
    .then(r =>
        console.log(persons))
    setPersons(persons.filter(p => p.id !== id))
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showFilter={showFilter} setShowFilter={setShowFilter}/>
      <AddPerson newName={newName} setNewName={setNewName}
       newNumber={newNumber} setNewNumber={setNewNumber} persons={persons}
      setPersons={setPersons} createPerson={createPerson} update={update}/>
      <Persons persons={persons} showFilter={showFilter} handleDelete={handleDelete}/>
    </div>
  )

}

export default App