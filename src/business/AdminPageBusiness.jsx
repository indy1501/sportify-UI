import React, { PureComponent } from 'react'
import { Navbar, Button, Card, Container, Row, Col } from 'react-bootstrap';
import LogInPage from '../components/LogInPage';
import LogOut from '../components/LogOut';
import { Form } from 'react-bootstrap';
import { businessService } from '../services/businessService';
import { Link } from 'react-router-dom';
import CreateBusiness from './CreateBusiness';
var jwt = require('jsonwebtoken');

class AdminPageBusiness extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            userData: undefined,
            userBusinessData: [],
            isAdmin: false,
            hasBusiness: false,
            user: ""
        }
        this.getUserBusiness = this.getUserBusiness.bind(this)
    }
    componentDidMount() {
        var token = sessionStorage.getItem("token");
        var decoded = jwt.decode(token);
        // get the decoded payload and header
        var decoded = jwt.decode(token, { complete: true });
        //console.log(decoded.header);
        //console.log(decoded.payload);
        const userObj = decoded.payload;
        this.setState({
            userData: userObj
        })
        const isAdmin = userObj && userObj["cognito:groups"] && userObj["cognito:groups"].filter(g => g == "admin").length > 0;

        this.setState({ isAdmin });
        console.log(userObj.email)
        setTimeout(() => {
            /* console.log("UserEmailCheckBefore:"+this.state.userData.email)
            console.log("isAdmin:"+this.state.isAdmin)
            if (this.state.isAdmin){
                this.updateTable()
            } else {
                this.updateTable2(this.state.userData.email);
            } */
            this.getUserBusiness(userObj.email)
        }, 500);

    }
    getUserBusiness(userEmail) {
        businessService.getUserBusiness(userEmail)
            .then(json => {
                console.log(json);
                if (Array.isArray(json)) {
                    this.setState({
                        userBusinessData: json,
                        hasBusiness: true
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
                /* this.setState({
                    hasBusiness: false
                }) */
            });
    }
    render() {
        const { isAdmin } = this.state;
        const { hasBusiness } = this.state;
        return (
            <div>
                <Navbar Style={{"background-color":"#1a4668"}}>
                    <Navbar.Brand>SpoRtify</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: {this.state.userData &&
                                <a href="#login">{this.state.userData.email}</a>}
                            {/*  &nbsp;&nbsp;
                            User Type: {
                                isAdmin && <a> "Administrator" </a>
                            }
                            {
                                !isAdmin && <a> "User (Non Admin)"</a>
                            } */}
                        </Navbar.Text>
                    </Navbar.Collapse>
                    {this.state.userData && <LogOut></LogOut>}
                    {!this.state.userData && <LogInPage></LogInPage>}
                </Navbar>
                <Container>
                    <Row>
                        <Col xl={{ span: 6, offset: 3 }} style={{marginTop: "30px"}}>
                            <Card>
                                <Card.Body>
                                    {
                                        !hasBusiness && <div>
                                            <h5>You have not registered any business yet</h5>
                                            <Link to="/createBusiness">Register Your Business</Link>
                                            </div>
                                    }
                                   {
                                       hasBusiness && <div>
                                           <Card>
                                               
                                           </Card>
                                       </div>
                                   }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>


            </div>
        )
    }
}

export default AdminPageBusiness