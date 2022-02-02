import { Autocomplete, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import data from '../parties/partyData';

function AutoCompleteList({ filterContent, label, dataKey, selectionEventHandler, category }) {
    const [value, setValue] = useState(null);
    return (
        <Autocomplete
            value={value}
            sx={{ width: "100%" }}
            options={data}
            autoHighlight
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            freeSolo
            onChange={(event, newValue) => {
                setValue(newValue);
                selectionEventHandler(newValue);
            }}
            getOptionLabel={(option) => {
                return option[dataKey];
            }}
            renderOption={(props, option) => {
                if (category === "party") {
                    return (
                        <Box {...props} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <Box component="li" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", height: "100" }}>
                                <Typography variant="subtitle1" fontSize={12}> {option.name} </Typography>
                                <Typography variant="subtitle1" fontSize={12} ml="auto"> {option.partyType} </Typography>
                            </Box>
                            <Box component="li" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", height: "100" }}>
                                <Typography variant="subtitle1" fontSize={12}> {option.billingLocation.reduce((previousValue, newValue) => previousValue + ' | ' + newValue.billingContactNumber, '').substring(2)}</Typography>
                                <Typography variant="subtitle1" fontSize={12} ml="auto"> {option.currentBalanace}</Typography>
                            </Box>
                        </Box>
                    )
                } else {
                    return <li {...props}>{option.name}</li>
                }
            }}
            renderInput={(params) => (
                <TextField {...params} label={label ? label : "Enter Text Here"} inputProps={{
                    ...params.inputProps,
                }} />
            )}
            filterOptions={(options, params) => {
                return filterContent(options, params.inputValue);
            }}
        >

        </Autocomplete>
    );
}

export default AutoCompleteList;
