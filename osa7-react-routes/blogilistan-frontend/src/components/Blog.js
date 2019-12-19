import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user }) => {
  const [likes, setLikes] = useState(blog === undefined ? 0: blog.likes)
  const [deleted, setDeleted] = useState(false)

  //prevents crash if unable reach data
  if(blog === undefined || user === undefined ) return null

  const handleLike = async () => {
    try{
      setLikes(likes+1)
      const updatedBlog =  { user: blog.user.id, likes: ++blog.likes, author: blog.author, title: blog.author, url: blog.author }
      await blogService.update(blog.id, updatedBlog)
      setLikes(likes+1)
    }catch(e){
      console.log('error')
    }
  }

  const handleDelete = async () => {
    try{
      blogService.deleteBlog(blog.id)
      setDeleted(true)
    }catch(e){
      console.log('error')
    }
  }

  return(
    <div className={deleted ? 'hidden': 'blog'}>
      <div className="blog-title">
        <h2>{blog.title} {blog.author}</h2>
        <p className="text-muted">added by @{(blog.user && blog.user.username) || 'john doe'}</p>
      </div>

      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>{likes} like(s)</div>
        <div className="row my-2">
          <button className="btn btn-outline-secondary mx-3" onClick={handleLike}>like</button>
          <button className={blog.user && (user.username === blog.user.username) ? 'btn btn-outline-secondary delete' : 'hidden'} onClick={handleDelete}>delete</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog