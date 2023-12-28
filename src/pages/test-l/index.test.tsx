import { render,screen } from '@testing-library/react'
import React  from 'react'
import TestApp1 from './index'

describe("test component", () => {
  it('cc', () => {
    render(<TestApp1 />)
    expect(screen.getByText(/test-l/)).toBeInTheDocument();
  })
})