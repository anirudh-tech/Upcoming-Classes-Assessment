import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import CardMobile from '../components/dashboard/CardMobile';
import { Class } from '../interface/InterfaceItem';

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

describe('CardMobile Component', () => {
  it('renders class names correctly', () => {
    render(<CardMobile classes={classes} showBookedOnly={false} />);

    expect(screen.getByText('Yoga')).toBeInTheDocument();
    expect(screen.getByText('Pilates')).toBeInTheDocument();
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
    render(<CardMobile classes={[liveClass]} showBookedOnly={false} />);

    const joinNowButton = screen.getByText('Join Now');
    expect(joinNowButton).toBeInTheDocument();
  });

  it('shows "Book Now" button for non-booked classes', () => {
    render(<CardMobile classes={[{ ...classes[0], status: 'available' }]} showBookedOnly={false} />);

    const bookNowButton = screen.getByText('Book Now');
    expect(bookNowButton).toBeInTheDocument();
  });
});


