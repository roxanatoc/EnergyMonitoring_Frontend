import React from 'react';
import {Card, CardHeader, Col, Row} from 'reactstrap';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import * as API_USERS from "../admin/api/monitoredValue-api";
import ValuesTable from "../admin/components/values-table";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {HOST} from "../commons/hosts";
import swal from "sweetalert";
let link2=''

class ClientContainer extends React.Component {
    constructor(props) {
        super(props);
        this.reloadHand = this.reloadHand.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            websocketConnected: false
        };
    }

    componentDidMount() {
        this.connectToWebsocket();
        this.fetchValues();
    }

    fetchValues() {
        return API_USERS.getValues((result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            }
            else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    connectToWebsocket() {
        const websoket = new SockJS(HOST.test_api + 'socket')
        const stompClient = Stomp.over(websoket)
        stompClient.connect({},()=>{
            stompClient.subscribe('/topic/socket/monitoredValue/values', not=>{
                alert(not.body);
            })
        })
    }

    reloadHand() {
        this.setState({
            isLoaded: false
        });
        this.fetchValues();
        this.connectToWebsocket();
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    reload() {
        this.setState({isLoaded: false});
        this.toggleForm();
    }

    render() {
        if(sessionStorage.getItem('ROLE') === 'Client'){
            return (
                <div>
                    <CardHeader>
                        <strong> Client Management </strong>
                    </CardHeader>
                    <Col sm={{offset: 1}}>
                        <br/>
                        <h1> Hello Client! </h1>
                    </Col>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h3>Client name: {sessionStorage.getItem('username')}</h3>
                    <h3>Client address: {sessionStorage.getItem('address')}</h3>
                    <h3>Client birthdate: {sessionStorage.getItem('birthdate')}</h3>
                    <br/>
                    <br/>
                    <br/>

                    <Card>
                        <Row>
                            <Col sm={{size: '7', offset: 1}}>
                                {this.state.isLoaded && <ValuesTable tableData = {this.state.tableData}/>}
                                {this.state.errorStatus > 0 && <APIResponseErrorMessage errorStatus = {this.state.errorStatus} error = {this.state.error} /> }
                            </Col>
                        </Row>
                    </Card>
                </div>
            );
        }
        else{
            return(
                <Col sm={{offset: 1}}>
                    <br/>
                    <h1> You must login as an Client! </h1>
                </Col>
            )
        }

    }
}

export default ClientContainer;