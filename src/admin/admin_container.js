import React from 'react';
import {Col} from 'reactstrap';
import HeaderAdmin from "./components/header_admin";

class AdminContainer extends React.Component {

    render() {
        if(sessionStorage.getItem('ROLE') === 'Admin') {
            return (
                <div>
                    <HeaderAdmin/>
                    <div style={{backgroundColor: "white"}}>
                        <Col sm={{offset: 1}}>
                            <br/>
                            <h1> Hello Admin! </h1>
                        </Col>
                    </div>
                </div>
            );
        }
        else{
            return (
                <Col sm={{offset: 1}}>
                    <br/>
                    <h1> You must login as an Admin! </h1>
                </Col>
            )
        }
    }
}

export default AdminContainer;