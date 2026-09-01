import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import LoginForm from './LoginForm'

function renderLoginForm() {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
  )
}

describe('LoginForm', () => {
  it('starts with the submit button disabled', () => {
    renderLoginForm()
    expect(screen.getByRole('button', { name: /log in/i })).toBeDisabled()
  })

  it('enables the submit button once both fields are valid', async () => {
    renderLoginForm()
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUser' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'validPass' } })

    await waitFor(() => expect(screen.getByRole('button', { name: /log in/i })).toBeEnabled())
  })

  it('keeps the submit button disabled while a field is too short', async () => {
    renderLoginForm()
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'abc' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'validPass' } })

    await waitFor(() => expect(screen.getByRole('button', { name: /log in/i })).toBeDisabled())
  })

  it('toggles the password field between hidden and visible', () => {
    renderLoginForm()
    const passwordInput = screen.getByLabelText('Password')
    expect(passwordInput).toHaveAttribute('type', 'password')

    fireEvent.click(screen.getByRole('button', { name: /show password/i }))
    expect(passwordInput).toHaveAttribute('type', 'text')

    fireEvent.click(screen.getByRole('button', { name: /hide password/i }))
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
})
