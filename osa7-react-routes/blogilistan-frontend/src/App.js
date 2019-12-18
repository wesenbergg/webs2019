import React, { useState, useEffect } from 'react'
import  { useField } from './hooks'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ type: 'hidden', text: '' })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      //noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const initiateBlogs = async () => {
      const initialBlogs = await blogService.getAll()
      initialBlogs.sort((a, b) => b.likes - a.likes )
      setBlogs(initialBlogs)
    }
    initiateBlogs()
  }, [])

  const loginForm = () => {
    /*
    <input className="username" type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}/>
    <input className="password" type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
    */
    return(
      <>
        <h2>login to application</h2>
        <form onSubmit={handleLogin} className="loginForm">
          <div>
            <label>username</label>
            <input className="username" {...username.inputField}/>
          </div>
          <div>
            <label>password</label>
            <input className="password" {...password.inputField}/>
          </div>
          <button type='submit'>login</button>
        </form>
      </>
    )
  }

  const blogForm = () => {
    return(
      <>
        <div>
          <p>Logged in as {user.username}</p>
          <button onClick={handleLogout}>logout</button>
        </div>
        <div>
          <NewBlog blogs={blogs} setBlogs={setBlogs} message={message} setMessage={setMessage}/>
        </div>
        <div>
          <h2>blogs</h2>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user}/> )}
        </div>
      </>
    )
  }

  const handleLogin = async e => {
    e.preventDefault()
    //console.log('Login', username, password)
    try{
      const user = await loginService.login({ username: username.value, password: password.value })
      console.log(user)
      //const user = {username: username, password: password} //testikoodi
      window.localStorage.setItem('user', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setMessage({ ...message, type: 'success', text: 'logged in' })
      setTimeout(() => setMessage({ ...message, type: 'hidden' }), 5000)
      username.resetValue()
      password.resetValue()
    }catch(e){
      setMessage({ ...message, type: 'error', text: 'wrong credentials' })
      setTimeout(() => setMessage({ ...message, type: 'hidden' }), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div className='App'>
      <Notification  message={message} />
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App
