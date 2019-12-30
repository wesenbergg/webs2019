import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Loginform'
import { Query, Mutation } from 'react-apollo'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import AuthorForm from './components/AuthorForm'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const CURRENTUSER = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

const ALL_AUHTORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
query allBooks($author: String, $genre: String){
  allBooks(
    author: $author,
    genre: $genre
  ) {
    title
    published
    genres
    author{
      name
    }
  }
}
`
/*
const ALL_BOOKS = gql`
{
  allBooks {
    title
    published
    genres
    author{
      name
    }
  }
}
`
*/

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    published
    genres
  }
}
`

const UPDATE_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!){
  editAuthor(
    name: $name,
    born: $born
  ) {
    name
    bookCount
  }
}
`

const App = () => {
  const client = useApolloClient()

  const { loading, error, data } = useQuery(CURRENTUSER)

  const [filter, setFilter] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  //const [selectedAuthor, setSelectedAuthor] = useState('author')
  const [name, setName] = useState('')

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  if (!token) {
    if(window.localStorage.getItem('library-user-token')) setToken(window.localStorage.getItem('library-user-token'))
    return (
      <div>
        {errorNotification()}
        <h2>Login</h2>
        <LoginForm
          login={login}
          setToken={(token) => setToken(token)}
        />
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setFilter(null) || setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setFilter(data.me.favoriteGenre) || setPage('books')}>recommend</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Query query={ALL_AUHTORS}>
        { (result) => <Authors result={result} show={page === 'authors'} select={setName}/> }
      </Query>

      <Query query={ALL_BOOKS} variables={({ genre: filter })}>
        { (result) => <Books result={result} show={page === 'books'} filter={filter} setFilter={setFilter} /> }
      </Query>

      <Mutation mutation={CREATE_BOOK} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUHTORS }]}>
        {(addBook) =>
          <NewBook show={page === 'add'} addBook={addBook} />
        }
      </Mutation>

      <Mutation mutation={UPDATE_AUTHOR} refetchQueries={[{ query: ALL_AUHTORS }]}>
        {(editAuthor) =>
          <AuthorForm show={page === 'authors'} editAuthor={editAuthor} name={name} />
        }
      </Mutation>
    </div>
  )
}

export default App