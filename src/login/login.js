import React from "react";
import {FormGroup, Label, Input, Button, Container, Col} from "reactstrap";
import * as API_USERS from "./api/login-api";
import {Redirect} from 'react-router-dom';
import * as API_CLIENTS from "../admin/api/client-api";

class Login extends React.Component {

    constructor(props)
    {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.username = '';
        this.password = '';
        this.account = {
            id: null,
            username: '',
            password: '',
            role: '',
        };
        this.state = {
            isLogged: false,
            errorStatus: 0,
            error: null,
            data: false,
            username: '',
            role: ''
        }
    }

    checkCredentials(username) {

        return API_USERS.getAccountByUsername(username, (result, status, error) => {
            if (result !== null && status === 200 && result.password === this.password) {
                console.log("Successfully checked account with id: " + result);
                this.account.id = result.id;
                this.account.username = result.username;
                sessionStorage.setItem('username', result.username);
                this.account.password = result.password;
                this.account.role = result.role;
                this.setState(() => ({
                    isLogged: true,
                    username: result.username,
                    role: result.role
                }))
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error,
                    isLogged: false
                }));
                console.log("result=" + result);
            }
        });
    }

    getClientName(username) {
        return API_CLIENTS.getClientByUsername(username, (result, status, error) => {
            if (result !== null && status === 200) {
                console.log("Successfully get client with id: " + username);
                sessionStorage.setItem('id', result['id']);
                sessionStorage.setItem('name', result['name']);
                sessionStorage.setItem('address', result['address']);
                sessionStorage.setItem('birthdate', result['birthdate']);
                this.setState({
                    errorStatus: status,
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
            console.log("result = " + result);
        });
    }

    handleLogin() {
        console.log(this.username);
        console.log(this.password);
        this.checkCredentials(this.username);
    }

    render() {
        const { isLogged, role } = this.state;
        if (isLogged === true && role === 'Admin')
        {
            console.log(this.username);
            sessionStorage.setItem('username', this.username);
            sessionStorage.setItem('ROLE', role);
            console.log("ROLE = " + role);
            return (<Redirect to={{
                pathname: '/admin/' + this.username,
                state: {username: this.state.username}

            }} />)
        }

        if (isLogged === true && role === 'Client')
        {
            console.log(this.username);
            sessionStorage.setItem('username', this.username);
            sessionStorage.setItem('ROLE', role);
            console.log(isLogged);
            this.getClientName(sessionStorage.getItem('username'));
            return (<Redirect to={{
                pathname: '/client/' + this.username
            }}
            />)
        }
        return (
            <div style={{backgroundColor: 'white'}}>
                <br/>
                <br/>
                <Container className={"Login"} md={{ size: 6, offset: 3}}>
                    <br/>
                    <br/>
                    <h1 className={"text-center"}>Login</h1>
                    <br/>
                    <Col md={{size: 6, offset: 3}}>
                        <FormGroup>
                            <Label for = "username">Username</Label>
                            <Input type = "username" name = "username" id = "username" placeholder = "username"
                                   onChange={(e) => {this.username = (e.target.value);}}
                            />
                        </FormGroup>
                    </Col>
                    <br/>
                    <Col md={{size: 6, offset: 3}}>
                        <FormGroup>
                            <Label for = "password">Password</Label>
                            <Input type = "password" name = "password" id = "password" placeholder = "password"
                                   onChange={(e) => {this.password = (e.target.value);}}/>
                        </FormGroup>
                    </Col>
                    <br/>
                    <br/>
                    <Col className={"text-center"}>
                        <Button size={"lg"} id={"button"} onClick={this.handleLogin}>Login</Button>
                        {this.state.errorStatus > 250 && <div style={{color: "red", fontSize: "26px"}} className={"error-message"}>Incorect username or password!</div>}
                    </Col>
                    <br/>
                    <br/>

                </Container>
            </div>
        )
    }
}

export default Login