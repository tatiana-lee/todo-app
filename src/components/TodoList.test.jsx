import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TodoProvider } from '../context/TodoContext'

import TodoList from './TodoList'

describe('TodoList component', () => {
  it('todolist renders', () => {
    render(<TodoProvider><TodoList /></TodoProvider>)

    const img = screen.getByRole('img')

    expect(img).toBeInTheDocument()
  })
})