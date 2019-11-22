import React, { PureComponent } from 'react'
import { Card, Button, Col, Row, Modal } from 'react-bootstrap'
import { businessService } from '../services/businessService';
import { IoMdPerson } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import NavBar from './NavBar';

class BusinessDetails extends PureComponent {
    constructor(props) {
        super(props)

        console.log("BiS ID ", props.match.params.id);

        this.state = {
            businessData: {},
            reviews: [],
            last_key_review_id: "",
            last_key_business_id: "",
            businessId: props.match.params.id,
            modalShow: false
        }
        this.loadMore = this.loadMore.bind(this)
        this.setModalShow  = this.setModalShow.bind(this)
        this.postReview = this.postReview.bind(this)
        
    }

    setModalShow(value) {
        this.setState({
            modalShow: value
        })
    }
    postReview(review) { 
        // ser
        console.log(review);
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
                        last_key_business_id: json.LastEvaluatedKey.business_id,
                        last_key_review_id: json.LastEvaluatedKey.review_id
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }

    loadMore() {
        businessService.getMoreReviews(this.state.businessId, this.state.last_key_review_id, this.state.last_key_business_id)
            .then(json => {
                console.log(json);
                if (Array.isArray(json.businesses)) {
                    this.setState({
                        reviews: this.state.reviews.concat(json.reviews),
                        last_key_business_id: json.LastEvaluatedKey.business_id,
                        last_key_city: json.LastEvaluatedKey.city
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
                <NavBar></NavBar>
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
                                <Card.Link href="#" onClick={(e) => this.setModalShow(true)} >Write a Review</Card.Link>
                                <PostReviewModal 
                                        show={this.state.modalShow} 
                                        onHide={(e) => this.setModalShow(false)}
                                        onPostReview={this.postReview}></PostReviewModal>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title>Recommended Reviews :</Card.Title>
                                {
                                    reviews && reviews.map(value => {
                                        return (
                                            <Review bisReview={value}></Review>
                                        )
                                    })
                                }
                                <Card.Body>
                                    {
                                        reviews &&  <Card.Link href="#" onClick={this.loadMore} >Load More...</Card.Link>
                                    }
                               
                                </Card.Body>
                               
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div >
        )
    }
}

export default BusinessDetails; 


export const Review = ({bisReview}) => {
    const review = bisReview;
    return (
        <Card border="primary" key={review.business_id}>
        <Card.Header><IoMdPerson/> &nbsp; {review.username}</Card.Header>
        <Card.Body>
            <Card.Text>
                {review.text}
            </Card.Text>
        </Card.Body>
    </Card>
    );
}

export const PostReviewModal = ({onPostReview, ...props}) => {
    const [reviewText, setReviewText] = React.useState("Write A review");
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             Post Review
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea style={{width:"100%", height:"300px", padding: 20}} value={reviewText} onChange={e=> setReviewText(e.target.value)}> </textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" onClick={e=> onPostReview(reviewText)}>Post</Button>
          </Modal.Footer>
        </Modal>
      );
}