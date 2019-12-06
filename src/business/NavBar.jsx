import React, { PureComponent } from 'react'
import { Navbar } from 'react-bootstrap';
import LogInPage from '../components/LogInPage';
import LogOut from '../components/LogOut';

class NavBar extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            userObj: {},
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
        let userObjStr = sessionStorage.getItem("userObj")
        const userObj = JSON.parse(userObjStr);
        console.log(userObj)
        console.log(userName)
        this.setState({
            userObj: userObj,
            user: userEmail
        })
    }

    render() {
        let userObj = this.state.userObj;
        console.log("User Object from Render: ", userObj);
        return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>SpoRtify</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    { userObj  &&
                        <Navbar.Text>
                            Signed in {
                                userObj.email && <Navbar.Text style={{padding:0}}>
                                as : &nbsp;<a href="#login"> {this.state.user}</a>
                                </Navbar.Text>
                                }
                            
                               
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