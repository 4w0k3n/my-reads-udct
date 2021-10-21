import react, {Component} from "react";
import {ButtonGroup, Card, DropdownButton, Dropdown, Container, Row, Col, Button} from "react-bootstrap";
import {BsArrowReturnRight, FcGoogle, GiPencil} from "react-icons/all";

class BookCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card style={{ width: '18rem' , height: '35rem'}}>
                    <Card.Img variant="top" src={this.props.img} style={{height: 400}} />
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>
                            {this.props.authors.map(author => (
                                <span className='text-muted' style={{fontSize: 13}}><GiPencil style={{marginLeft: 10, marginRight: 5}}/>{author}</span>
                            ))}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Container>
                            <Row xs='auto'>
                                <Col >
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" size='sm'>
                                            <BsArrowReturnRight/> Move
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                    <Button variant="outline-dark" size='sm'><FcGoogle/>Preview</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}
export default BookCard;
