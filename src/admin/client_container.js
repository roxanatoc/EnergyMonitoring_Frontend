import * as API_USERS from "./api/client-api"
import HeaderAdmin from "./components/header_admin";
import ClientsTable from "./components/clients-table";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import React from "react";
import {ModalHeader, Card, Row, Button, Col, Modal, ModalBody} from "reactstrap";
import ClientForm from "./components/client-form";

class ClientsCRUD extends React.Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.handleSelectRow = this.handleSelectRow.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.reloadHand = this.reloadHand.bind(this);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            selectedRow: false,
            action: null,
            id: null,
            client: {
                name: null,
                address: null,
                birthdate: null
            }
        };
    }


    componentDidMount() {
        this.fetchClients();
    }

    fetchClients() {
        return API_USERS.getClient((result, status, err) => {
            if (result !== null && status === 200) {
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


    handleUpdate() {
        this.setState({action: 'update'});
        this.toggleForm()
    }

    handleAdd() {
        this.setState({action: 'add'});
        this.toggleForm()
    }

    handleSelectRow(id) {
        this.setState({
            selectedRow: true,
            id: id.id,
            client: {
                name: id.name,
                address: id.address,
                birthdate: id.birthdate
            }
        })
    }

    reloadHand() {
        this.setState({
            isLoaded: false
        });
        this.fetchClients();
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    reload() {
        this.setState( {isLoaded: false});
        this.toggleForm();
        this.fetchClients();
    }

    render() {
        if(sessionStorage.getItem('ROLE') === 'Admin') {
        return (
            <div>
                <HeaderAdmin/>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" size={"lg"} onClick={this.handleAdd}>Add client</Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '7', offset: 1}}>
                            {this.state.isLoaded && <ClientsTable tableData = {this.state.tableData}
                                                                  reloadHandler = {this.reloadHand}
                                                                  handleSelectRow = {this.handleSelectRow.bind(this)} />}
                                {this.state.errorStatus > 0 && <APIResponseErrorMessage errorStatus = {this.state.errorStatus} error = {this.state.error} /> }
                        </Col>
                    </Row>
                </Card>
                <Modal isOpen={this.state.selected} toggle={this.toggleForm} className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}>Add client</ModalHeader>
                    <ModalBody>
                        <ClientForm reloadHandler = {this.reload}
                        />
                    </ModalBody>
                </Modal>
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
export default ClientsCRUD;