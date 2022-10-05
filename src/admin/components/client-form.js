import React from 'react'
import Button from "react-bootstrap/Button";
import * as API_USERS from '../api/client-api';
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import validate from "./validators/validator";
import DatePicker from "react-datepicker"
import "react-datepicker/src/stylesheets/datepicker.scss";

class ClientForm extends React.Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.selectedData = this.props.selectedData;

        this.state = {
            errorStatus: 0,
            error: null,
            formIsValid: this.props.action === 'update',
            startDate: new Date(),
            formControls: {
                name: {
                    value: this.props.action === 'update' ? this.props.name : null,
                    placeholder: 'Client name',
                    valid: this.props.action === 'update',
                    touched: false,
                    validationRules: {
                        minLength:3,
                        isRequired: true
                    }
                },
                address: {
                    value: this.props.action === 'update' ? this.props.address : null,
                    placeholder: 'City, Street, Number',
                    valid: this.props.action === 'update',
                    touched: false,
                },
                birthdate: {
                    value: this.props.action === 'update' ? this.props.birthdate : new Date(),
                    placeholder: 'Birthdate',
                    valid: this.props.action === 'update',
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

        const updatedControls = this.state.formControls;
        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    };

    registerClient(client) {
        console.log(client);
        return API_USERS.postClient(client, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted client with id: " + result);
                this.reloadHandler();
            }
            else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

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
            name: this.state.formControls.name.value,
            address: this.state.formControls.address.value,
            birthdate: this.state.formControls.birthdate.value,
        };
        console.log(client);
        this.props.action === 'update' ? this.updateClient(client, this.props.id) : this.registerClient(client)
    }

    render() {
        return (
            <div>
                <FormGroup id = 'name'>
                    <Label for = 'nameField'> Name: </Label>
                    <Input name = 'name' id = 'nameField' placeholder = {this.state.formControls.name.placeholder}
                           onChange = {this.handleChange}
                           defaultValue = {this.state.formControls.name.value}
                           touched = {this.state.formControls.name.touched? 1 : 0}
                           valid = {this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> *Name must have at least 3 characters</div> }
                </FormGroup>

                <FormGroup id = 'address'>
                    <Label for = 'addressField'> Address: </Label>
                    <Input name = 'address' id = 'addressField' placeholder = {this.state.formControls.address.placeholder}
                           onChange = {this.handleChange}
                           defaultValue = {this.state.formControls.address.value}
                           touched = {this.state.formControls.address.touched? 1 : 0}
                           valid = {this.state.formControls.address.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='birthdate'>
                    <Label for='birthdateField'> Birthdate: </Label>
                    <DatePicker name='birthdate' id='birthdateField'
                                selected={this.state.startDate}
                                onChange={this.handleDateChange}
                                defaultValue={this.state.formControls.birthdate.value}
                                touched={this.state.formControls.birthdate.touched? 1 : 0}
                                valid={this.state.formControls.birthdate.valid}
                                required
                    />
                </FormGroup>

                <Row>
                    <Col sm = {{size: '4', offset: 8}}>
                        <Button type = {"submit"} onClick={this.handleSubmit}> Submit </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 && <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        );
    }
}
export default ClientForm;