import {Card, Dropdown, Container, Row, Col, Button} from "react-bootstrap";
import {BsArrowReturnRight, FcGoogle, GiPencil} from "react-icons/all";

function BookCard(props) {

    return (
        <div>
            <Card style={{width: '18rem', height: '40rem'}}>
                <Card.Img variant="top" src={props.book.imageLinks.thumbnail} style={{height: 400}}/>
                <Card.Body>
                    <Card.Title><span style={{fontSize: 15}}>{props.book.title}</span></Card.Title>
                    <Card.Text>
                        {props.book.authors.map((author, index) => (
                            <span key={index} className='text-muted' style={{fontSize: 13}}><GiPencil
                                style={{marginLeft: 6, marginRight: 3}}/>{author}</span>
                        ))}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Container>
                        <Row xs='auto'>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" size='sm'>
                                        <BsArrowReturnRight/> Move
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {props.book.shelf === 'currentlyReading' ?
                                            <Dropdown.Item onClick={() => {
                                            }} active>Currently Reading</Dropdown.Item>
                                            :
                                            <Dropdown.Item onClick={() => {
                                                props.updateBook(props.book, 'currentlyReading')
                                            }}>Currently Reading</Dropdown.Item>}

                                        {props.book.shelf === 'wantToRead' ?
                                            <Dropdown.Item onClick={() => {
                                            }} active>Want to read</Dropdown.Item>
                                            :
                                            <Dropdown.Item onClick={() => {
                                                props.updateBook(props.book, 'wantToRead')
                                            }}>Want to read</Dropdown.Item>}

                                        {props.book.shelf === 'read' ?
                                            <Dropdown.Item onClick={() => {
                                            }} active>Read/Finished</Dropdown.Item>
                                            :
                                            <Dropdown.Item onClick={() => {
                                                props.updateBook(props.book, 'read')
                                            }}>Read/Finished</Dropdown.Item>}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Button variant="outline-dark" size='sm' onClick={() => {
                                    window.open(props.book.previewLink, '_blank')
                                }}><FcGoogle/> Preview</Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Footer>
            </Card>
        </div>
    );

}

export default BookCard;
