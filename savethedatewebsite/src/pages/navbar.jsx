import { AppBar, Box, Toolbar } from "@mui/material";
import { styled } from '@mui/system';
import WeddingLogo from '../assets/logo.png';
import { BrownButton } from "./brownbutton";
import { Link } from 'react-router-dom';

const Nav = styled(AppBar)({
  backgroundColor: '#E9E8E7',
  color: 'black',
  boxShadow: 'none',
  marginBottom: '30px',
});

const ToolBarStyled = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 4rem 0rem !important',
});

const LogoContainer = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
});

const Logo = styled('img')({
  height: '40px',
  marginRight: '1rem',
});

const NavLinks = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
});

export const NavBar = () => {
  return (
    <Nav position="static">
      <ToolBarStyled>
        <LogoContainer to={"/"}>
          <Logo src={WeddingLogo} alt="Wedding Logo" />
        </LogoContainer>
        <NavLinks>
          <BrownButton page="RSVP" text="Submit Details" />
        </NavLinks>
      </ToolBarStyled>
    </Nav>
  );
}
