import React from 'react';

import BackgroundImg from '../commons/images/platform2.png';

import {Button, Col, Container, Jumbotron} from 'reactstrap';

const backgroundStyle = {
    backgroundPosition: 'top center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1000px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white', };

class Home extends React.Component {


    render() {
        if (sessionStorage.getItem('ROLE') !== 'Admin' || sessionStorage.getItem('ROLE') !== 'Client') {
            return (

                <div>
                    <Jumbotron fluid style={backgroundStyle}>
                        <Container fluid>
                            <h1 className="display-3" style={textStyle}>Online Energy Utility Platform</h1>
                            {/*<p className="lead" style={textStyle}> <b>Enabling real time monitoring of patients, remote-assisted care services and
                            smart intake mechanism for prescribed medication.</b> </p>*/}
                            <hr className="my-2"/>
                            {/*<p  style={textStyle}> <b>This assignment represents the first module of the distributed software system "Integrated
                            Medical Monitoring Platform for Home-care assistance that represents the final project
                            for the Distributed Systems course. </b> </p>
                        <p className="lead">
                            <Button color="primary" onClick={() => window.open('http://coned.utcluj.ro/~salomie/DS_Lic/')}>Learn
                                More</Button>
                        </p>*/}

                        </Container>
                    </Jumbotron>

                </div>
            )
        } else {
            return (
                <Col sm={{offset: 1}}>
                    <br/>
                    <h1> You must login first! </h1>
                </Col>
            )
        }

    }
}

export default Home
