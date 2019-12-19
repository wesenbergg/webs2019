import React, { useState, useEffect } from 'react'
import  { useField } from './hooks'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import Blog from './components/Blog'
import User from './components/User'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import './index.css'

const Menu = ({ user, setUser }) => {
  const padding = { paddingRight: 5 }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  if(user === null) return null
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <span className='navbar-brand'><i className="fas fa-book-open"></i>Blogilista</span>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarText' aria-controls='navbarText' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarText'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link style={padding} className='nav-link' to='/'>Blogit</Link>
            </li>
            <li className='nav-item'>
              <Link style={padding} className='nav-link' to='/users'>Kayttajat</Link>
            </li>
          </ul>
          <div>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item px-3'><p className='navbar-text'>Logged in as {user.username}</p></li>
              <li className='nav-item'><button className='btn btn-outline-primary' onClick={handleLogout}>logout</button></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const username = useField('text')
  const password = useField('password')

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ type: 'hidden', text: '' })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
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

  useEffect(() => {
    const initiateUsers = async () => {
      const initialUsers = await userService.getAll()
      setUsers(initialUsers)
    }
    initiateUsers()
  }, [])

  const loginForm = () => {
    return(
      <div className='container my-5 text-center'>
        <h2 className=''><i className="fas fa-book-open"></i> Fill in credentials</h2>
        <form onSubmit={handleLogin} className='loginForm'>
          <div className='form-group'>
            <label className='text-muted'>Username</label>
            <input id="username" className='username form-control mx-auto' placeholder='Username' {...username.inputField}/>
          </div>
          <div className='form-group'>
            <label className='text-muted'>Password</label>
            <input id="password" className='password form-control mx-auto' placeholder='*********' {...password.inputField}/>
          </div>
          <button className='btn btn-outline-secondary' type='submit'>login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    //<Blog key={blog.id} blog={blog} user={user}/>
    //console.log(blogs)
    return(
      <>
        <div>
          <NewBlog user={user} blogs={blogs} setBlogs={setBlogs} message={message} setMessage={setMessage}/>
        </div>
        <div className='my-4'>
          <h2>Blogs</h2>
          <ul className='px-0 blogilista'>
            {blogs.map(blog =>
              <li key={Math.floor(Math.random()*999999)} className='list-group-item' >
                <div className='row justify-content-between'>
                  <div>
                    <Link className="blogilinkki" to={`/blogs/b/${blog.id}`}>{blog.title}</Link>
                    <p><small className='text-muted'>added by @{(blog.user && blog.user.username) || 'john doe'}</small></p>
                  </div>
                  <p className='text-muted'>{blog.likes} vote(s)</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </>
    )
  }

  const userById = (id) =>
    users.find(u => u.id === id)

  const blogById = (id) =>
    blogs.find(b => b.id === id)

  const content = () => {
    return(
      <>
        <div className='container my-5'>
          <Route exact path='/' render={() => blogForm()} />
          <Route exact path='/blogs/b/:id' render={({ match }) => <Blog blog={blogById(match.params.id)} user={user} /> } />
          <Route exact path='/users' render={() => <Users users={users} />} />
          <Route exact path='/users/u/:id' render={({ match }) => <User user={userById(match.params.id)}/>} />
        </div>
      </>
    )
  }

  const footer = () =>
    <footer className='container text-center'>
      <p>&copy;2019 <a href='https://github.com/wesenbergg' rel="noopener noreferrer" target='_blank'>boriss jerjomkin</a></p>
    </footer>

  const handleLogin = async e => {
    e.preventDefault()

    try{
      const user = await loginService.login({ username: username.value, password: password.value })
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

  return (
    <div className='App'>
      <Router>
        <Menu setUser={setUser} user={user} />
        <Notification  message={message} />
        {user === null && loginForm()}
        {user !== null && content()}
        {footer()}
      </Router>
    </div>
  )
}

export default App
