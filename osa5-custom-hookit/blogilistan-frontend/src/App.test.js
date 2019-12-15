import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    ) 

    //etsittävät komponentit
    const login = component.container.querySelectorAll('.loginForm')
    const blogs = component.container.querySelectorAll('.blog')
    
    expect(login.length).toBe(1) //tarkista: renderöidään kirjautumislomake
    expect(blogs.length).toBe(0) //tarkista: ei renderöidä blogeja
  })

  test('if user logged, notes are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    
    localStorage.setItem('user', JSON.stringify(user))

    const component = render( <App /> )
    component.rerender(<App />)

    await waitForElement( () => component.getByText('logout') )

    //etsittävät komponentit
    const login = component.container.querySelectorAll('.loginForm')
    const blogs = component.container.querySelectorAll('.blog')
    
    expect(login.length).toBe(0) //tarkista: ei renderöidä kirjautumislomake
    expect(blogs.length).toBe(1) //tarkista: renderöidään blogeja
  })
})