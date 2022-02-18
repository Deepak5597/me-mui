import { useReducer } from 'react';
import { Link } from 'react-router-dom';

import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

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
function CreateParty1() {
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
    const handleLocationDelete = (index) => {
        partyFormDispatcher({ key: "DELETE_LOCATION", value: { locationIndex: index } })
    }
    return (
        <Grid container rowGap={2}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6"> Create New Party </Typography>
                <Link to="/parties" style={{ textDecoration: "none" }}><Button variant="contained" color="primary"> Go Back</Button></Link>
            </Grid>
            {
                partyForm.showMessage &&
                <Grid item xs={12}>
                    <Alert severity={partyForm.isSuccess ? "success" : "error"}>{partyForm.message}</Alert>
                </Grid>
            }
            <Grid item container xs={12} >
                <Box component="form" autoComplete="off" noValidate sx={{ width: "100%" }}>
                    <Grid container item rowGap={2} columnGap={1}>
                        <Grid item xs={12} sm>
                            <FormControl fullWidth >
                                <TextField size="small" label="Party Name" variant="outlined" name="name" value={partyForm?.name} onChange={handlePartyFieldChange} />
                            </FormControl>
                        </Grid>
                        <Grid item xs sm={3}>
                            <FormControl fullWidth >
                                <InputLabel id="party-select-helper-label">Party Type</InputLabel>
                                <Select
                                    size="small"
                                    labelId="party-select-helper-label"
                                    id="party-select-helper"
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
                        </Grid>
                        <Grid item xs sm={3}>
                            <FormControl fullWidth >
                                <TextField size="small" type="number" label="Current Balance" variant="outlined" name="currentBalance" value={partyForm?.currentBalance} onChange={handlePartyFieldChange} />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} my={2}>
                        <Typography variant="h6"> Billing Locations </Typography>
                    </Grid>
                    {
                        partyForm?.billingLocation &&
                        partyForm.billingLocation.map((location, index) => {
                            return (
                                <Grid container item gap={2} sx={{ border: 1, borderColor: "grey.300", borderStyle: "dotted", p: 2, mt: 2 }} key={`bl_${index}`}>
                                    <Grid item xs={12} sm>
                                        <FormControl fullWidth >
                                            <TextField size="small" label="Name" variant="outlined" name="billingName" value={location.billingName} onChange={(e) => handleLocationDataChange(index, e)} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm>
                                        <FormControl fullWidth >
                                            <TextField size="small" label="Contact" variant="outlined" name="billingContactNumber" value={location.billingContactNumber} onChange={(e) => handleLocationDataChange(index, e)} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm>
                                        <FormControl fullWidth >
                                            <InputLabel id="type-select-helper-label">Type</InputLabel>
                                            <Select
                                                size="small"
                                                labelId="type-select-helper-label"
                                                id="type-select-helper"
                                                label="Type"
                                                onChange={(e) => handleLocationDataChange(index, e)}
                                                value={location.billingType}
                                                name="billingType">
                                                {
                                                    billingType.map((type) => (
                                                        <MenuItem key={`bl_bt_${index}_${type}`} value={type}>{type}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth >
                                            <TextField size="small" label="Location" variant="outlined" multiline rows={2} name="billingAddress" value={location.billingAddress} onChange={(e) => handleLocationDataChange(index, e)} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        {
                                            !Boolean(location.isDefault) ? <Button variant="outlined" color="primary" name="isDefault" onClick={(e) => handleDefaultLocationChange(index, e)}>Mark Default</Button > : <Button variant="contained" color="success" startIcon={<DoneIcon />}>Default</Button>
                                        }
                                        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{ ml: 2 }} onClick={(e) => handleLocationDelete(index)}>Delete</Button>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                    <Grid container item gap={1} sx={{ my: 2 }}>
                        <Button variant="contained" color="secondary" onClick={handleAddMoreLocation}> Add More Location</Button>
                        <Button variant="contained" onClick={handleFinish} disabled={partyForm.isLoading}> {partyForm.isLoading ? "Saving ..." : "Save"} </Button>
                    </Grid>
                </Box>
            </Grid >
        </Grid >
    )
}

export default CreateParty1