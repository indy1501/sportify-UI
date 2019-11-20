import React from 'react'
import { Button, Navbar, Card } from "react-bootstrap";
import { useRouteMatch } from 'react-router-dom';

// rfc
function LogInPage() {
    let { path, url, location } = useRouteMatch();
    console.log(location);
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>DropBucket</Navbar.Brand>
            </Navbar>

            <Card style={{ width: '18rem', margin: "100px", justifyContent: "center"}}>
                <Card.Header>Welcome to the DropBucket App</Card.Header>
                <Card.Body>
                    <Card.Text></Card.Text>
                    <Button  variant="primary" href="https://projectapp.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=6du6tkbf7lvqhdl5evnn6vc7sm&redirect_uri=http://localhost:3000">
                        LogIn / SignUp  {/* <a href="https://projectapp.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=6du6tkbf7lvqhdl5evnn6vc7sm&redirect_uri=https://rashmicsproject.ml"> LOGIN</a> */}
                    </Button>
                </Card.Body>
            </Card>

        </div>

    )
}

export default LogInPage
