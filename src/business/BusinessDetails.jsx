import React, { PureComponent } from 'react'
import { Card, Button, Col, Row } from 'react-bootstrap'
import { businessService } from '../services/businessService';
import { IoMdPerson } from "react-icons/io";
import { TiTick } from "react-icons/ti";

class BusinessDetails extends PureComponent {
    constructor(props) {
        super(props)

        console.log("BiS ID ", props.match.params.id);

        this.state = {
            businessData: {},
            reviews: [],
            businessId: props.match.params.id
        }
    }
    componentDidMount() {
        businessService.getBusinessByID(this.state.businessId)
            .then(json => {
                console.log(json);
                if (Array.isArray(json)) {
                    this.setState({
                        businessData: json[0],
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });

        businessService.getReviews(this.state.businessId)
            .then(json => {
                console.log(json);
                if (Array.isArray(json.reviews)) {
                    this.setState({
                        reviews: json.reviews,
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }

    render() {
        const { businessData } = this.state
        const { reviews } = this.state
        var keys = []
        if (businessData.attributes) {
            keys = Object.keys(businessData.attributes)
        }


        return (
            <div>
                <Row>
                    <Col xl={{ span: 6, offset: 3 }}>
                        <Card style={{ margin: 30 }}>
                            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                            <Card.Body>
                                <h2>{businessData.name}</h2>
                                <Card.Subtitle className="mb-2 text-muted">{businessData.address}, {businessData.city}, {businessData.state} {businessData.postal_code}</Card.Subtitle>
                            </Card.Body>

                            <Card.Body>
                                <Card.Title>Ratings : <a style={{ fontStyle: "Bold", color: "red" }}>{businessData.stars}</a></Card.Title>
                                <Card.Title>Categories :</Card.Title>
                                <Card.Text style={{ border: "1px solid green", padding: 5 }}>{businessData.categories}</Card.Text>
                            </Card.Body>

                            <Card.Body>
                                <Card.Title>Known For :</Card.Title>
                                {

                                    keys && keys.map(value => {
                                        return (<Card.Text key={value}>{value} &nbsp;  <TiTick style={{ fontStyle: "Bold", color: "green" }}/> </Card.Text>)
                                    })
                                }

                            </Card.Body>
                            <Card.Body>
                                <Card.Title>Recommended Reviews :</Card.Title>
                                {
                                    reviews && reviews.map(value => {
                                        return (<Card border="primary" key={value.business_id}>
                                            <Card.Header><IoMdPerson/> &nbsp; {value.username}</Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    {value.text}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>)
                                    })
                                }
                                <Card.Body>
                                <Card.Link href="#" >Load More...</Card.Link>
                                </Card.Body>
                               
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div >
        )
    }
}

export default BusinessDetails