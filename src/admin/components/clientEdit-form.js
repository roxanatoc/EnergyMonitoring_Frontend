import React from 'react'
import Button from "react-bootstrap/Button";
import * as API_USERS from '../api/client-api';
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import DatePicker from "react-datepicker"
import "react-datepicker/src/stylesheets/datepicker.scss";

class ClientEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.props.toggleForm;
        this.reloadHandler = this.props.reloadHandler;

        this.state = {
            errorStatus: 0,
            error: null,
            formIsValid: false,
            startDate: new Date(),
            formControls: {
                name: {
                    value: '',
                    placeholder: 'Client name',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength:3,
                        isRequired: true
                    }
                },
                address: {
                    value: '',
                    placeholder: 'City, Street, Number',
                    valid: false,
                    touched: false,
                },
                birthdate: {
                    value: new Date(),
                    placeholder: 'Birthdate',
                    valid: false,
                    touched: false,
                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    handleDateChange = date => {
        console.log(date);
        this.setState({
            startDate: date,
        });
    }

    selectedData() {
        this.state.formControls.name.value = this.selectedData.name;
        this.state.formControls.address.value = this.selectedData.address;
        this.state.formControls.birthdate.value = this.selectedData.birthdate;
    }

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.props.selectedData[name] = value;
    };

    updateClient(client, id) {
        return API_USERS.putClient(id, client, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated client with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        let client = {
            id: this.props.selectedData['id'],
            name: this.props.selectedData['name'],
            address: this.props.selectedData['address'],
            birthdate: this.props.selectedData['birthdate'],
        };
        console.log(client);
        this.updateClient(client, this.props.selectedData['id']);
    }

    render() {
        return (
            <div>
                <FormGroup id = 'name'>
                    <Label for = 'nameField'> Name: </Label>
                    <Input name = 'name' id = 'nameField' placeholder = {this.state.formControls.name.placeholder}
                           onChange = {this.handleChange}
                           defaultValue = {this.props.selectedData['name']}
                           required
                    />
                </FormGroup>

                <FormGroup id = 'address'>
                    <Label for = 'addressField'> Address: </Label>
                    <Input name = 'address' id = 'addressField' placeholder = {this.state.formControls.address.placeholder}
                           onChange = {this.handleChange}
                           defaultValue = {this.props.selectedData['address']}
                           required
                    />
                </FormGroup>

                <FormGroup id='birthdate'>
                    <Label for='birthdateField'> Birthdate: </Label>
                    <DatePicker name='birthdate' id='birthdateField'
                                selected={this.state.startDate}
                                onChange={this.handleDateChange}
                                defaultValue={this.props.selectedData['birthdate']}
                                required
                    />
                </FormGroup>

                <Row>
                    <Col sm = {{size: '4', offset: 8}}>
                        <Button type = {"submit"} onClick={() => {
                            this.handleSubmit()
                            this.toggleForm()
                        }}> Submit </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default ClientEditForm;