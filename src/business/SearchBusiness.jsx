import React, { PureComponent } from 'react';
import './SearchBusiness.css';
import { businessService } from '../services/businessService';
import RenderBusiness from './RenderBusiness';
import { Button, Row, Container, Col, Carousel } from 'react-bootstrap';
import { AutoScaling } from 'aws-sdk';

const astyle = {
    'text-align': 'center'
}
class SearchBusiness extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            activity: "Golf",
            city: "Las Vegas",
            last_key_business_id: "",
            last_key_city: "",
            searchData: [],
            enableCarousal: true
        }
        this.updateCity = this.updateCity.bind(this)
        this.updateActivity = this.updateActivity.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.loadMore = this.loadMore.bind(this)
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
        return (
            <div>
                {
                    this.state.enableCarousal &&
                    <Carousal></Carousal>
                }

                <section className="search-sec">
                    <div className="container">
                        {
                             !this.state.enableCarousal &&
                             <h1 style={{color:"white", margin: "auto", marginBottom: "10px"}}>SpoRtify</h1>
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
                        <Row style={{ margin: 20 }}>
                            <Col xl={{ span: 6, offset: 3 }} >
                                <RenderBisList bisArray={this.state.searchData} flag={0}></RenderBisList>
                            </Col>
                        </Row>
                </div>
                {
                    !this.state.enableCarousal &&
                    <Button variant="secondary" onClick={this.loadMore} size="lg" block style={{margin:"20px", width:window.innerWidth-40}}>Load More</Button>
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
                    height={window.innerHeight - 160} 
                    src="https://iptvmasala.com/wp-content/uploads/2019/04/Sports-IPTV-m3u-playlist.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height={window.innerHeight - 160} 
                    src="https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/gettyimages-649666110-1563321202.jpg?crop=1.00xw:0.892xh;0,0.0668xh&resize=900:*"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height={window.innerHeight - 160} 
                    src="https://usercontent2.hubstatic.com/14476037_f520.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

const RenderBisList = ({ bisArray, flag }) => {

    return (
        bisArray.map(
            bis => {
                return (

                    <RenderBusiness bis={bis} key={bis.business_id}> </RenderBusiness>

                )
            }
        )
    );

}