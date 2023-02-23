import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TodoProvider } from '../context/TodoContext'

import TodoForm from './TodoForm'

describe('TodoForm component', () => {
  it('todoform renders', () => {
    render(<TodoProvider><TodoForm /></TodoProvider>)

    const button = screen.getByRole('button')
    const input = screen.getByPlaceholderText(/add todo/i)

    expect(button).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })
})