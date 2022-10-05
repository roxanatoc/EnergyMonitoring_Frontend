import React from "react";
import {Button, ModalBody, ModalHeader} from "reactstrap";
import {HOST} from "../commons/hosts";
import RestApiClient from "../commons/api/rest-client";
import ReactTable from "react-table";


const AddDeviceToClient = (props) => {
    const addDevice = (device) => {
        let request = new Request(HOST.test_api + "/admin/client", {
            method: 'PUT',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({...props.client, patList: [...props.client.patList, device]
            })
        });

        RestApiClient.performRequest(request);
        props.toggle();
    }

    const columns = [
        {
            Header: "Description",
            accessor: 'description'
        },
        {
            Header: "Select",
            Cell: (row) => {
                return <Button onClick={() => addDevice(row.original)}>Select device</Button>
            }
        }
    ]

    return (
        <>
            <ModalHeader toggle={props.toggle}>Client actions</ModalHeader>
            <ModalBody>
                <ReactTable
                    data={props}
                    columns={columns}
                    defaultPageSize={10}
                />
            </ModalBody>
        </>)
}

export default AddDeviceToClient;