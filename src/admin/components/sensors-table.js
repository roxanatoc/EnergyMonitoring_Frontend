import React from "react";
import Table from "../../commons/tables/table";
import * as API_USERS from "../api/sensor-api";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import SensorEditForm from "./sensorEdit-form";

const filters = [
    {
        accessor: 'description'
    }
];

class SensorsTable extends React.Component {
    constructor(props) {
        super(props);

        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.reload = this.reload.bind(this);

        this.state = {
            selectedData: {},
            selected: false,
            collapseForm: false,
            isChecked: false,
            tableData: this.props.tableData,
            type: "sensor"
        };
        this.crudSensor = [];
        this.columns = [
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Maximum value',
                accessor: 'maxValue',
            },
            {
                Header: 'Device',
                accessor: 'device',
            },
            {
                Header: 'Operations',
                accessor: 'operations',
                Cell: (row) => (
                    <div>
                        <Button color="primary" onClick={(e) => this.handleDelete(e, row)}>Delete</Button>
                        <Button color="primary" onClick={() => {
                            this.setState({selectedData: row.original})
                            this.toggleForm()}}>Edit</Button>
                    </div>
                )
            }
        ];
    }

    deleteSensor(id) {
        return API_USERS.deleteSensor(id, (result, status, err) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully deleted sensor with id: " + id);
                this.reloadHandler();
            }
            else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    handleDelete = (event, row) => {
        if (window.confirm("Are you sure?")) {
            this.crudSensor = [];
            this.crudSensor.push(row.original);
            console.log(this.crudSensor);
            this.deleteSensor(this.crudSensor[0]);
        }

    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    reload() {
        this.setState( {
            isLoaded: false
        });
        this.toggleForm();
    }

    render() {
        return (
            <div>
                <Table data = {this.state.tableData}
                       columns = {this.columns}
                       search = {filters}
                       pageSize = {10}
                />

                <Modal isOpen={this.state.selected} toggle={this.toggleForm} className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}>Edit</ModalHeader>
                    <ModalBody>
                        <SensorEditForm reloadHandler = {this.reload}
                                        selectedData = {this.state.selectedData}
                                        toggleForm = {this.toggleForm}
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
export default SensorsTable;