import react, {Component} from "react";
import Navigation from "../components/Navigation";
import Shelve from "../components/Shelve";
import {Col, Container, Row} from "react-bootstrap";
import {getAll} from "../api/BooksAPI";
class BookShelves extends Component {

    constructor(props) {
        super(props);
        this.state = {
                wantToRead: [],
                currentlyReading: [],
                read: []
        }
    }

    getBooks = () => {
        getAll().then( res => {
            res.forEach(book => {
                console.log(res);
                if(book.shelf === 'currentlyReading'){
                    this.setState(oldState => ({
                        currentlyReading: [...oldState.currentlyReading, book]
                    }))
                }
                if(book.shelf === 'wantToRead'){
                    this.setState(oldState => ({
                        wantToRead: [...oldState.wantToRead, book]
                    }))
                }
                if(book.shelf === 'read'){
                    this.setState(oldState => ({
                        read: [...oldState.read, book]
                    }))
                }
            })
        })
    }

    updateBook = (id) => {

    }



    componentDidMount = () => {
        this.getBooks();
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Shelve name='Currently Reading' data={this.state.currentlyReading}/>
                    <Shelve name='Want to Read' data={this.state.wantToRead}/>
                    <Shelve name='Read / Finished' data={this.state.read}/>
                </Row>
            </Container>
        );
    }
}

export default BookShelves;