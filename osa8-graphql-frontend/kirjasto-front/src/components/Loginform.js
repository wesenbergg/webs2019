import React, { useState } from 'react'

const Loginform = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const result = await props.login({
      variables: { username, password }
    })

    if (result) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }

  return (
    <div>
      <h3>Update user</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          born
          <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>update</button>
      </form>
    </div>
  )
}

export default Loginform