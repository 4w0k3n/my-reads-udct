import {Component} from 'react';
import {Badge, Col, Container, Form, Row} from 'react-bootstrap';
import {BsSearch} from 'react-icons/all';


class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            typingTimeout: 0,
        };
    }

    handleInput = (query) => {

        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }


        this.setState({searchQuery: query}, () => {
            this.setState({
                typingTimeout: setTimeout(() => {
                    this.props.searchBooks(this.state.searchQuery);
                }, 800) // adjust Timeout here, if search is buggy when emptying the form, increase delay
            });
        });
    };

    //disable enter key in this component, source: https://stackoverflow.com/questions/5629805/disabling-enter-key-for-form
    disableEnterKey = (e) => {
        if (e.keyIdentifier === 'U+000A' || e.keyIdentifier === 'Enter' || e.keyCode === 13) {
            if (e.target.nodeName === 'INPUT' && e.target.type === 'text') {
                e.preventDefault();
                return false;
            }
        }
    };

    componentDidMount() {
        window.addEventListener('keydown', this.disableEnterKey, true);
        this.setState({searchQuery: this.props.oldSearch});
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.disableEnterKey);
    }


    render() {
        return (
            <Container>
                <Row className='justify-content-md-center d-flex flex-fill'>
                    <Col md='auto'>
                        <Badge bg='secondary' style={{margin: 10, fontSize: 34}}><BsSearch/> Search for new
                            books</Badge>
                    </Col>
                </Row>
                <Row className='justify-content-md-center d-flex flex-fill'>
                    <Form>
                        <Form.Control style={{marginBottom: 10}} size='lg' type='text'
                                      placeholder='Search for Books, Authors, ...'
                                      value={this.state.searchQuery} onChange={(e) => {
                            this.handleInput(e.target.value);
                        }}/>
                    </Form>
                </Row>
            </Container>
        );
    }
}

export default SearchBar;
