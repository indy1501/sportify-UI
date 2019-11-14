import React from 'react'
import { Card, Media } from 'react-bootstrap'

function RenderBusiness(props) {
    return (

        <Card>
            <Card.Body>
                <Media>
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src=""
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <Card.Title>{props.bis.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{props.bis.city} {props.bis.state} {props.bis.postal_code}</Card.Subtitle>
                        <Card.Text>Ratings: {props.bis.stars}</Card.Text>
                        <Card.Link href="#">More Details</Card.Link>
                    </Media.Body>
                </Media>
            </Card.Body>
        </Card>

    )
}

export default RenderBusiness
