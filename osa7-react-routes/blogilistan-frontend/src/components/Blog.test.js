import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('renders content', () => {
  const blog = { title: 'Title', author: 'Author', likes: 0, url: 'www', user: { username: 'user' } }
  const user = { username: 'user' }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const div = component.container.querySelector('.hidden')
  expect(div).not.toHaveTextContent( 'Title' )
  expect(div).toHaveTextContent( 'www' )

  expect(component.container).toHaveTextContent( 'Title Author' )
})

test('click test', () => {
  const blog = { title: 'Title', author: 'Author', likes: 0, url: 'www', user: { username: 'user' } }
  const user = { username: 'user' }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.container.querySelector('.blog-title')
  //const button = component.container.querySelector('.note')
  fireEvent.click(button)

  const expandedBlog = component.container.querySelector('.expandedBlog')

  expect(component.container).toHaveTextContent( 'Title Author' )
  expect(expandedBlog).toBeDefined()
})