import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableComponent from '../components/dashboard/TableComponent';
import { Class } from '../interface/InterfaceItem';

const classes: Class[] = [
  {
    id: 1,
    className: 'Yoga',
    instructor: 'John Doe',
    schedule: new Date(Date.now() + 3600000).toISOString(), // 1 hour in the future
    status: 'booked',
    image: 'path-to-image',
  },
  {
    id: 2,
    className: 'Pilates',
    instructor: 'Jane Smith',
    schedule: new Date(Date.now() - 3600000).toISOString(), // 1 hour in the past
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
    expect(screen.queryByText('Pilates')).not.toBeInTheDocument();
  });

  it('shows "Join Now" button for live classes', () => {
    render(<TableComponent classes={classes} showBookedOnly={false} />);

    const joinNowButton = screen.getByText('Join Now');
    expect(joinNowButton).toBeInTheDocument();
  });

  it('shows "Book Now" button for non-booked classes', () => {
    render(<TableComponent classes={[{ ...classes[0], status: 'available' }]} showBookedOnly={false} />);

    const bookNowButton = screen.getByText('Book Now');
    expect(bookNowButton).toBeInTheDocument();
  });

  it('opens modal when "Join Now" is clicked', () => {
    render(<TableComponent classes={classes} showBookedOnly={false} />);
    
    const joinNowButton = screen.getByText('Join Now');
    fireEvent.click(joinNowButton);

    expect(screen.getByText('Do you want to join the class?')).toBeInTheDocument();
  });
});