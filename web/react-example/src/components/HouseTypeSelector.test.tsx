import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HouseTypeSelector from './HouseTypeSelector';

describe('HouseTypeSelector', () => {
  it('renders all 5 house type buttons', async () => {
    render(<HouseTypeSelector value="apartment" onChange={() => {}} />);
    const buttons = await screen.findAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('marks the selected house type with aria-selected', async () => {
    render(<HouseTypeSelector value="apartment" onChange={() => {}} />);
    const button = await screen.findByRole('button', { name: 'apartment' });
    expect(button).toHaveAttribute('aria-selected', 'true');
  });

  it('does not select any button for an unknown value', async () => {
    render(<HouseTypeSelector value="something-made-up" onChange={() => {}} />);
    const buttons = await screen.findAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-selected', 'false');
    });
  });

  it('calls onChange when a button is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<HouseTypeSelector value="apartment" onChange={onChange} />);
    const townhouseButton = await screen.findByRole('button', { name: 'townhouse' });
    await user.click(townhouseButton);
    expect(onChange).toHaveBeenCalledWith('townhouse');
  });
});
