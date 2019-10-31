import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.js'
import AddPerson from './components/AddPerson.js'
import Persons from './components/Persons.js'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showFilter, setShowFilter ] = useState('')
  
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => 
        setPersons(response.data)
      )
  }

  useEffect(hook, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showFilter={showFilter} setShowFilter={setShowFilter}/>
      <AddPerson newName={newName} setNewName={setNewName}
       newNumber={newNumber} setNewNumber={setNewNumber} persons={persons}
      setPersons={setPersons} />
      <Persons persons={persons} showFilter={showFilter}/>
    </div>
  )

}

export default App