import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Card, Row, Col } from "react-bootstrap";
import { useRouteMatch } from 'react-router-dom';

// rfc
function LogInPage() {
    let { path, url, location } = useRouteMatch();
    console.log(location);
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>SpoRtify</Navbar.Brand>
            </Navbar>
            {/* <Link to="/login">click here</Link> */}
            <Col xl={{ span: 6, offset: 3 }}>
                <Row style={{ display: "block"}}>
                    <Card style={{ marginTop: "200px" }} className="text-center">
                        <Card.Header>Welcome to the SpoRtify App</Card.Header>
                        <Card.Body>
                            <Card.Text></Card.Text>
                            {/* <Button variant="primary" href="https://projectapp.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=6du6tkbf7lvqhdl5evnn6vc7sm&redirect_uri=http://localhost:3000"> */}
                            <Button variant="primary" href="https://storageapp.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=7rt07fe4ovcpqb6tdbrrajechq&redirect_uri=https://codeninjas.cf/Redirect">
                                LogIn / SignUp 
                            </Button>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
        </div>

    )
}

export default LogInPage

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { withAuth } from '@okta/okta-react';

// export default withAuth(
//   class LogInPage extends Component {
//     state = { authenticated: null };

//     checkAuthentication = async () => {
//       const authenticated = await this.props.auth.isAuthenticated();
//       const accessToken = await this.props.auth.getAccessToken();
//       console.log(accessToken);
//       if (authenticated !== this.state.authenticated) {
//         this.setState({ authenticated });
//       }
//     };

//     async componentDidMount() {
//       this.checkAuthentication();
//     }

//     async componentDidUpdate() {
//       this.checkAuthentication();
//     }

//     login = async () => {
//       this.props.auth.login('/');
//     };

//     logout = async () => {
//       this.props.auth.logout('/');
//     };

//     render() {
//       if (this.state.authenticated === null) return null;

//       const mainContent = this.state.authenticated ? (
//         <div>
          
//           <Button variant="primary"  onClick={this.logout}>
//             Logout
//           </Button>
//         </div>
//       ) : (
//         <div>
          
//           <Button variant="primary"  onClick={this.login}>
//             Login
//           </Button>
//         </div>
//       );

//       return (
//         <div className="jumbotron">
//           <h1 className="display-4">SpoRtify</h1>
//           {mainContent}
//         </div>
//       );
//     }
//   }
// );
