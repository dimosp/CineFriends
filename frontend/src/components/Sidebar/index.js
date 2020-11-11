import React from 'react';
import {SidebarContainer, CloseIcon, Icon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute } from './SidebarElements';

const Sidebar = ( { isOpen, toggle }) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>

            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to='Sign Up' onClick={toggle}>Sign Up</SidebarLink>
                    <SidebarLink to='About' onClick={toggle}>About</SidebarLink>
                </SidebarMenu>
             <SideBtnWrap>
                 <SidebarRoute yo='/Signin' onClick={toggle}>Sign In</SidebarRoute>
                 </SideBtnWrap>   
            </SidebarWrapper>    
        </SidebarContainer>
    )
}

export default Sidebar
