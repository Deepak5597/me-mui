import { useReducer } from 'react';

import { Alert, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';

import createPartyReducer from '../../reducers/createPartyReducer';
import useConfig from '../../hooks/useConfig';

const initialValue = {
    isLoading: false,
    name: "",
    showMessage: false,
    message: "",
    isSuccess: true,
    currentBalance: 0,
    partyType: "credit",
    billingLocation: [
        {
            billingName: "default",
            billingAddress: "default",
            billingContactNumber: "",
            billingType: "retail",
            isDefault: true
        }
    ]
}

function CreateParty() {
    const { partyType, billingType } = useConfig();
    const [partyForm, partyFormDispatcher] = useReducer(createPartyReducer, initialValue);

    const handlePartyFieldChange = (e) => partyFormDispatcher({ key: "PARTY_FIELD_CHANGED", value: { field: e.target.name, newValue: e.target.value } });

    const handleLocationDataChange = (index, e) => {
        partyFormDispatcher({ key: "PARTY_LOCATION_CHANGED", value: { field: e.target.name, newValue: e.target.value, locationIndex: index } })
    }
    const handleAddMoreLocation = () => partyFormDispatcher({ key: "PARTY_LOCATION_ADD" });
    const handleDefaultLocationChange = (index, e) => partyFormDispatcher({ key: "PARTY_DEFAULT_LOCATION_CHANGED", value: { field: e.target.name, newValue: e.target.value, locationIndex: index } });
    const handleFinish = () => {
        partyFormDispatcher({ key: "LOADING" })
        partyFormDispatcher({ key: "PARTY_FINISH" });
    }


    return (
        <Box sx={{ backgroundColor: "primary.contrastText", minHeight: "50vh", p: 3, display: "flex", flexDirection: "column", rowGap: 1 }}>

            {partyForm.showMessage &&
                <Box>
                    <Alert severity={partyForm.isSuccess ? "success" : "error"}>{partyForm.message}</Alert>
                </Box>
            }
            <Box>
                <Typography variant="h6">Add New Party</Typography>
            </Box>
            <Box sx={{ mb: 1, display: "flex", justifyContent: "flex-start", gap: 2, }}>
                <FormControl sx={{ minWidth: "40%", flex: 1 }}>
                    <TextField id="outlined-required" label="Party Name" name="name" value={partyForm?.name} onChange={handlePartyFieldChange} />
                </FormControl>
                <FormControl sx={{ minWidth: "25%" }}>
                    <InputLabel id="item-select-helper-label">Party Type</InputLabel>
                    <Select
                        labelId="item-select-helper-label"
                        id="item-select-helper"
                        label="Party Type"
                        onChange={handlePartyFieldChange}
                        value={partyForm.partyType}
                        name="partyType"
                    >
                        {
                            partyType.map((type) => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl>
                    <TextField id="outlined-required" type="number" name="currentBalance" label="Initial Balance" value={partyForm?.currentBalance} onChange={handlePartyFieldChange} />
                </FormControl>
            </Box>
            <Box>
                <Typography variant="h6">Locations</Typography>
            </Box>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 1, maxHeight: "350px", overflowY: "auto" }}>
                {
                    partyForm?.billingLocation &&
                    partyForm.billingLocation.map((location, index) => {
                        return (
                            <Box key={`bl_${index}`} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: 2, border: 1, borderColor: "grey.300", p: 2 }}>
                                <FormControl sx={{ minWidth: "30%" }}>
                                    <TextField id="outlined-required" name="billingName" label="Name" value={location.billingName} onChange={(e) => handleLocationDataChange(index, e)} />
                                </FormControl>
                                <FormControl sx={{ minWidth: "40%", flex: 1 }}>
                                    <TextField id="outlined-required" name="billingAddress" label="Location" value={location.billingAddress} onChange={(e) => handleLocationDataChange(index, e)} />
                                </FormControl>
                                <FormControl sx={{ minWidth: "30%" }}>
                                    <TextField id="outlined-required" type="number" name="billingContactNumber" label="Contact" value={location.billingContactNumber} onChange={(e) => handleLocationDataChange(index, e)} />
                                </FormControl>
                                <FormControl sx={{ minWidth: "20%" }}>
                                    <InputLabel id="item-select-helper-label">Type</InputLabel>
                                    <Select
                                        labelId="item-select-helper-label"
                                        id="item-select-helper"
                                        label="Type"
                                        onChange={(e) => handleLocationDataChange(index, e)}
                                        value={location.billingType}
                                        name="billingType"
                                    >
                                        {
                                            billingType.map((type) => (
                                                <MenuItem key={`bl_bt_${index}_${type}`} value={type}>{type}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                {
                                    !Boolean(location.isDefault) ? <Button variant="outlined" bgcolor="primary.main" name="isDefault" onClick={(e) => handleDefaultLocationChange(index, e)}>Mark As Default</Button> : <Chip sx={{ alignSelf: "center" }} icon={<DoneIcon />} label="Default Location" color="success" />
                                }
                            </Box>
                        )
                    })
                }
            </Box>
            <Box>
                <Button variant="contained" sx={{ mr: 2, bgcolor: "secondary.main", color: "secondary.contrastText" }} onClick={handleAddMoreLocation}> Add More Location</Button>
                <Button variant="contained" onClick={handleFinish} disabled={partyForm.isLoading}> {partyForm.isLoading ? "Saving ..." : "Save"} </Button>
            </Box>
        </Box>
    )
}

export default CreateParty;
