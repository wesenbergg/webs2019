import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const NewBlog = ({ user, blogs, setBlogs, message, setMessage }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [showForm, setShowForm] = useState(false)

  const handleCreate = async e => {
    e.preventDefault()

    //console.log(newBlog)
    try{
      //HOX! Backend palauttaa id viitteen
      const returnedBlog = await blogService.create(newBlog)
      
      setBlogs(blogs.concat({...returnedBlog, user: user}))
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
        <button className='btn btn-outline-primary btn-lg' onClick={ () => setShowForm(true) }>Create form</button>
      </>
    )
  }

  return(
    <div>
      {!showForm && createButton()}
      <div className={showForm ? '': 'hidden'}>
        <h2>Create new blog</h2>
        <form onSubmit={handleCreate}>
          <div className='row'>
            <div className='form-goup col-sm-6 col-xs-12'>
              <label className='label'>Title</label>
              <input id="newBlogTitle" className='form-control' placeholder='Oma blogi...' value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}/>
            </div>
            <div className='form-group col-sm-6 col-xs-12'>
              <label className='label'>Author</label>
              <input id="newBlogAuthor" className='form-control' placeholder='Mikko Mallikas' value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}/>
            </div>
          </div>
          <div className='form-group'>
            <label className='label'>Url</label>
            <input id="newBlogURL" className='form-control' placeholder='https://...' value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}/>
          </div>
          <button className='btn btn-outline-secondary mx-2' type='submit'>Submit</button>
          <span className='btn btn-outline-secondary' onClick={() => setShowForm(false)}>Cancel</span>
        </form>
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