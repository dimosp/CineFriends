import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { FcFilmReel } from 'react-icons/fc'


export const Nav = styled.nav`
    background: #000;
    height: 80px;
    margin-top: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10; 

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
    `;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1200px;`
    ;


export const NavLogo = styled(LinkR)`
    color: #6495ED;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
`;

export const NavIcon = styled(FcFilmReel)`
    margin-right: 0.5rem;
    font-size: 4rem;
`

export const MobileIcon = styled.div`
    display: none;
    
    @media screen and (max-width: 768px) {
        color: #fff;
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: 100px;


    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavItem = styled.li `
    height: 80px;
`;

// No need i think
export const NavLinks = styled(LinkR) `
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 2rem;
    height: 100%;
    cursor: pointer;

    &:active {
        border-bottom: 3px solid #6495ED;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center; 

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavBtnLink = styled(LinkR)`
    border-radius: 50px;
    background: #6495ed;
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`;
