import react, {Component} from "react";
import Shelve from "../components/Shelve";
import {Container, Row, Spinner} from "react-bootstrap";
import {getAll, update} from "../api/BooksAPI";
import {BsCheckSquareFill, GiRead, IoCalendar} from "react-icons/all";

class BookShelves extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentlyReading: [],
            wantToRead: [],
            read: [],
            loading: true,
        }
    }

    clearBooks = () => {
        this.setState({
            currentlyReading: [],
            wantToRead: [],
            read: []
        })
    }

    getBooks = () => {
        this.setState({loading: true})
        // more information on this call inside update
        this.clearBooks();
            getAll()
            .then(res => {
                console.log(res);
                res.forEach(book => {
                    if (book.shelf === 'currentlyReading') {
                        this.setState(oldState => ({
                            currentlyReading: [...oldState.currentlyReading, book]
                        }))
                    }
                    if (book.shelf === 'wantToRead') {
                        this.setState(oldState => ({
                            wantToRead: [...oldState.wantToRead, book]
                        }))
                    }
                    if (book.shelf === 'read') {
                        this.setState(oldState => ({
                            read: [...oldState.read, book]
                        }))
                    }
                })
                this.setState({loading: false})
            })
            .catch(err => {
                console.log(err);
            })
    }

    updateBook = (book, shelf) => {
        update(book, shelf)
            .then(res => {
                /**I'll let the API do the work for me instead of handling the state manually..
                 * Having the state determine the rendered books per shelf would cause lower loading times,
                 * but its more reliable to have a single source of truth through the API.
                 * If the API call fails for whatever reason and I update the state anyway, API and State are not in Sync.
                 *
                 * TLDR: The response of getBooks() handles the state*/
                this.getBooks();
            })
    }


    componentDidMount = () => {
        this.getBooks();
    }

    render() {
        return (
            <Container>
                {this.state.loading ?
                    <Row className="justify-content-md-center">
                        <Spinner animation="border"/>
                    </Row>
                    :
                    <Row className="justify-content-md-center">
                        <Shelve name='Currently Reading' data={this.state.currentlyReading} icon = {<GiRead/>}
                                updateBook={this.updateBook}/>
                        <Shelve name='Want to Read' data={this.state.wantToRead} updateBook={this.updateBook} icon = {<IoCalendar/>}/>
                        <Shelve name='Read / Finished' data={this.state.read} updateBook={this.updateBook} icon = {<BsCheckSquareFill/>}/>
                    </Row>

                }
            </Container>
        );
    }
}

export default BookShelves;