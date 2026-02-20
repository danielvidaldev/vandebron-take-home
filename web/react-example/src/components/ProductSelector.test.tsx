import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductSelector from './ProductSelector';

describe('ProductSelector', () => {
  it('renders both product option buttons', () => {
    render(<ProductSelector value="electricity" onChange={() => {}} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('marks the selected product with aria-selected', () => {
    render(<ProductSelector value="electricity" onChange={() => {}} />);
    const selected = screen.getByRole('button', { name: 'Stroom' });
    expect(selected).toHaveAttribute('aria-selected', 'true');
  });

  it('does not select other products', () => {
    render(<ProductSelector value="electricity" onChange={() => {}} />);
    const gasButton = screen.getByRole('button', { name: 'Stroom & Gas' });
    expect(gasButton).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange when a product is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ProductSelector value="electricity" onChange={onChange} />);
    const gasButton = screen.getByRole('button', { name: 'Stroom & Gas' });
    await user.click(gasButton);
    expect(onChange).toHaveBeenCalledWith('electricity-and-gas');
  });
});
