import DataTable from 'react-data-table-component';

function DataTableBase(props) {
    return <DataTable pagination selectableRows {...props} />
}

export default DataTableBase;
