import React, { PureComponent } from 'react'
import { Navbar, Button, Card, Container, Row, Col } from 'react-bootstrap';
import LogInPage from '../components/LogInPage';
import LogOut from '../components/LogOut';
import { Form } from 'react-bootstrap';
import { businessService } from '../services/businessService';
import { Link } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import CreateBusiness from './CreateBusiness';
import NavBar from './NavBar';
var jwt = require('jsonwebtoken');

class AdminPageBusiness extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            userBusinessData: {},
            hasBusiness: false,
            user: ""
        }
        this.getUserBusiness = this.getUserBusiness.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }
    componentDidMount() {
        let userEmail = sessionStorage.getItem("userEmail")
        console.log(userEmail)
        this.setState({
            user: userEmail
        })

        this.getUserBusiness(userEmail)

    }
    getUserBusiness(userEmail) {
        businessService.getUserBusiness(userEmail)
            .then(json => {
                console.log(json);
                if (!json.error) {
                    this.setState({
                        userBusinessData: json,
                        hasBusiness: true
                    });
                } else {
                    this.setState({
                        hasBusiness: false
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }
    onDelete() {
        businessService.deleteBusiness(this.state.user, this.state.userBusinessData.business_id)
            .then(json => {
                console.log(json);
                this.getUserBusiness(this.state.user)
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }
    render() {
        const { hasBusiness } = this.state;
        const { userBusinessData } = this.state;
        const businessUpdateURL = `/updateBusiness/${this.state.userBusinessData.business_id}`
        return (
            <div>
                <NavBar></NavBar>

                <Row style={{ display: "block" }}>
                    <Col xl={{ span: 6, offset: 3 }} style={{ marginTop: "30px" }}>
                        {
                            !hasBusiness &&
                            <Card>
                                <Card.Body>

                                    <h5>You have not registered any business yet</h5>
                                    <Link to="/createBusiness">Register Your Business</Link>



                                </Card.Body>
                            </Card>
                        }
                        {
                            hasBusiness && <Card >
                                {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                                <Card.Body>
                                    <h2>{userBusinessData.name}</h2>
                                    <Card.Subtitle className="mb-2 text-muted">{userBusinessData.address} {userBusinessData.city} {userBusinessData.state} {userBusinessData.postal_code}</Card.Subtitle>
                                </Card.Body>

                                <Card.Body>
                                    <Card.Title>Categories : </Card.Title>
                                   {/*  <Card.Text>{userBusinessData.categories}</Card.Text> */}
                                     {

                                        userBusinessData.categories && userBusinessData.categories.map(value => {
                                            return (<Card.Text key={value}>&nbsp; {value} &nbsp;  <TiTick style={{ fontStyle: "Bold", color: "green" }} /> </Card.Text>)
                                        })
                                    }
                                </Card.Body>
                                <Card.Body>
                                    <Button variant="outline-danger" onClick={this.onDelete}> Delete </Button>
                                    <Link to={businessUpdateURL}><Button variant="outline-primary" style={{ marginLeft: "30px" }}>Update </Button></Link>
                                </Card.Body>

                            </Card>
                        }


                    </Col>
                </Row>



            </div>
        )
    }
}

export default AdminPageBusiness