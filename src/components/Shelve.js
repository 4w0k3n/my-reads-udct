import {Badge, Col, Container, Row} from "react-bootstrap";
import BookCard from "./BookCard";

function Shelve(props)
{
    return (
        <Container fluid={true}>
            <Row className='justify-content-md-center d-flex flex-fill'>
                <Col md="auto">
                    <Badge bg="secondary" style={{margin: 10, fontSize: 34}}>{props.icon} {props.name}</Badge>
                </Col>
            </Row>
            <Row className='justify-content-md-center'>
                {props.data.map((book, index) => (
                    <Col md="auto" style={{margin: 10}} key={index}>
                        {<BookCard book={book} updateBook={props.updateBook}/>}
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Shelve;