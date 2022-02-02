import { TextField } from '@mui/material';

function PartyOption({ params, label, data }) {
    return (
        <TextField {...params} label={label ? label : "Enter Text Here"} inputProps={{
            ...params.inputProps,
        }} />
    );
}

export default PartyOption;
