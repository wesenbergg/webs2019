import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {

  //console.log(users)
  return (
    <div>
      <h4>Users</h4>
      <ul className="list-group blogilista bg-light">
        {users.map(user =>
          <li key={Math.floor(Math.random() * 999999)} className="list-group-item bg-light kayttajalista">
            <Link to={`/users/u/${user.id}`} className="no-style">
              <div className="row justify-content-between">
                <div>
                  <p className="font-weight-bold">{user.name}</p>
                  <p>@<span className="text-primary">{user.username}</span></p>
                </div>
                <p className="text-muted">Added blogs: {user.blogs.length}</p>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Users