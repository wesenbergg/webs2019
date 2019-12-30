import React from 'react'

const Books = (props) => {
  console.log(props.result)
  if (!props.show) return null

  if (props.result.loading)
    return <div>loading...</div>

  let books = props.result.data.allBooks
  
  //Huono tapa
  let genres = []
  books.map(b => b.genres.map(g => genres.push(g)))
  genres = [...new Set(genres)]

  const showBooks = () => {
    //books = props.filter ? props.result.data.allBooks.filter(b => b.genres.includes(props.filter)): props.result.data.allBooks
    return books.map(a =>
      <tr key={a.title}>
        <td>{a.title}</td>
        <td>{a.author.name}</td>
        <td>{a.published}</td>
      </tr>
    )
  }

  const handleGenreClick = ({target}) => {
    props.setFilter(target.value)
    props.result.refetch()
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {showBooks()}
        </tbody>
      </table>

      <div>
        <button value="" onClick={() => props.setFilter(null) || props.result.refetch()}>All</button>
        {genres.map(g =>
          <button value={g} onClick={handleGenreClick}>{g}</button>
        )}
      </div>
    </div>
  )
}

export default Books