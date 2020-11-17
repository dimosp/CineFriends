import React from 'react';
import {FaBars} from 'react-icons/fa';
import { Nav, NavbarContainer, NavLogo, NavIcon, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink} from './NavbarElements';

const Navbar = ( {toggle} ) => {
    return (
        <>
        <Nav> 
          <NavbarContainer>
            <NavLogo to='/'>
              <NavIcon/>
              Binge
            </NavLogo>
          
            <MobileIcon onClick={toggle}>
              <FaBars/>
            </MobileIcon>

            <NavBtn>
              <NavBtnLink to='/signin'>Sign In</NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </>
    )
}

export default Navbar
