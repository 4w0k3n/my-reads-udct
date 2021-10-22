import  {Component} from "react";
import SearchBar from "../components/SearchBar";
import {Container, Row, Spinner} from "react-bootstrap";
import SearchResults from "../components/SearchResults";
import {search} from "../api/BooksAPI";

class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: [],
            showResult: false,
            loading: false,
        }
    }

    searchBooks = (query) => {
        this.setState(() => ({
            loading: true
        }));
        if (!query || query === '') {
            this.setState(() => ({
                searchResult: [], showResult: false, loading: false
            }));
        } else {
            search(query)
                .then(res => {
                    if (res.hasOwnProperty('error')) {
                        this.setState(() => ({searchResult: [], showResult: false, loading: false}));
                    } else {
                        this.setState(() => ({searchResult: res, showResult: true, loading: false}));
                    }
                })
                .catch(e => {
                    this.setState(() => ({searchResult: [], showResult: false, loading: false}));
                })
        }
    }

    componentDidMount = () => {
        this.props.getBooks(); //needs to get called here as well , if the user directly goes to /search without visiting /
    }

    render() {
        return (
            <Container fluid>
                {this.props.loadingBooks ?
                    <Row className="justify-content-md-center">
                        <Spinner animation="border"/>
                    </Row>
                    :
                    <Row>
                        <SearchBar searchBooks={this.searchBooks}/>
                        {(this.state.loading) && <Row className="justify-content-md-center">
                            <Spinner animation="border"/>
                        </Row>}
                        {(this.state.showResult) &&
                        <SearchResults
                            searchResult={this.state.searchResult}
                            updateBook = {this.props.updateBook}
                            currentlyReading={ this.props.currentlyReading}
                            wantToRead = {this.props.wantToRead}
                            read = {this.props.read}
                        />}
                    </Row>
                }
            </Container>
        );
    }
}

export default BookSearch;
