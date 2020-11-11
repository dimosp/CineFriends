import React from 'react';
import {FaBars} from 'react-icons/fa';
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink} from './NavbarElements';


const Navbar = ( {toggle} ) => {
    return (
        <>
        <Nav> 
          <NavbarContainer>
            <NavLogo to='/'>BINGE</NavLogo>
          
            <MobileIcon onClick={toggle}>
              <FaBars/>
            </MobileIcon>

            <NavMenu>
              <NavItem>
                <NavLinks to='Sign Up'>Sign Up</NavLinks>
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
