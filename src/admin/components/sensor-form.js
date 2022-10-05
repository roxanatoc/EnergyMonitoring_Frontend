import React from 'react'
import Button from "react-bootstrap/Button";
import * as API_USERS from '../api/sensor-api';
import * as API_DEVICES from '../api/device-api';
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import validate from "./validators/validator";
import Select from "react-select";

class SensorForm extends React.Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.selectedData = this.props.selectedData;

        this.state = {
            devices : [],
            errorStatus: 0,
            error: null,
            formIsValid: this.props.action === 'update',
            formControls: {
                description: {
                    value: this.props.action === 'update' ? this.props.description : null,
                    placeholder: 'Sensor description',
                    valid: this.props.action === 'update',
                    touched: false,
                    validationRules: {
                        minLength:3,
                        isRequired: true
                    }
                },
                maxValue: {
                    value: this.props.action === 'update' ? this.props.maxValue : null,
                    placeholder: 'Maximum value',
                    valid: this.props.action === 'update',
                    touched: false,
                },
                device: {
                    value: this.props.action === 'update' ? this.props.device : null,
                    placeholder: 'Device',
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
        this.fetchDevices();
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

    registerSensor(sensor) {
        return API_USERS.postSensor(sensor, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted sensor with id: " + result);
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

    updateSensor(sensor, id) {
        return API_USERS.putSensor(id, sensor, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully update sensor with id: " + result);
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
        this.state.formControls.device = item.label
    }

    handleSubmit() {
        let sensor = {
            description: this.state.formControls.description.value,
            maxValue: this.state.formControls.maxValue.value,
            device: this.state.formControls.device.value
        };
        console.log(sensor);
        this.props.action === 'update' ? this.updateSensor(sensor, this.props.id) : this.registerSensor(sensor)
    }

    selectedData() {
        this.state.formControls.description.value = this.selectedData.description;
        this.state.formControls.maxValue.value = this.selectedData.maxValue;
        this.state.formControls.device.value = this.selectedData.device;

    }

    fetchDevices() {
        return API_DEVICES.getDevice((result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    devices: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
            console.log(result);
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

                <FormGroup id = 'maxValue'>
                    <Label for = 'maxValueField'> Maximum value: </Label>
                    <Input name = 'maxValue' id = 'maxValueField' placeholder = {this.state.formControls.maxValue.placeholder}
                           type = "number"
                           onChange = {this.handleChange}
                           defaultValue = {this.state.formControls.maxValue.value}
                           touched = {this.state.formControls.maxValue.touched? 1 : 0}
                           valid = {this.state.formControls.maxValue.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id = 'device'>
                    <Label for = 'deviceField'> Device: </Label>
                    <Select
                        options={this.state.devices.map(item => ({value: item.id, label: item.description}))}
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
export default SensorForm;