import react, {Component} from "react";
import {Badge, Card, Col, Container, Row} from "react-bootstrap";
import BookCard from "./BookCard";

class Shelve extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid={true}>
                <Row className='justify-content-md-center d-flex flex-fill'>
                    <Col md="auto">
                        <Badge bg="secondary" style={{margin: 10, fontSize: 34}}>{this.props.name}</Badge>
                    </Col>
                </Row>
                <Row className='justify-content-md-center'>
                    {this.props.data.map(book => (
                        <Col md="auto" style={{margin: 10}}>
                            {<BookCard title= {book.title} img = {book.imageLinks.thumbnail} authors = {book.authors}/>}
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

export default Shelve;