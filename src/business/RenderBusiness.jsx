import React from 'react'
import { Card, Media, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function RenderBusiness(props) {

    const businessURL = `/businessDetails/${props.bis.business_id}`
    return (

                    <Card style={{ margin: 20 }}>
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
                                    <Card.Link></Card.Link>
                                    <Link to={businessURL}>More Details</Link>
                                </Media.Body>
                            </Media>
                        </Card.Body>
                    </Card>
    )
}

export default RenderBusiness
