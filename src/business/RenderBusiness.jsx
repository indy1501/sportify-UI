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
                                    width={70}
                                    height={70}
                                    className="mr-3"
                                    src="https://www.hommenorthopedics.com/editor-uploads/website-755/multi-sports-blog-1530684776.jpg"
                                    alt="Generic placeholder"
                                />
                                <Media.Body>
                                    <Card.Title>{props.bis.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{props.bis.city} {props.bis.state} {props.bis.postal_code}</Card.Subtitle>
                                    <Card.Text>Ratings: {props.bis.stars}</Card.Text>
                                    <Card.Link href="#" onClick={e=> props.renderDetails(props.bis)}>More Details</Card.Link>
                                   {/*  <a onClick={e=> props.renderDetails(props.bis)}>More Details</a> */}
                                 
                                </Media.Body>
                            </Media>
                        </Card.Body>
                    </Card>
    )
}

export default RenderBusiness
