import {Link} from "react-router-dom";
import {Button, Nav, Navbar} from "react-bootstrap";
import {BsBookshelf, BsGithub, BsSearch, ImBooks} from "react-icons/all";

function Navigation() {
    return (
        <div>
            <Navbar sticky='top' bg="dark" variant="dark">
                <Navbar.Brand as={Link} to='/' style={{marginLeft: 20}}> <ImBooks style={{marginRight: 5}}/> My
                    Reads</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to='/' style={{marginLeft: 20}}> <BsBookshelf style={{marginRight: 5}}/> Book
                        Shelves </Nav.Link>
                    <Nav.Link as={Link} to='/search' style={{marginLeft: 20}}> <BsSearch
                        style={{marginRight: 5}}/> Search
                    </Nav.Link>
                    <Nav.Link as={Button} variant='outline-dark' style={{marginLeft: 20}} onClick={()=> window.window.open('https://github.com/4w0k3n/my-reads-udct', '_blank')}> <BsGithub style={{marginRight: 5}}/> GitHub
                    </Nav.Link>
                </Nav>
            </Navbar>

        </div>
    );

}

export default Navigation;