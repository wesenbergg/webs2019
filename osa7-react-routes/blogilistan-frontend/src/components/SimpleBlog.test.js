import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = { title: 'Title', author: 'Author', likes: 0 }

  const component = render(
    <SimpleBlog blog={blog} onClick={() => console.log('click')}/>
  )

  expect(component.container).toHaveTextContent( 'Title Author' )
  expect(component.container).toHaveTextContent( 'blog has 0 likes' )
})

test('click test', () => {
  const blog = { title: 'Title', author: 'Author', likes: 0 }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler}/>
  )

  const button = getByText('like')

  //const button = component.container.querySelector('.note')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})