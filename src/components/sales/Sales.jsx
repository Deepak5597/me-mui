import { useState, useEffect, useMemo } from 'react';
import { Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DeleteRounded } from '@mui/icons-material';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useCallback } from 'react';
import useGlobal from '../../hooks/useGlobal';

function Sales() {

    const [rows, setRows] = useState([{ id: 1, item: "none", price: 0 }]);
    const [selectedParty, setSelectedParty] = useState("none");
    const [billingLocation, setBillingLocation] = useState([]);
    const [selectedBillingLocation, setSelectedBillingLocation] = useState('none');
    const [itemListDropdown, setItemListDropdown] = useState([]);
    const { parties, items } = useGlobal();

    const handleEditRowsModelChange = (e) => {
        const keys = Object.keys(e);
        if (keys.length) {
            const value = e[keys[0]].item.value;
            const item = items.filter((item) => item.shortName === value);
            console.log(item)
            setRows((prevRows) => {
                const data = [];
                console.log(prevRows)
                prevRows.map((row) => {
                    console.log(row)
                    if ((Number(row.id) === Number(keys[0])) && (item.length)) {
                        console.log("in")
                        data.push({ id: keys[0], item: item[0].shortName, longName: item[0].longName })
                    } else {
                        data.push(row);
                    }
                })
                console.log(data)
                return data;
            })
        }
    }
    const deleteItem = useCallback(
        (id) => () => {
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        },
        [],
    );
    const columns = useMemo(() => [
        {
            field: 'item',
            editable: true,
            type: 'singleSelect',
            valueOptions: itemListDropdown
        },
        {
            field: 'longName'
        },
        {
            field: 'price'
        },
        {
            field: 'actions',
            type: 'actions',
            width: "50",
            getActions: (params) => [
                <GridActionsCellItem icon={<DeleteRounded />} label="Delete" onClick={deleteItem(params.id)} />
            ]
        }
    ], [deleteItem, itemListDropdown]);


    const partyChanged = (e) => {
        setSelectedParty(e.target.value);
        const sp = parties.filter((party) => party.id === e.target.value);
        setBillingLocation(sp[0].billingLocation);
        if (sp[0].billingLocation.length)
            setSelectedBillingLocation(sp[0].billingLocation[0].billingName);
    }

    const billingLocationChanged = (e) => {
        setSelectedBillingLocation(e.target.value);
    }

    useEffect(() => {
        const items = ["none"];
        items.forEach(item => items.push(item.shortName));
        setItemListDropdown(items);
    }, [])

    const addBlankItem = () => {
        setRows((prevRows) => [...prevRows, { id: 10, item: "none", price: 0 }])
    }

    return (
        <Box sx={{ bgcolor: "white", height: "87vh", width: "100%", p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" pb={2} pl={2}>Add New Sales</Typography>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }} noValidate autoComplete="off">
                <FormControl sx={{ m: 1, mr: 3, width: "25ch" }}>
                    <InputLabel id="demo-simple-select-helper-label">Customer</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Party"
                        onChange={partyChanged}
                        value={selectedParty}
                    >
                        <MenuItem value="none">
                            <em>None</em>
                        </MenuItem>
                        {
                            parties.map((party, index) => (
                                <MenuItem key={index} value={party.id}>{party.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, mr: 3, width: "25ch" }}>
                    <InputLabel id="demo-simple-select-helper-label">Customer</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Party"
                        value={selectedBillingLocation}
                        onChange={billingLocationChanged}
                    >
                        <MenuItem value="none">
                            <em>None</em>
                        </MenuItem>
                        {
                            billingLocation &&
                            billingLocation.map((location, index) => (
                                <MenuItem key={`billing_${index}`} value={location.billingName}>{location.billingName}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                {/* <FormControl sx={{ m: 1, mr: 3, width: "25ch" }}>
                    <TextField required id="outlined-required" label="Required" />
                </FormControl> */}
            </Box>
            <Divider />
            <Box sx={{ height: "4rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Button variant="contained" sx={{ float: "right" }} onClick={addBlankItem}> Add Row</Button>
            </Box>
            <Box sx={{ flex: 1 }}>
                <DataGrid columns={columns} rows={rows} onEditRowsModelChange={handleEditRowsModelChange} />
            </Box>
        </Box>
    )
}

export default Sales;
