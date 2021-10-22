import {Badge, Col, Container, Row} from "react-bootstrap";
import BookCard from "./BookCard";

function Shelf(props) {
    return (
        <Container fluid={true}>
            <Row>
                <Badge bg="secondary" style={{ fontSize: 38}}>{props.icon} {props.name}</Badge>
            </Row>
            <Row className='justify-content-md-center'>
                {props.data.map((book, index) => (
                    <Col md="auto" style={{margin: 5}} key={index}>
                        {<BookCard book={book} updateBook={props.updateBook}/>}
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Shelf;