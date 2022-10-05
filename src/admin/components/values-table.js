import React from "react";
import Table from "../../commons/tables/table";

const filters = [
    {
        accessor: 'sensor_id'
    }
];

class ValuesTable extends React.Component {

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
            type: "monitoredValues"
        };
        this.columns = [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Timestamp',
                accessor: 'timestamp',
            },
            {
                Header: 'Value',
                accessor: 'value',
            }
        ];
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
            </div>)
    }
}
export default ValuesTable;