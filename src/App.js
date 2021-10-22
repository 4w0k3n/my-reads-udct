import './App.css';
import {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import BookShelves from "./pages/BookShelves";
import Navigation from "./components/Navigation";
import BookSearch from "./pages/BookSearch";
import {get, getAll, search, update} from "./api/BooksAPI";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allBooks: [],
            currentlyReading: [],
            wantToRead: [],
            read: [],
            loadingBooks: false,
            searchResult: [],
            noResults: false,
            loadingSearch: false,
            oldSearch: ''
        }
    }

    clearShelves = () => {
        this.setState({
            currentlyReading: [],
            wantToRead: [],
            read: []
        })
    }

    shelfBooks = (books) => {
        this.clearShelves();
        books.forEach(book => {
            if (book.shelf === 'currentlyReading') {
                this.setState(oldState => ({
                    currentlyReading: [...oldState.currentlyReading, book]
                }));
            }
            if (book.shelf === 'wantToRead') {
                this.setState(oldState => ({
                    wantToRead: [...oldState.wantToRead, book]
                }));
            }
            if (book.shelf === 'read') {
                this.setState(oldState => ({
                    read: [...oldState.read, book]
                }));
            }
        })
    }

    getBooks = () => {
        this.setState({loadingBooks: true});
        this.clearShelves();
        getAll()
            .then(res => {
                this.setState({allBooks: res}, () => {
                    this.shelfBooks(this.state.allBooks);
                    this.setState({loadingBooks: false});
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    updateBook = (book, shelf) => {
        update(book, shelf)
            .then(res => {
                let allMyBooks = this.state.allBooks;
                // if not in allBooks, get book and add it to allBooks, update shelves after
                if (!this.checkIfInShelf(book, allMyBooks)) {
                    get(book.id).then(res => {
                        allMyBooks.push(res);
                        this.shelfBooks(allMyBooks);
                    })
                    // if book already in allBooks, just change shelf and update shelves
                } else {
                    allMyBooks.forEach(obj => {
                        if (book.id === obj.id) {
                            obj.shelf = shelf;
                        }
                    })
                    this.shelfBooks(allMyBooks);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchBooks = (query) => {
        this.setState(() => ({
            loadingSearch: true, oldSearch: query
        }));
        if (!query || query === '') {
            this.setState(() => ({
                searchResult: [], noResults: false, loadingSearch: false
            }));
        } else {
            search(query)
                .then(res => {
                    if (res.hasOwnProperty('error')) {
                        this.setState(() => ({searchResult: [], noResults: true, loadingSearch: false}));
                    } else {
                        this.setState(() => ({searchResult: res, noResults: false, loadingSearch: false}));
                    }
                })
                .catch(e => {
                    this.setState(() => ({searchResult: [], noResults: true, loadingSearch: false}));
                })
        }
    }

    checkIfInShelf = (obj, shelf) => {
        let inShelf = false;
        shelf.forEach(book => {
            if (book.id === obj.id) {
                inShelf = true;
            }
        })
        return inShelf;
    }


    render() {
        return (
            <div className="App">
                <Router>
                    <Route path='/' component={Navigation}/>
                    <Route exact path='/' render={() => (
                        <BookShelves
                            currentlyReading={this.state.currentlyReading}
                            wantToRead={this.state.wantToRead}
                            read={this.state.read}
                            loadingBooks={this.state.loadingBooks}
                            getBooks={this.getBooks}
                            updateBook={this.updateBook}
                        />
                    )}/>
                    <Route exact path='/search' render={() => (
                        <BookSearch
                            currentlyReading={this.state.currentlyReading}
                            allBooks={this.state.allBooks}
                            wantToRead={this.state.wantToRead}
                            read={this.state.read}
                            loadingBooks={this.state.loadingBooks}
                            oldSearch={this.state.oldSearch}
                            searchResult={this.state.searchResult}
                            noResults={this.state.noResults}
                            loading={this.state.loadingSearch}
                            getBooks={this.getBooks}
                            updateBook={this.updateBook}
                            searchBooks={this.searchBooks}
                            checkIfInShelf={this.checkIfInShelf}
                        />
                    )}/>
                </Router>
            </div>
        );
    }


}

export default App;
