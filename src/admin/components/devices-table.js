import React from "react";
import Table from "../../commons/tables/table";
import * as API_USERS from "../api/device-api";
import { Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import DeviceEditForm from "./deviceEdit-form";

const filters = [
    {
        accessor: 'description'
    }
];

class DevicesTable extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {
            selectedData: {},
            selected: false,
            collapseForm: false,
            isChecked: false,
            tableData: this.props.tableData,
            type: "device"
        };
        this.tableData2 = [];
        this.crudDevice = [];
        this.columns = [
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                Header: 'Maximum energy',
                accessor: 'maxEnergy',
            },
            {
                Header: 'Average energy',
                accessor: 'averageEnergy',
            },
            {
                Header: 'Clients',
                accessor: 'clients',
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

    deleteDevice(id) {
        return API_USERS.deleteDevice(id, (result, status, err) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully deleted device with id: " + id);
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
            this.crudDevice = [];
            this.crudDevice.push(row.original);
            console.log(this.crudDevice);
            this.deleteDevice(this.crudDevice[0]);
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
                        <DeviceEditForm reloadHandler = {this.reload}
                                        selectedData = {this.state.selectedData}
                                        toggleForm = {this.toggleForm}
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
export default DevicesTable;