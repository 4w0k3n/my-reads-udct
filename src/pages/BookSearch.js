import {Component} from 'react';
import SearchBar from '../components/SearchBar';
import {Row, Spinner} from 'react-bootstrap';
import SearchResults from '../components/SearchResults';


class BookSearch extends Component {

    componentDidMount = () => {
        //needs to get called here as well , if the user directly goes to /search without visiting the main page
        this.props.getBooks();
    };

    render() {
        return (
            <div>
                {this.props.loadingBooks ?
                    <Row className='justify-content-md-center'>
                        <Spinner animation='border'/>
                    </Row>
                    :
                    <div>
                        <SearchBar searchBooks={this.props.searchBooks} oldSearch={this.props.oldSearch}/>
                        {(this.props.loading) &&
                        <Row className='justify-content-md-center'>
                            <Spinner animation='border'/>
                        </Row>}
                        <SearchResults
                            searchResult={this.props.searchResult}
                            updateBook={this.props.updateBook}
                            currentlyReading={this.props.currentlyReading}
                            wantToRead={this.props.wantToRead}
                            read={this.props.read}
                            noResults={this.props.noResults}
                            allBooks={this.props.allBooks}
                            checkIfInShelf={this.props.checkIfInShelf}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default BookSearch;
