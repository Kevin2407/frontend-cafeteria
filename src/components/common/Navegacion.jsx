import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

class Navegacion extends Component {
    render() {
        return (
            <Navbar bg="danger" variant='dark' expand="lg">
                <Container>
                    <Navbar.Brand href="/">CRUD Basico</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink exact={true} to='/' className='nav-link' >Inicio</NavLink>
                            <NavLink exact={true} to='/productos' className='nav-link' >Productos</NavLink>
                            <NavLink exact={true} to='/productos/nuevo' className='nav-link' >Agregar producto</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Navegacion;