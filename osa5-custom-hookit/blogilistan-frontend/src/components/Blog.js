import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user }) => {
  const [deleted, setDeleted] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [showMore, setShowMore] = useState(false)
  let blogStyle = { paddingTop: 10, paddingLeft: 2, border: 'solid', marginBottom: 5 }

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
    <div className={deleted ? 'hidden': ''} style={blogStyle}>
      <div onClick={() => setShowMore(!showMore)}>
        {blog.title} {blog.author}
      </div>

      <div className={showMore ? '' : 'hidden'}>
        <a href={blog.url}>{blog.url}</a>
        <div>{likes}like(s) <button onClick={handleLike}>like</button></div>
        <p>added by {(blog.user && blog.user.username) || 'john doe'}</p>
        <button className={blog.user && (user.username === blog.user.username) ? '' : 'hidden'} onClick={handleDelete}>delete</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog