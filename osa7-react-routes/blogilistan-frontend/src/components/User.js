import React from 'react'

const User = ({ user }) => {
  //console.log(user)
  if ( user === undefined || user.blogs === undefined)  return null

  return (
    <div>
      <h2>User page</h2>
      <h3>{user.name} @{user.username}</h3>
      <p>Added blogs: {user.blogs.length}</p>
      <ul>
        {user.blogs.map(blog =>
          <li key={Math.floor(Math.random() * 999999)} >
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default User