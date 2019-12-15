const notes = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML is easy',
    author: 'Kissa',
    likes: 0,
    url: "www",
    user: {
      id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
]

let token = ""

const getAll = () => {
  return Promise.resolve(notes)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }