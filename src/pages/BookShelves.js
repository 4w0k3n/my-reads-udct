import  {Component} from "react";
import Shelf from "../components/Shelf";
import {Row, Spinner} from "react-bootstrap";
import {BsCheckSquareFill, GiRead, IoCalendar} from "react-icons/all";

class BookShelves extends Component {

    componentDidMount = () => {
        this.props.getBooks();
    }

    render() {
        return (
            <div>
                {this.props.loadingBooks ?
                    <Row className="justify-content-md-center">
                        <Spinner animation="border"/>
                    </Row>
                    :
                    <Row className="justify-content-md-center">
                        <Shelf name='Currently Reading' data={this.props.currentlyReading} icon = {<GiRead/>}
                               updateBook={this.props.updateBook}/>
                        <Shelf name='Want to Read' data={this.props.wantToRead} updateBook={this.props.updateBook} icon = {<IoCalendar/>}/>
                        <Shelf name='Read / Finished' data={this.props.read} updateBook={this.props.updateBook} icon = {<BsCheckSquareFill/>}/>
                    </Row>

                }
            </div>
        );
    }
}

export default BookShelves;