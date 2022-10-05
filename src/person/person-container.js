import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import PersonForm from "./components/person-form";
import PersonTable from "./components/person-table";
import * as API_USERS from "./api/person-api"


class PersonContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSelectRow = this.handleSelectRow.bind(this);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchPersons();
    }

    fetchPersons() {
        return API_USERS.getPersons((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    deletePerson(id) {
        return API_USERS.deletePerson(id, (result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
                this.fetchDevices();
            }
            else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    handleDelete() {
        this.deletePerson(this.state.id)
    }

    handleUpdate() {
        this.setState({action: 'update'});
        this.toggleForm()
    }

    handleSelectRow(id) {
        this.setState({
            selectedRow: true,
            id: id.id,
            device: {
                description: id.description,
                address: id.address,
                maxEnergy: id.maxEnergy,
                averageEnergy: id.averageEnergy
            }
        })
    }


    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchPersons();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Person Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Person </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <PersonTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    <Col sm="8" md={{ size:6, offset: 1}}>
                        <Button disabled={!this.state.selectedRow} color="primary" size={"lg"} onClick={this.handleDelete}>Delete device</Button>
                    </Col>
                    <br/>
                    <br/>
                    <br/>
                    <Col sm={{size: '8', offset: 1}}>
                        <Button  color="primary" size={"lg"} onClick={this.handleUpdate}>Update device</Button>
                    </Col>
                    <br/>
                    <br/>
                    <br/>
                    <Col sm={{size: '8', offset: 1}}>
                        <Button  color="primary" size={"lg"} href="admin/device">Manage devices</Button>
                    </Col>

                </Row>
                <br/>
                <br/>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Person: </ModalHeader>
                    <ModalBody>
                        <PersonForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}


export default PersonContainer;
