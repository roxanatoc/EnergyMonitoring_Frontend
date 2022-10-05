import React from 'react'
import Button from "react-bootstrap/Button";
import * as API_USERS from '../api/sensor-api';
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import Select from "react-select";
import * as API_DEVICES from "../api/device-api";

class SensorEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {
            devices : [],
            errorStatus: 0,
            error: null,
            formIsValid: false,
            formControls: {
                description: {
                    value: '',
                    placeholder: 'Sensor description',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength:3,
                        isRequired: true
                    }
                },
                maxValue: {
                    value: '',
                    placeholder: 'Maximum value',
                    valid: false,
                    touched: false,
                },
                device: {
                    value: '',
                    placeholder: 'Device',
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

    handleChange = event => {
        this.fetchDevices();
        const name = event.target.name;
        const value = event.target.value;

        this.props.selectedData[name] = value;
    };

    updateSensor(sensor, id) {
        return API_USERS.putSensor(id, sensor, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated sensor with id: " + result);
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
        let sensor = {
            id: this.props.selectedData['id'],
            description: this.props.selectedData['description'],
            maxValue: this.props.selectedData['maxValue'],
            device: this.props.selectedData['device']
        };
        console.log(sensor);
        this.updateSensor(sensor, this.props.selectedData['id']);

    }

    selectedData() {
        this.state.formControls.description.value = this.selectedData.description;
        this.state.formControls.maxValue.value = this.selectedData.maxValue;
        this.state.formControls.device.value = this.selectedData.device;
    }

    onChange = item => {
        this.state.formControls.device = item.label
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
                           defaultValue = {this.props.selectedData['description']}
                           required
                    />
                </FormGroup>

                <FormGroup id = 'maxValue'>
                    <Label for = 'maxValueField'> Maximum value: </Label>
                    <Input name = 'maxValue' id = 'maxValueField' placeholder = {this.state.formControls.maxValue.placeholder}
                           onChange = {this.handleChange}
                           defaultValue = {this.props.selectedData['maxValue']}
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
            </div>
        );
    }
}
export default SensorEditForm;