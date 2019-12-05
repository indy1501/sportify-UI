import React, { PureComponent } from 'react';
import './SearchBusiness.css';
import { businessService } from '../services/businessService';
import RenderBusiness from './RenderBusiness';
import { Button, Row, Container, Col, Carousel } from 'react-bootstrap';
import { AutoScaling } from 'aws-sdk';
import NavBar from './NavBar';
import BusinessDetails from './BusinessDetails';

const astyle = {
    'text-align': 'center'
}
class SearchBusiness extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            activity: "",
            city: "",
            last_key_business_id: "",
            last_key_city: "",
            searchData: [],
            enableCarousal: true,
            curBusiness: undefined
        }
        this.updateCity = this.updateCity.bind(this)
        this.updateActivity = this.updateActivity.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.renderBusiness = this.renderBusiness.bind(this);
        this.closeBusiness = this.closeBusiness.bind(this)
    }

    updateCity(event) {
        this.setState({
            city: event.target.value
        })
    }
    updateActivity(event) {
        this.setState({
            activity: event.target.value
        })
    }
    onSearch() {
        this.setState({
            enableCarousal: false
        })
        businessService.getSearchData(this.state.activity, this.state.city)
            .then(json => {
                console.log(json);
                if (Array.isArray(json.businesses)) {
                    this.setState({
                        searchData: json.businesses,
                        /* last_key_business_id: json.LastEvaluatedKey.business_id,
                        last_key_city: json.LastEvaluatedKey.city */
                    });
                }
                if (json.LastEvaluatedKey){
                    this.setState({
                        last_key_business_id: json.LastEvaluatedKey.business_id,
                        last_key_city: json.LastEvaluatedKey.city
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }
    loadMore() {
        console.log(this.state.activity, this.state.city, this.state.last_key_business_id, this.state.last_key_city)
        businessService.getMoreSearchData(this.state.activity, this.state.city, this.state.last_key_business_id, this.state.last_key_city)
            .then(json => {
                console.log(json);
                if (Array.isArray(json.businesses)) {
                    this.setState({
                        searchData: this.state.searchData.concat(json.businesses),
                       /*  last_key_business_id: json.LastEvaluatedKey.business_id,
                        last_key_city: json.LastEvaluatedKey.city */
                    });
                }
                if (json.LastEvaluatedKey){
                    this.setState({
                        last_key_business_id: json.LastEvaluatedKey.business_id,
                        last_key_city: json.LastEvaluatedKey.city
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }

    renderBusiness(bis) {
        this.setState({
            curBusiness: bis
        })
    }

    closeBusiness() {
        this.setState({
            curBusiness: undefined
        })
    }


    render() {
        return (
            <div>
                <NavBar></NavBar>
                {
                    this.state.enableCarousal &&
                    <Carousal></Carousal>
                }

                <section className="search-sec">
                    <div className="container">
                        {
                            !this.state.enableCarousal &&
                            <h1 style={{ color: "white", margin: "auto", marginBottom: "10px" }}>SpoRtify</h1>
                        }
                        <form action="#" method="post" noValidate="novalidate">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-5 col-md-3 col-sm-12 p-0">
                                            <input type="text" className="form-control search-slt" placeholder="Find Sports Activity" value={this.state.activity} onChange={this.updateActivity} />
                                        </div>
                                        <div className="col-lg-5 col-md-3 col-sm-12 p-0">
                                            <input type="text" className="form-control search-slt" placeholder="Enter City" value={this.state.city} onChange={this.updateCity} />
                                        </div>
                                        <div className="col-lg-2 col-md-3 col-sm-12 p-0">
                                            <button type="button" className="btn btn-danger wrn-btn" onClick={this.onSearch}>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                <div>
                    {
                        this.state.curBusiness && 
                        <BusinessDetails key={"details-"+this.state.curBusiness.business_id} business={this.state.curBusiness} closeBusiness={this.closeBusiness}> </BusinessDetails>
                    }
                    {
                        !this.state.curBusiness && 
                        <Row style={{ margin: 20 }}>
                            <Col xl={{ span: 6, offset: 3 }} >
                                <RenderBisList bisArray={this.state.searchData} flag={0} renderDetails={this.renderBusiness}></RenderBisList>
                            </Col>
                        </Row>
                    }
                </div>
                {
                    !this.state.enableCarousal && !this.state.curBusiness &&
                    <Button variant="secondary" onClick={this.loadMore} size="lg" block style={{ margin: "20px", width: window.innerWidth - 40 }}>Load More</Button>
                }


            </div>)
    }
}

export default SearchBusiness



const Carousal = (props) => {
    return (


        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height={window.innerHeight - 250}
                    src="https://iptvmasala.com/wp-content/uploads/2019/04/Sports-IPTV-m3u-playlist.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>SpoRtify</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height={window.innerHeight - 250}
                    src="https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/gettyimages-649666110-1563321202.jpg?crop=1.00xw:0.892xh;0,0.0668xh&resize=900:*"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>SpoRtify</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height={window.innerHeight - 250}
                    src="http://www.realdetroitweekly.com/wp-content/uploads/2016/12/Basketball.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>SpoRtify</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

const RenderBisList = ({ bisArray, flag, renderDetails }) => {

    return (
        bisArray.map(
            bis => {
                return (
                    <RenderBusiness bis={bis} key={bis.business_id} renderDetails={renderDetails}> </RenderBusiness>

                )
            }
        )
    );

}