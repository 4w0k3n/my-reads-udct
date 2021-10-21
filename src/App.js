import './App.css';
import react, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import BookShelves from "./pages/BookShelves";
import Navigation from "./components/Navigation";
import BookSearch from "./pages/BookSearch";


class App extends Component {
  render() {
    return (
        <div className="App">
            <Router>
                <Route path='/' component={Navigation}/>
                <Route exact path='/' component={BookShelves}/>
                <Route exact path='/search' component={BookSearch}/>
            </Router>
        </div>
    );
  }


}

export default App;
