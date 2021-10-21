import react, {Component} from "react";
import SearchBar from "../components/SearchBar";
import {Container} from "react-bootstrap";
import SearchResults from "../components/SearchResults";
import {getAll, search} from "../api/BooksAPI";

class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchResult: [],
            showResult: false
        }
    }

    getBooks = () => {
        this.setState({loading: true})
        getAll()
            .then(res => {
                // this.setState({data: res});
                console.log(res);
            });
    }

    searchBooks = (query) => {
        if (!query || query === '') {
            console.log('string smpty')
            this.setState(() => ({
                searchResult: [], showResult: false
            }));
        } else {
            search(query)
                .then(res => {
                    if (res.hasOwnProperty('error') || res === undefined) {
                        this.setState(() => ({searchResult: [], showResult: false}));
                    } else {
                        this.setState(() => ({searchResult: res, showResult: true}));
                    }
                })
                .catch(e => {
                    this.setState(() => ({searchResult: [], showResult: false}));
                })
        }
    }

    render() {
        return (
            <Container fluid>
                <SearchBar searchBooks={this.searchBooks}/>
                {(this.state.showResult) &&
                <SearchResults data={this.state.data} searchResult={this.state.searchResult}/>}
            </Container>
        );
    }
}

export default BookSearch;
