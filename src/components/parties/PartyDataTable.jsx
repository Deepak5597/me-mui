import { useEffect, useState, useMemo, useCallback } from 'react';

import { Box } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import sanitizeGridData from './sanitizeGridData';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';

function PartyDataTable({ data }) {
    let [rows, setRows] = useState([]);

    const viewTransaction = useCallback((id) => {
    }, [])

    const editTransaction = useCallback((id) => {
    }, [])

    const columns = useMemo(() => [
        { field: 'id', headerName: 'ID', width: 20 },
        { field: 'name', headerName: 'Name', width: 120 },
        { field: 'type', headerName: 'Type', width: 60 },
        { field: 'billingName', headerName: 'Billing Name', width: 150 },
        { field: 'billingContactNumber', headerName: 'Contact Number', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'creationDate', headerName: 'Date', width: 150 },
        { field: 'billingAddress', headerName: 'Address', width: 250 },
        { field: 'items', headerName: 'Items', width: 70 },
        { field: 'total', headerName: 'Total', width: 80 },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<PreviewIcon />}
                    label="Preview"
                    onClick={editTransaction(params.id)}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={viewTransaction(params.id)}
                    showInMenu
                />
            ]
        }
    ], [viewTransaction, editTransaction])

    useEffect(() => {
        setRows(sanitizeGridData(data));
    }, [data])

    return <Box component="div" sx={{ height: "100%", width: "100%" }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
        />
    </Box>;
}

export default PartyDataTable;
