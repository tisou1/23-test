import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React from 'react'
import TestApp1 from './index'

describe('test component', () => {
  it('基本渲染', () => {
    render(<TestApp1 />)
    expect(screen.getByText(/test-l/)).toBeInTheDocument()
  })

  it('用户事件', async () => {
    render(<TestApp1 classname="test-input" />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    await userEvent.type(input, '1377')
    expect(input).toHaveValue('1377')
  })
})
