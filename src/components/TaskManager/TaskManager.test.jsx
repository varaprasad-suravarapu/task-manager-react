import { render, screen } from '@testing-library/react'
import TaskManager from './TaskManager'

test('renders My Tasks heading', () => {
  render(<TaskManager />)

  expect(screen.getByText('My Tasks')).toBeInTheDocument()
})