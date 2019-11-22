import React, { PureComponent } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { businessService } from '../services/businessService'
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

class UpdateBusiness extends PureComponent {
    constructor(props) {
        super(props)

        console.log("BiS ID ", props.match.params.id);

        this.state = {
            name: "",
            address: "",
            state: "",
            city: "",
            postalCode: "",
            cats: ["Active Life"],
            finalSelected: [],
            businessId: props.match.params.id
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.updateName = this.updateName.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
        this.updateState = this.updateState.bind(this)
        this.updateCity = this.updateCity.bind(this)
        this.updatePostal = this.updatePostal.bind(this)
    }

    componentDidMount() {
        businessService.getBusinessByID(this.state.businessId)
            .then(json => {
                console.log(json);
                if (Array.isArray(json)) {
                    this.setState({
                        name: json[0].name,
                        address: json[0].address,
                        state: json[0].state,
                        city: json[0].city,
                        postalCode: json[0].postal_code,
                        cats: json[0].categories,
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }
    onSubmit() {
        businessService.updateBusiness(this.state.businessId, this.state.name, this.state.finalSelected, this.state.address, this.state.state, this.state.city, this.state.postalCode)
            .then(json => {
                console.log(json);
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }
    updateName(event) {
        this.setState({
            name: event.target.value
        })
    }
    updateAddress(event) {
        this.setState({
            address: event.target.value
        })
    }
    updateState(event) {
        this.setState({
            state: event.target.value
        })
    }
    updateCity(event) {
        this.setState({
            city: event.target.value
        })
    }
    updatePostal(event) {
        this.setState({
            postalCode: event.target.value
        })
    }

    render() {
        return (
            
            <div>
                <NavBar></NavBar>
                <div style={{ margin: "30px" }}>
                    <Link to="/businessAdmin"> Go Back</Link>
                </div>
                <Card style={{ "margin": "100px" }}>
                    <Card.Body>

                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Business Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name of Business" value={this.state.name} onChange={this.updateName} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid name.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Categories</Form.Label>
                                <Form.Control as="select" multiple onChange={e => {
                                    console.log(e.target.options);
                                    const opts = e.target.options;
                                    let tempArray = [];
                                    for (var i = 0; i < opts.length; i++) {
                                        var item = opts.item(i);
                                        console.log(item.selected, item.value);
                                        if (item.selected == true) {
                                            tempArray.push(item.value)
                                        }
                                    }
                                    this.setState({
                                        finalSelected: tempArray
                                    })
                                }}>
                                    <option>Active Life</option>
                                    <option>Hiking</option>
                                    <option>Golf</option>
                                    <option>Fitness & Instruction</option>
                                    <option>Cycling Classes</option>
                                    <option>Yoga</option>
                                    <option>Sporting Goods</option>
                                    <option>Boot Camps</option>
                                    <option>Cardio Classes</option>
                                    <option>Boxing</option>
                                    <option>Gymnastics</option>
                                    <option>Martial Arts</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter Address" value={this.state.address} onChange={this.updateAddress} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid address.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="Enter State" value={this.state.state} onChange={this.updateState} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="Enter City" value={this.state.city} onChange={this.updateCity} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="postalCode">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter Postal Code" value={this.state.postalCode} onChange={this.updatePostal} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid postal code.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.onSubmit}>
                                Submit
                        </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

        )
    }
}

export default UpdateBusiness