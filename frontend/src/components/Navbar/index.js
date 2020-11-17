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
              BINGE
            </NavLogo>
          
            <MobileIcon onClick={toggle}>
              <FaBars/>
            </MobileIcon>

            <NavMenu>
              <NavItem>
                <NavLinks to='/Signup'>Sign Up</NavLinks>
              </NavItem>

              <NavItem>
                <NavLinks to='About'>About</NavLinks>
              </NavItem>
            </NavMenu>

            <NavBtn>
              <NavBtnLink to='/Signin'>Sign In</NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </>
    )
}

export default Navbar
