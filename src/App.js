import './App.css';
import  {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import BookShelves from "./pages/BookShelves";
import Navigation from "./components/Navigation";
import BookSearch from "./pages/BookSearch";
import {getAll, update} from "./api/BooksAPI";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentlyReading: [],
            wantToRead: [],
            read: [],
            loadingBooks: false
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
        this.setState({loadingBooks: true});
        this.clearBooks(); // more information on this call inside update
        getAll()
            .then(res => {
                res.forEach(book => {
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
                this.setState({loadingBooks: false});
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
            });
    }


    render() {
        return (
            <div className="App">
                <Router>
                    <Route path='/' component={Navigation}/>
                    <Route exact path='/' render={() => (
                        <BookShelves
                            currentlyReading={ this.state.currentlyReading}
                            wantToRead = {this.state.wantToRead}
                            read = {this.state.read}
                            loadingBooks = {this.state.loadingBooks}
                            clearBooks = {this.clearBooks}
                            getBooks = {this.getBooks}
                            updateBook = {this.updateBook}
                        />
                    )}/>
                    <Route exact path='/search' render={() => (
                        <BookSearch
                            currentlyReading={ this.state.currentlyReading}
                            wantToRead = {this.state.wantToRead}
                            read = {this.state.read}
                            loadingBooks = {this.state.loadingBooks}
                            clearBooks = {this.clearBooks}
                            getBooks = {this.getBooks}
                            updateBook = {this.updateBook}
                        />
                    )}/>
                </Router>
            </div>
        );
    }


}

export default App;
