import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const PrettyButton = styled(Link)({
  textDecoration: 'none',
  backgroundColor: '#A3826C',
  color: 'white',
  borderRadius: '50px',
  padding: '10px 15px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#C8B4A7',
    cursor: 'pointer',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    transform: 'scale(1.05)',
  },
});

export const BrownButton = ({ page, onClick, text }) => {
  let pagelink = page;
  if (page === "RSVP") {
    pagelink = "/rsvp";
  }
  return (
    <PrettyButton to={pagelink} onClick={onClick}>
      {text}
    </PrettyButton>
  );
}
