import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import CardMobile from '../components/dashboard/CardMobile';
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

describe('CardMobile Component', () => {
  it('renders class names correctly', () => {
    render(<CardMobile classes={classes} showBookedOnly={false} />);

    expect(screen.getByText('Yoga')).toBeInTheDocument();
    expect(screen.getByText('Pilates')).toBeInTheDocument();
  });

  it('shows "Join Now" button for live classes', () => {
    render(<CardMobile classes={classes} showBookedOnly={false} />);

    const joinNowButton = screen.getByText('Join Now');
    expect(joinNowButton).toBeInTheDocument();
  });

  it('shows "Book Now" button for non-booked classes', () => {
    render(<CardMobile classes={[{ ...classes[0], status: 'available' }]} showBookedOnly={false} />);

    const bookNowButton = screen.getByText('Book Now');
    expect(bookNowButton).toBeInTheDocument();
  });
});

function sum(a: number, b: number) {
    return a + b;
  }

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });