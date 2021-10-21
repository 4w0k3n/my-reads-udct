import react, {Component} from "react";
import {Badge, Col, Container, Form, Row} from "react-bootstrap";
import {BsSearch} from "react-icons/all";

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            smallInput: false
        }
    }

    handleInput = (e, query) => {
        e.preventDefault();
        // Using Callback to get sycronous behaviour for setState in order to be able to use controlled Form
        this.setState({searchQuery: query}, () => {
            console.log(this.state.searchQuery);
            // preventing async fails when deleting input with return button beacuse API causes async fails for onChange invokation..
            if (this.state.searchQuery.length <= 2) {
                this.props.searchBooks('');
                this.setState({smallInput: true});
            } else {
                this.setState({smallInput: false});
                this.props.searchBooks(this.state.searchQuery);
            }

        })

    }

    componentDidMount() {
        //disable enter key in this component, source: https://stackoverflow.com/questions/5629805/disabling-enter-key-for-form
        window.addEventListener('keydown', function (e) {
            if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
                if (e.target.nodeName == 'INPUT' && e.target.type == 'text') {
                    e.preventDefault();
                    return false;
                }
            }
        }, true);
    }

    render() {
        return (
            <Container>
                <Row className='justify-content-md-center d-flex flex-fill'>
                    <Col md="auto">
                        <Badge bg="secondary" style={{margin: 10, fontSize: 34}}><BsSearch/> Search for some new
                            books</Badge>
                    </Col>
                </Row>
                <Row>
                    {(this.state.searchQuery.length <= 2 && this.state.searchQuery.length !== 0) &&
                    <span className='alert alert-danger small'>Please enter at least 2 characters.</span>
                    }
                </Row>
                <Row>
                    <Form onSubmit={false}>
                        <Form.Control style={{margin: 10}} size="lg" type="text" placeholder="Enter your search term"
                                      value={this.state.searchQuery} on onChange={(e) => {
                            this.handleInput(e, e.target.value)
                        }}/>
                    </Form>
                </Row>
            </Container>
        );
    }
}

export default SearchBar;
