import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter.js'
import AddPerson from './components/AddPerson.js'
import Persons from './components/Persons.js'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showFilter, setShowFilter ] = useState('')
  const [ message, setMessage ] = useState(null)

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
            setMessage({
              type: 'success',
              message: `Succesfully added '${returnedPerson.name}' to server`
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        })
  }

  
  const update = (newObject) => {
    console.log(newObject)
    personService
    .update(newObject.id, newObject)
    .then(returnedPerson => {
      //console.log(returnedP) => undefined
      setPersons(persons.map(person => person.id !== newObject.id ? person : newObject))
      setMessage({
        type: 'success',
        message: `Succesfully updated ${newObject.name}'s number.`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }).catch(error => {
      setMessage({
        type: 'error',
        message: `Person '${newObject.name}' was already removed from server`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setPersons(persons.filter(p => p.id !== newObject.id))
    })
  }

  const handleDelete = e => {
    let id = parseInt(e.target.value)
    let foundPerson = persons.find(p => p.id === id)

    personService
    .deleteById(id)
    .then(r => {
      setMessage({
        type: 'success',
        message: `Succesfully removed '${foundPerson.name}' from server`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    setPersons(persons.filter(p => p.id !== id))
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter showFilter={showFilter} setShowFilter={setShowFilter}/>
      <AddPerson newName={newName} setNewName={setNewName}
       newNumber={newNumber} setNewNumber={setNewNumber} persons={persons}
      setPersons={setPersons} createPerson={createPerson} update={update}/>
      <Persons persons={persons} showFilter={showFilter} handleDelete={handleDelete}/>
    </div>
  )

}

export default App