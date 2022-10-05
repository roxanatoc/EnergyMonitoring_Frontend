import React from 'react'
import Button from "react-bootstrap/Button";
import * as API_USERS from '../api/device-api';
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';

class DeviceEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.props.toggleForm;
        this.reloadHandler = this.props.reloadHandler;

        this.state = {
            errorStatus: 0,
            error: null,
            formIsValid: false,

            formControls: {
                description: {
                    value: '',
                    placeholder: 'Device description',
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
                maxEnergy: {
                    value: '',
                    placeholder: 'Maximum energy',
                    valid: false,
                    touched: false,
                },
                averageEnergy: {
                    value: '',
                    placeholder: 'Average energy',
                    valid: false,
                    touched: false,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.props.selectedData[name] = value;
    };

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

    handleSubmit() {
        let device = {
            id: this.props.selectedData['id'],
            description: this.props.selectedData['description'],
            address: this.props.selectedData['address'],
            maxEnergy: this.props.selectedData['maxEnergy'],
            averageEnergy: this.props.selectedData['averageEnergy'],
        };
        console.log(device);
        this.updateDevice(device, this.props.selectedData['id']);
    }

    selectedData() {
        this.state.formControls.description.value = this.selectedData.description;
        this.state.formControls.address.value = this.selectedData.address;
        this.state.formControls.maxEnergy.value = this.selectedData.maxEnergy;
        this.state.formControls.averageEnergy.value = this.selectedData.averageEnergy;

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

                <FormGroup id = 'address'>
                    <Label for = 'addressField'> Address: </Label>
                    <Input name = 'address' id = 'addressField' placeholder = {this.state.formControls.address.placeholder}
                           onChange = {this.handleChange}
                           defaultValue = {this.props.selectedData['address']}
                           required
                    />
                </FormGroup>

                <FormGroup id = 'maxEnergy'>
                    <Label for = 'maxEnergyField'> Maximum energy: </Label>
                    <Input name = 'maxEnergy' id = 'maxEnergyField' placeholder = {this.state.formControls.maxEnergy.placeholder}
                           onChange = {this.handleChange}
                           defaultValue = {this.props.selectedData['maxEnergy']}
                           required
                    />
                </FormGroup>

                <FormGroup id = 'averageEnergy'>
                    <Label for = 'averageEnergyField'> Average energy: </Label>
                    <Input name = 'averageEnergy' id = 'averageEnergyField' placeholder = {this.state.formControls.averageEnergy.placeholder}
                           onChange = {this.handleChange}
                           defaultValue = {this.props.selectedData['averageEnergy']}
                           required
                    />
                </FormGroup>

                <Row>
                    <Col sm = {{size: '4', offset: 8}}>
                        <Button type = {"submit"} onClick={ () => {
                            this.handleSubmit()
                            this.toggleForm()
                        }}> Submit </Button>

                    </Col>
                </Row>
            </div>
        );
    }
}
export default DeviceEditForm;