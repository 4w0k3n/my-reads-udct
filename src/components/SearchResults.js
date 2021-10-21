import react, {Component} from "react";
import {Badge, ListGroup} from "react-bootstrap";
import {GiPencil} from "react-icons/all";

class SearchResults extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <ListGroup as="ol" numbered>
                    {this.props.searchResult.map(result => (
                        (result.hasOwnProperty('authors')) &&
                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{result.title}</div>
                                {result.authors.map(author => <span className='text-muted' style={{fontSize: 13}}><GiPencil
                                    style={{marginLeft: 6, marginRight: 3}}/>{author}</span>)}
                            </div>
                            <Badge variant="primary" pill>
                                14
                            </Badge>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        );
    }
}

export default SearchResults;
