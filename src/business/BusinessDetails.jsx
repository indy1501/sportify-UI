import React, { PureComponent } from 'react'
import { Card } from 'react-bootstrap'

class BusinessDetails extends PureComponent {
    constructor(props) {
        super(props)

        console.log("BiS ID ",props.match.params.id);

        this.state = {

        }
    }
    componentDidMount(){
        
    }

    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default BusinessDetails