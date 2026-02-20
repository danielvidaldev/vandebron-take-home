import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResidentsSelector from './ResidentsSelector';

describe('ResidentsSelector', () => {
  it('renders 5 resident option buttons', () => {
    render(<ResidentsSelector value={1} onChange={() => {}} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('marks the correct button as selected', () => {
    render(<ResidentsSelector value={3} onChange={() => {}} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[2]).toHaveAttribute('aria-selected', 'true');
    expect(buttons[0]).toHaveAttribute('aria-selected', 'false');
    expect(buttons[1]).toHaveAttribute('aria-selected', 'false');
    expect(buttons[3]).toHaveAttribute('aria-selected', 'false');
    expect(buttons[4]).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange with correct resident count when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ResidentsSelector value={1} onChange={onChange} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[2]);
    expect(onChange).toHaveBeenCalledWith(3);
  });
});
