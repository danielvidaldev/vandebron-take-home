import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectorGroup, { type SelectorItem } from './SelectorGroup';

const items: SelectorItem[] = [
  { id: 'a', label: 'Item A', icon: <span data-testid="icon-a">A</span> },
  { id: 'b', label: 'Item B', icon: <span data-testid="icon-b">B</span> },
  { id: 'c', label: 'Item C', icon: <span data-testid="icon-c">C</span> },
];

describe('SelectorGroup', () => {
  it('renders the correct number of buttons', () => {
    render(<SelectorGroup items={items} value="a" onChange={() => {}} />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('marks the selected item with aria-selected', () => {
    render(<SelectorGroup items={items} value="b" onChange={() => {}} />);
    expect(screen.getByLabelText('Item B')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByLabelText('Item A')).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByLabelText('Item C')).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange with the correct id when clicked', async () => {
    const onChange = vi.fn();
    render(<SelectorGroup items={items} value="a" onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Item C'));
    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('renders icons inside buttons', () => {
    render(<SelectorGroup items={items} value="a" onChange={() => {}} />);
    expect(screen.getByTestId('icon-a')).toBeInTheDocument();
    expect(screen.getByTestId('icon-b')).toBeInTheDocument();
    expect(screen.getByTestId('icon-c')).toBeInTheDocument();
  });
});
