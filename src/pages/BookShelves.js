import  {Component} from "react";
import Shelve from "../components/Shelve";
import {Container, Row, Spinner} from "react-bootstrap";
import {BsCheckSquareFill, GiRead, IoCalendar} from "react-icons/all";

class BookShelves extends Component {

    componentDidMount = () => {
        this.props.getBooks();
    }

    render() {
        return (
            <Container>
                {this.props.loadingBooks ?
                    <Row className="justify-content-md-center">
                        <Spinner animation="border"/>
                    </Row>
                    :
                    <Row className="justify-content-md-center">
                        <Shelve name='Currently Reading' data={this.props.currentlyReading} icon = {<GiRead/>}
                                updateBook={this.props.updateBook}/>
                        <Shelve name='Want to Read' data={this.props.wantToRead} updateBook={this.props.updateBook} icon = {<IoCalendar/>}/>
                        <Shelve name='Read / Finished' data={this.props.read} updateBook={this.props.updateBook} icon = {<BsCheckSquareFill/>}/>
                    </Row>

                }
            </Container>
        );
    }
}

export default BookShelves;