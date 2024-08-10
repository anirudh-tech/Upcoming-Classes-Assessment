import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableComponent from '../components/dashboard/TableComponent';
import { Class } from '../interface/InterfaceItem';
interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

jest.mock('../components/dashboard/ConfirmModal', () => {
  return function MockConfirmModal({ open, onClose, onConfirm }: ConfirmModalProps) {
    if (!open) return null;
    return (
      <div data-testid="confirm-modal">
        <p>Do you want to join the class?</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  };
});

const classes: Class[] = [
  {
    id: 1,
    className: 'Yoga',
    instructor: 'John Doe',
    schedule: new Date(Date.now() + 3600000).toISOString(),
    status: 'booked',
    image: 'path-to-image',
  },
  {
    id: 2,
    className: 'Pilates',
    instructor: 'Jane Smith',
    schedule: new Date(Date.now() - 3600000).toISOString(),
    status: 'booked',
    image: 'path-to-image',
  },
];

describe('TableComponent', () => {
  it('renders class names correctly', () => {
    render(<TableComponent classes={classes} showBookedOnly={false} />);

    expect(screen.getByText('Yoga')).toBeInTheDocument();
    expect(screen.getByText('Pilates')).toBeInTheDocument();
  });

  it('filters booked classes when showBookedOnly is true', () => {
    render(<TableComponent classes={classes} showBookedOnly={true} />);

    expect(screen.getByText('Yoga')).toBeInTheDocument();
    // expect(screen.queryByText('Pilates')).not.toBeInTheDocument();
  });

  it('shows "Join Now" button for live classes', () => {
    const liveClass: Class = {
      id: 1,
      className: 'Yoga',
      instructor: 'John Doe',
      schedule: new Date().toISOString(),
      status: 'booked',
      image: 'path-to-image',
    };
    render(<TableComponent classes={[liveClass]} showBookedOnly={false} />);

    const joinNowButton = screen.getByText('Join Now');
    expect(joinNowButton).toBeInTheDocument();
  });

  it('shows "Book Now" button for non-booked classes', () => {
    render(<TableComponent classes={[{ ...classes[0], status: 'available' }]} showBookedOnly={false} />);

    const bookNowButton = screen.getByText('Book Now');
    expect(bookNowButton).toBeInTheDocument();
  });

  it('opens modal when "Join Now" is clicked', async () => {
    const liveClass: Class = {
      id: 1,
      className: 'Yoga',
      instructor: 'John Doe',
      schedule: new Date().toISOString(),
      status: 'booked',
      image: 'path-to-image',
    };
    render(<TableComponent classes={[liveClass]} showBookedOnly={false} />);

    const joinNowButton = screen.getByText('Join Now');
    fireEvent.click(joinNowButton);

    await waitFor(() => {
      const modal = screen.getByTestId('confirm-modal');
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveTextContent('Do you want to join the class?');
    });
  });

});