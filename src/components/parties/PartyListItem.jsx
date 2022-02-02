import { useState } from 'react';
import { Box, Menu, MenuItem, Paper, styled, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

const Item = styled(Paper)({
    padding: 15,
    borderRadius: 3,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer"
})

function PartyListItem({ data }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Item elevation={3} >
            <Box>
                <Typography variant="subtitle1">{data.name}</Typography>
            </Box>
            <IconButton aria-label="action" component="span" onClick={handleClick} aria-controls={open ? 'basic-menu' : undefined} aria-expanded={open ? 'true' : undefined}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </Item>
    )
}

export default PartyListItem;
