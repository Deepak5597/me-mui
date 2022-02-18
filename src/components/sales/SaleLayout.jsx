import { useReducer } from 'react';

import { Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import saleReducer from '../../reducers/saleReducer';
import ItemForm from './ItemForm';
import useGlobal from '../../hooks/useGlobal';

function SaleLayout() {
    const { parties, items, dynamicConfig: { units } } = useGlobal();

    const initialValue = {
        "partyDetails": {
            "party": {},
            "selectedParty": "none",
            "billingLocation": { "billingName": "none" },
            "items": [],
        },
        "isLoading": false,
        "partyData": parties,
        "itemsData": items,
        "itemUnits": units,
        "billingLocationDropdownData": [],
        "billingType": "retail"
    }
    const [saleForm, saleDispatcher] = useReducer(saleReducer, initialValue);

    const handlePartyChanged = (e) => saleDispatcher({ key: "PARTY_CHANGED", value: e.target.value });
    const handleBillingLocationChange = (e) => saleDispatcher({ key: "BILLING_LOCATION_CHANGED", value: e.target.value });
    return (
        <Box sx={{ bgcolor: "white", height: "87vh", width: "100%", p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" pb={2} pl={2}>Add New Sales</Typography>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap", mb: 1 }} noValidate autoComplete="off">
                <FormControl sx={{ m: 1, mr: 3, width: "20ch" }}>
                    <InputLabel id="demo-simple-select-helper-label">Party</InputLabel>
                    <Select
                        size="small"
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Party"
                        onChange={handlePartyChanged}
                        value={saleForm.partyDetails.selectedParty}
                    >
                        <MenuItem value="none">
                            <em>None</em>
                        </MenuItem>
                        {
                            saleForm.partyData.map((party, index) => (
                                <MenuItem key={`pt_${party.id}`} value={party.id}>{party.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                {
                    saleForm?.billingLocationDropdownData.length > 0 &&
                    <FormControl sx={{ m: 1, mr: 3, width: "20ch" }}>
                        <InputLabel id="demo-simple-select-helper-label">Billing Name</InputLabel>
                        <Select
                            size="small"
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Billing Name"
                            value={saleForm.partyDetails.billingLocation.billingName}
                            onChange={handleBillingLocationChange}
                        >
                            {
                                saleForm.billingLocationDropdownData.length &&
                                saleForm.billingLocationDropdownData.map((location, index) => (
                                    <MenuItem key={`billing_${index}`} value={location.billingName}>{location.billingName}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                }

                {
                    saleForm?.billingType &&
                    <FormControl sx={{ m: 1, mr: 3, width: "10ch" }}>
                        <TextField size="small" disabled id="outlined-required" label="Billing Type" value={saleForm?.billingType} />
                    </FormControl>
                }
                {
                    saleForm?.partyDetails?.billingLocation?.billingContactNumber &&
                    <FormControl sx={{ m: 1, mr: 3 }}>
                        <TextField size="small" disabled id="outlined-required" label="Contact Number" value={saleForm?.partyDetails?.billingLocation?.billingContactNumber} />
                    </FormControl>
                }
                {
                    saleForm?.partyDetails?.billingLocation?.billingAddress &&
                    <FormControl sx={{ m: 1, mr: 3, flex: 1 }}>
                        <TextField size="small" disabled id="outlined-required" label="Address" value={saleForm?.partyDetails?.billingLocation?.billingAddress} />
                    </FormControl>
                }
            </Box>
            <Divider />
            <Box sx={{ m: 1, flex: 1 }}>
                <ItemForm itemData={saleForm.itemsData} saleDispatcher={saleDispatcher} billingType={saleForm?.billingType} />
            </Box>
        </Box>
    )
}

export default SaleLayout