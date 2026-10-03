import { render, screen } from '@testing-library/react'
import Taskmanager from './Taskmanager'

test('renders My Tasks heading', () => {
  render(<Taskmanager />)

  expect(screen.getByText('My Tasks')).toBeInTheDocument()
})