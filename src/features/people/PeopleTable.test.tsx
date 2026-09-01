import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PeopleTable from './PeopleTable'
import type { PeopleState } from './usePeople'

const SUCCESS_STATE: PeopleState = {
  status: 'success',
  people: [
    { name: 'Luke Skywalker', mass: '77', height: '172', hair_color: 'blond', skin_color: 'fair' },
  ],
  hasNext: false,
  hasPrevious: false,
}

describe('PeopleTable', () => {
  it('shows height in centimeters and mass in kilograms by default', () => {
    render(<PeopleTable state={SUCCESS_STATE} />)

    expect(screen.getByRole('cell', { name: '172' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: '77' })).toBeInTheDocument()
    expect(screen.getByText('Height (cm)')).toBeInTheDocument()
    expect(screen.getByText('Mass (kg)')).toBeInTheDocument()
  })

  it('converts height to meters and mass to pounds without a new fetch when switched', () => {
    render(<PeopleTable state={SUCCESS_STATE} />)

    fireEvent.click(screen.getByRole('button', { name: 'm' }))
    fireEvent.click(screen.getByRole('button', { name: 'lb' }))

    expect(screen.getByRole('cell', { name: '1.72' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: '169.8' })).toBeInTheDocument()
    expect(screen.getByText('Height (m)')).toBeInTheDocument()
    expect(screen.getByText('Mass (lb)')).toBeInTheDocument()
  })
})
