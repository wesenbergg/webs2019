import React, { useState } from 'react'

const AuthorForm = ({ name, show, editAuthor }) => {
  const [born, setBorn] = useState('')

  if (!show) return null

  const submit = async (e) => {
    e.preventDefault()
    console.log('add book...')
    console.log( name, born )
    await editAuthor({
      variables: { name, born }
    })

    setBorn('')
  }

  return (
    <div>
      <h3>Update user</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input value={name} readOnly />
        </div>
        <div>
          born
          <input type='number' value={born} onChange={({ target }) => setBorn(parseInt(target.value))} />
        </div>
        <button type='submit'>update</button>
      </form>
    </div>
  )
}

export default AuthorForm