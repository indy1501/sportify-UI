import React, { PureComponent } from 'react'
import { Navbar } from 'react-bootstrap';
import LogInPage from '../components/LogInPage';
import LogOut from '../components/LogOut';

class NavBar extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            userObj: undefined,
            user: ""
        }
        this.loadUserObj = this.loadUserObj.bind(this)
    }

    componentDidMount() {
        this.loadUserObj()
    }

    loadUserObj() {
        let userName = sessionStorage.getItem("userName")
        let userEmail = sessionStorage.getItem("userEmail")
        let userObj = sessionStorage.getItem("userObj")
        console.log(userObj)
        console.log(userName)
        this.setState({
            userObj: userObj,
            user: userEmail
        })
    }

    render() {
        let userObj = sessionStorage.getItem("userObj");
        console.log("User Object from Render: ", userObj);
        return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>SpoRtify</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    { userObj && userObj.email &&
                        <Navbar.Text>
                            Signed in {userObj.email &&
                                <a href="#login">as: {userObj.email}</a>}
                        </Navbar.Text>
                    }
                </Navbar.Collapse>
                {userObj && <LogOut></LogOut>}
                {!userObj && <LogInPage></LogInPage>}
            </Navbar>
        )
    }
}

export default NavBar