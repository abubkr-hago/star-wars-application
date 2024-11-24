import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  it('renders the button with the correct label', () => {
    render(<Button label='Click Me' onClick={() => {}} />);

    const button = screen.getByTestId('custom-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
    expect(button).toHaveTextContent('Click Me');
  });

  it('calls the onClick handler when clicked', () => {
    const onClickMock = vi.fn();
    render(<Button label='Click Me' onClick={onClickMock} />);

    const button = screen.getByTestId('custom-button');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
