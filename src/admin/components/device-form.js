import React, {useState} from 'react'
import Button from "react-bootstrap/Button";
import * as API_USERS from '../api/device-api';
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, DropdownMenu, DropdownToggle, NavLink, Row, UncontrolledDropdown} from "reactstrap";
import {Form, FormGroup, Input, Label, DropdownItem, ButtonDropdown} from 'reactstrap';
import validate from "./validators/validator";
import * as API_CLIENTS from "../api/client-api";
import {TagsMultiSelect} from "./client-device";
import {Multiselect} from "multiselect-react-dropdown";
import Select, { default as ReactSelect } from "react-select";

class DeviceForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.selectedData = this.props.selectedData;
        this.state = {
            clients: [],
            errorStatus: 0,
            error: null,
            formIsValid: this.props.action === 'update',
            options: [{name: "Roxana", id: 1},{name: "Ana", id: 2}],
            formControls: {
                description: {
                    value: this.props.action === 'update' ? this.props.description : null,
                    placeholder: 'Device description',
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
                maxEnergy: {
                    value: this.props.action === 'update' ? this.props.maxEnergy : null,
                    placeholder: 'Maximum energy',
                    valid: this.props.action === 'update',
                    touched: false,
                },
                averageEnergy: {
                    value: this.props.action === 'update' ? this.props.averageEnergy : null,
                    placeholder: 'Average energy',
                    valid: this.props.action === 'update',
                    touched: false,
                },
                client: {
                    value: this.props.action === 'update' ? this.props.client : null,
                    placeholder: 'Select a client',
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

    handleChange = event => {
        this.fetchClients();
        console.log(this.state.clients);

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

    registerDevice(device) {
        return API_USERS.postDevice(device, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted device with id: " + result);
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

    updateDevice(device, id) {
        return API_USERS.putDevice(id, device, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted device with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    onChange = item => {
       this.state.formControls.client = item.label
    }

    handleSubmit() {
        let device = {
            description: this.state.formControls.description.value,
            address: this.state.formControls.address.value,
            maxEnergy: this.state.formControls.maxEnergy.value,
            averageEnergy: this.state.formControls.averageEnergy.value,
            client: this.state.formControls.client.value
        };
        console.log(device);
        this.props.action === 'update' ? this.updateDevice(device, this.props.id) : this.registerDevice(device)
    }

    selectedData() {
        this.state.formControls.description.value = this.selectedData.description;
        this.state.formControls.address.value = this.selectedData.address;
        this.state.formControls.maxEnergy.value = this.selectedData.maxEnergy;
        this.state.formControls.averageEnergy.value = this.selectedData.averageEnergy;
        this.state.formControls.client.value = this.selectedData.client;

    }


    fetchClients() {
        return API_CLIENTS.getClient((result, status, err) => {
            if (result !== null && status === 200) {
                for (const i in result) {
                    this.state.clients.push(result[i]['name']);
                }
                this.setState({
                    clients: result,
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

    render() {
        return (
            <div>
                <FormGroup id = 'description'>
                    <Label for = 'descriptionField'> Description: </Label>
                    <Input name = 'description' id = 'descriptionField' placeholder = {this.state.formControls.description.placeholder}
                           onChange = {this.handleChange}
                           defaultValue = {this.state.formControls.description.value}
                           touched = {this.state.formControls.description.touched? 1 : 0}
                           valid = {this.state.formControls.description.valid}
                           required
                    />
                    {this.state.formControls.description.touched && !this.state.formControls.description.valid &&
                    <div className={"error-message row"}> *Description must have at least 3 characters</div> }
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

                <FormGroup id = 'maxEnergy'>
                    <Label for = 'maxEnergyField'> Maximum energy: </Label>
                    <Input name = 'maxEnergy' id = 'maxEnergyField' placeholder = {this.state.formControls.maxEnergy.placeholder}
                           type = "number"
                           onChange = {this.handleChange}
                           defaultValue = {this.state.formControls.maxEnergy.value}
                           touched = {this.state.formControls.maxEnergy.touched? 1 : 0}
                           valid = {this.state.formControls.maxEnergy.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id = 'averageEnergy'>
                    <Label for = 'averageEnergyField'> Average energy: </Label>
                    <Input name = 'averageEnergy' id = 'averageEnergyField' placeholder = {this.state.formControls.averageEnergy.placeholder}
                           type = "number"
                           onChange = {this.handleChange}
                           defaultValue = {this.state.formControls.averageEnergy.value}
                           touched = {this.state.formControls.averageEnergy.touched? 1 : 0}
                           valid = {this.state.formControls.averageEnergy.valid}
                           required
                    />
                </FormGroup>


                <FormGroup id = 'client'>
                    <Label for = 'clientField'> Clients: </Label>
                            <Select
                            options={this.state.clients.map(item => ({value: item.id, label: item.name}))}
                            onChange={this.onChange}
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
export default DeviceForm;