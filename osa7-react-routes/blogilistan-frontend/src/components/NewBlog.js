import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const NewBlog = ({ blogs, setBlogs, message, setMessage }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [showForm, setShowForm] = useState(false)

  const handleCreate = async e => {
    e.preventDefault()

    //console.log(newBlog)
    try{
      await blogService.create(newBlog)
      setBlogs(blogs.concat(newBlog))
      setMessage({ ...message, type: 'success', text: `addded ${newBlog.title} to bloglist` })
      setTimeout(() => setMessage({ ...message, type: 'hidden' }), 5000)
      setNewBlog({ title: '', author: '', url: '' })
      setShowForm(false)
    }catch(e){
      setMessage({ ...message, type: 'error', text: 'oops! something went wrong while adding blog to list. try again later' })
      setTimeout(() => setMessage({ ...message, type: 'hidden' }), 5000)
    }
  }

  const createButton = () => {
    return(
      <>
        <button onClick={ () => setShowForm(true) }>Create form</button>
      </>
    )
  }

  return(
    <div>
      {!showForm && createButton()}
      <div className={showForm ? '': 'hidden'}>
        <h2>Create new blog</h2>
        <form onSubmit={handleCreate}>
          <div>
            <label>Title</label>
            <input value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}/>
          </div>
          <div>
            <label>Author</label>
            <input value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}/>
          </div>
          <div>
            <label>Url</label>
            <input value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}/>
          </div>
          <button type='submit'>New blog</button>
        </form>
        <button onClick={() => setShowForm(false)}>Cancel</button>
      </div>
    </div>
  )
}

//NewBlog = ({blogs, setBlogs, message, setMessage
NewBlog.propTypes = {
  blogs: PropTypes.array.isRequired,
  message: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}

export default NewBlog