import {Container, Dropdown, Figure, ListGroup, Row} from "react-bootstrap";
import {BsThreeDotsVertical, GiPencil} from "react-icons/all";

function SearchResults(props) {

    const checkIfInShelf = (result, shelf) => {
        let inShelf = false;
        shelf.forEach(book => {
            if (book.id === result.id) {
                inShelf = true;
            }
        })
        return inShelf;
    }

    return (
        <Container>
            {(props.noResults) ?
                <Row className='justify-content-md-center d-flex flex-fill'>
                    <span className='alert alert-info'>No Results found</span>
                </Row>
                :
                <Row className='justify-content-md-center d-flex flex-fill'>
                    <ListGroup as="ul" numbered>
                        {props.searchResult.map((result, index) => (
                            (result.hasOwnProperty('authors')) &&
                            <ListGroup.Item key={index} as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div>
                                    <Figure>
                                        <Figure.Image
                                            width={70}
                                            height={90}
                                            src={result.imageLinks.thumbnail}
                                        />
                                    </Figure>
                                </div>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{result.title}

                                    </div>
                                    {
                                        result.authors.map((author, i) => (
                                            <span key={i} className='text-muted' style={{fontSize: 13}}>
                                        <GiPencil style={{marginLeft: 6, marginRight: 3}}/>{author}</span>))
                                    }
                                </div>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" size='sm'>
                                        <BsThreeDotsVertical/>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {checkIfInShelf(result, props.currentlyReading) ?
                                            <Dropdown.Item onClick={() => {
                                            }} active>Currently Reading</Dropdown.Item>
                                            :
                                            <Dropdown.Item onClick={() => {
                                                props.updateBook(result, 'currentlyReading')
                                            }}>Currently Reading</Dropdown.Item>}

                                        {checkIfInShelf(result, props.wantToRead) ?
                                            <Dropdown.Item onClick={() => {
                                            }} active>Want to read</Dropdown.Item>
                                            :
                                            <Dropdown.Item onClick={() => {
                                                props.updateBook(result, 'wantToRead')
                                            }}>Want to read</Dropdown.Item>}

                                        {checkIfInShelf(result, props.read) ?
                                            <Dropdown.Item onClick={() => {
                                            }} active>Read/Finished</Dropdown.Item>
                                            :
                                            <Dropdown.Item onClick={() => {
                                                props.updateBook(result, 'read')
                                            }}>Read/Finished</Dropdown.Item>}
                                        {!checkIfInShelf(result, props.read) && !checkIfInShelf(result, props.wantToRead) && !checkIfInShelf(result, props.currentlyReading) ?
                                            <Dropdown.Item onClick={() => {
                                            }} active>Not assigned</Dropdown.Item>
                                            :
                                            <Dropdown.Item onClick={() => {
                                                // DO NOTHING: update API call does not support removing books from shelves
                                            }}>Not assigned</Dropdown.Item>}
                                    </Dropdown.Menu>
                                </Dropdown>

                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Row>
            }

        </Container>
    );

}

export default SearchResults;
