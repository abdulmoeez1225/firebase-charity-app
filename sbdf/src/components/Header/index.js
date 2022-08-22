import React from 'react'
import {NavLink} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import history from '../../routes/history'
import './styles.scss'

// Assets
import logo from '../../assets/logo.png'


const Header = () => {

  return (
    <Navbar className="main-header" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand onClick={() => history.push('/')}><img src={logo} alt="logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
                <NavLink to="/" className={'nav-link'}>Home</NavLink>
                <NavLink to="/about" className={'nav-link'}>About</NavLink>
                <NavLink to="/contact" className={'nav-link'}>Contact</NavLink>
            </Nav>
            <Nav className="social-icons">
                <Nav.Link href="#"><FaFacebookF/></Nav.Link>
                <Nav.Link href="#link"><FaTwitter/></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header