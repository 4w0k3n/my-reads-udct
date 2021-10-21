import react, {Component} from "react";
import {Link} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import {BsBookshelf, BsSearch, ImBooks} from "react-icons/all";

function Navigation() {
    return (
        <Navbar bg="dark" variant="dark" style={{marginBottom: 10}}>
            <Navbar.Brand as={Link} to='/' style={{marginLeft: 20}}> <ImBooks style={{marginRight: 5}}/> My
                Books</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to='/' style={{marginLeft: 20}}> <BsBookshelf style={{marginRight: 5}}/> Book
                    Shelves </Nav.Link>
                <Nav.Link as={Link} to='/search' style={{marginLeft: 20}}> <BsSearch style={{marginRight: 5}}/> Search
                </Nav.Link>
            </Nav>
        </Navbar>
    );

}
export default Navigation;